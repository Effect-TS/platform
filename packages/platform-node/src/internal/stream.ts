import type { SizeInput } from "@effect/platform/FileSystem"
import * as Cause from "effect/Cause"
import * as Channel from "effect/Channel"
import * as Chunk from "effect/Chunk"
import * as Effect from "effect/Effect"
import * as Exit from "effect/Exit"
import type { LazyArg } from "effect/Function"
import { dual, pipe } from "effect/Function"
import * as Queue from "effect/Queue"
import * as Stream from "effect/Stream"
import type { Duplex, Readable, Writable } from "node:stream"
import type { FromReadableOptions, FromWritableOptions } from "../Stream"

/** @internal */
export const fromReadable = <E, A = Uint8Array>(
  evaluate: LazyArg<Readable>,
  onError: (error: unknown) => E,
  { chunkSize }: FromReadableOptions = {}
): Stream.Stream<never, E, A> =>
  Stream.fromChannel(
    Channel.acquireUseRelease(
      Effect.sync(evaluate),
      (readable) => readChannel<E, A>(readable, onError, chunkSize ? Number(chunkSize) : undefined),
      (readable) =>
        Effect.sync(() => {
          readable.removeAllListeners()
          if (!readable.closed) {
            readable.destroy()
          }
        })
    )
  )

/** @internal */
export const toString = <E>(
  options: {
    readable: LazyArg<Readable>
    onFailure: (error: unknown) => E
    encoding?: BufferEncoding
    maxBytes?: SizeInput
  }
): Effect.Effect<never, E, string> => {
  const maxBytesNumber = options.maxBytes ? Number(options.maxBytes) : undefined
  return Effect.acquireUseRelease(
    Effect.sync(() => {
      const stream = options.readable()
      stream.setEncoding(options.encoding ?? "utf8")
      return stream
    }),
    (stream) =>
      Effect.async((resume) => {
        let string = ""
        let bytes = 0
        stream.once("error", (err) => {
          resume(Effect.fail(options.onFailure(err)))
        })
        stream.once("end", () => {
          resume(Effect.succeed(string))
        })
        stream.on("data", (chunk) => {
          string += chunk
          bytes += Buffer.byteLength(chunk)
          if (maxBytesNumber && bytes > maxBytesNumber) {
            resume(Effect.fail(options.onFailure(new Error("maxBytes exceeded"))))
          }
        })
      }),
    (stream) =>
      Effect.sync(() => {
        stream.removeAllListeners()
        if (!stream.closed) {
          stream.destroy()
        }
      })
  )
}

/** @internal */
export const toUint8Array = <E>(
  options: {
    readable: LazyArg<Readable>
    onFailure: (error: unknown) => E
    maxBytes?: SizeInput
  }
): Effect.Effect<never, E, Uint8Array> => {
  const maxBytesNumber = options.maxBytes ? Number(options.maxBytes) : undefined
  return Effect.acquireUseRelease(
    Effect.sync(options.readable),
    (stream) =>
      Effect.async((resume) => {
        let buffer = Buffer.alloc(0)
        let bytes = 0
        stream.once("error", (err) => {
          resume(Effect.fail(options.onFailure(err)))
        })
        stream.once("end", () => {
          resume(Effect.succeed(buffer))
        })
        stream.on("data", (chunk) => {
          buffer = Buffer.concat([buffer, chunk])
          bytes += chunk.length
          if (maxBytesNumber && bytes > maxBytesNumber) {
            resume(Effect.fail(options.onFailure(new Error("maxBytes exceeded"))))
          }
        })
      }),
    (stream) =>
      Effect.sync(() => {
        stream.removeAllListeners()
        if (!stream.closed) {
          stream.destroy()
        }
      })
  )
}

/** @internal */
export const fromDuplex = <IE, E, I = Uint8Array, O = Uint8Array>(
  evaluate: LazyArg<Duplex>,
  onError: (error: unknown) => E,
  options: FromReadableOptions & FromWritableOptions = {}
): Channel.Channel<never, IE, Chunk.Chunk<I>, unknown, IE | E, Chunk.Chunk<O>, void> =>
  Channel.acquireUseRelease(
    Effect.sync(evaluate),
    (duplex) =>
      Channel.zipRight(
        writeChannel<IE, E, I>(duplex, onError, options),
        readChannel<E, O>(duplex, onError, options.chunkSize ? Number(options.chunkSize) : undefined),
        { concurrent: true }
      ),
    (duplex) =>
      Effect.sync(() => {
        duplex.removeAllListeners()
        if (!duplex.closed) {
          duplex.destroy()
        }
      })
  )

/** @internal */
export const pipeThroughDuplex = dual<
  <E2, B = Uint8Array>(
    duplex: LazyArg<Duplex>,
    onError: (error: unknown) => E2,
    options?: FromReadableOptions & FromWritableOptions
  ) => <R, E, A>(self: Stream.Stream<R, E, A>) => Stream.Stream<R, E | E2, B>,
  <R, E, A, E2, B = Uint8Array>(
    self: Stream.Stream<R, E, A>,
    duplex: LazyArg<Duplex>,
    onError: (error: unknown) => E2,
    options?: FromReadableOptions & FromWritableOptions
  ) => Stream.Stream<R, E | E2, B>
>(
  (args) => Stream.StreamTypeId in args[0],
  (self, duplex, onError, options) => Stream.pipeThroughChannelOrFail(self, fromDuplex(duplex, onError, options))
)

const readChannel = <E, A = Uint8Array>(
  readable: Readable,
  onError: (error: unknown) => E,
  chunkSize: number | undefined
): Channel.Channel<never, unknown, unknown, unknown, E, Chunk.Chunk<A>, void> =>
  pipe(
    Effect.acquireRelease(
      Queue.unbounded<Exit.Exit<E, Readable>>(),
      (queue) => Queue.shutdown(queue)
    ),
    Effect.tap((queue) =>
      Effect.sync(() => {
        readable.on("readable", () => {
          const size = queue.unsafeSize()
          if (size._tag === "Some" && size.value <= 0) {
            queue.unsafeOffer(Exit.succeed(readable))
          }
        })
        readable.on("error", (err) => {
          queue.unsafeOffer(Exit.fail(onError(err)))
        })
        readable.on("end", () => {
          queue.unsafeOffer(Exit.failCause(Cause.empty))
        })
        if (readable.readable) {
          queue.unsafeOffer(Exit.succeed(readable))
        }
      })
    ),
    Effect.map((queue) => {
      const loop: Channel.Channel<never, unknown, unknown, unknown, E, Chunk.Chunk<A>, void> = pipe(
        Queue.take(queue),
        Effect.map(Exit.match({
          onFailure: (cause) => Cause.isEmpty(cause) ? Channel.unit : Channel.failCause(cause),
          onSuccess: (readable) => Channel.flatMap(readChannelChunk<A>(readable, chunkSize), () => loop)
        })),
        Channel.unwrap
      )
      return loop
    }),
    Channel.unwrapScoped
  )

const readChannelChunk = <A>(
  readable: Readable,
  chunkSize: number | undefined
): Channel.Channel<never, unknown, unknown, unknown, never, Chunk.Chunk<A>, void> =>
  Channel.unwrap(
    Effect.sync(() => {
      const arr: Array<A> = []
      let chunk = readable.read(chunkSize)
      while (chunk !== null) {
        arr.push(chunk)
        chunk = readable.read(chunkSize)
      }
      return Channel.write(Chunk.unsafeFromArray(arr))
    })
  )

/** @internal */
export const writeChannel = <IE, OE, A>(
  writable: Writable,
  onError: (error: unknown) => OE,
  { encoding, endOnDone = true }: FromWritableOptions = {}
): Channel.Channel<never, IE, Chunk.Chunk<A>, unknown, IE | OE, Chunk.Chunk<never>, void> => {
  const write = writeEffect(writable, onError, encoding)
  const loop: Channel.Channel<never, IE, Chunk.Chunk<A>, unknown, OE | IE, Chunk.Chunk<never>, void> = Channel
    .readWithCause({
      onInput: (chunk: Chunk.Chunk<A>) =>
        Channel.flatMap(
          Channel.fromEffect(Effect.forEach(chunk, write, { discard: true })),
          () => loop
        ),
      onFailure: Channel.failCause,
      onDone: () =>
        endOnDone ?
          Channel.fromEffect(Effect.async<never, never, void>((resume) => {
            if (writable.closed) {
              resume(Effect.unit)
            } else {
              writable.end(() => resume(Effect.unit))
            }
          })) :
          Channel.unit
    })
  return loop
}

const writeEffect =
  <E, A>(writable: Writable, onError: (error: unknown) => E, encoding?: BufferEncoding) => (item: A) =>
    Effect.async<never, E, void>((resume) => {
      function onDone(err: unknown) {
        if (err) {
          resume(Effect.fail(onError(err)))
        } else {
          resume(Effect.unit)
        }
      }
      if (encoding) {
        writable.write(item, encoding, onDone)
      } else {
        writable.write(item, onDone)
      }
    })
