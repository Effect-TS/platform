import type { SizeInput } from "@effect/platform/FileSystem"
import * as Cause from "effect/Cause"
import * as Channel from "effect/Channel"
import type * as AsyncInput from "effect/ChannelSingleProducerAsyncInput"
import * as Chunk from "effect/Chunk"
import * as Effect from "effect/Effect"
import * as Exit from "effect/Exit"
import type { LazyArg } from "effect/Function"
import { dual } from "effect/Function"
import * as Queue from "effect/Queue"
import * as Stream from "effect/Stream"
import type { Duplex, Readable, Writable } from "node:stream"
import { type PlatformError, SystemError } from "../Error"
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
    Effect.zip(
      Effect.sync(evaluate),
      Queue.unbounded<Exit.Exit<IE | E, void>>()
    ),
    ([duplex, queue]) =>
      Channel.flatMap(
        readInput<IE | E, O>(
          duplex,
          queue,
          onError,
          options.chunkSize ? Number(options.chunkSize) : undefined
        ),
        (read) =>
          Channel.embedInput(
            Channel.fromInput(read),
            writeInput(duplex, queue, onError, options)
          )
      ),
    ([duplex, queue]) =>
      Effect.zipRight(
        Effect.sync(() => {
          duplex.removeAllListeners()
          if (!duplex.closed) {
            duplex.destroy()
          }
        }),
        Queue.shutdown(queue)
      )
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
  (self, duplex, onError, options) =>
    Stream.pipeThroughChannelOrFail(
      self,
      fromDuplex(duplex, onError, options)
    )
)

/** @internal */
export const pipeThroughSimple = dual<
  (
    duplex: LazyArg<Duplex>
  ) => <R, E>(self: Stream.Stream<R, E, string | Uint8Array>) => Stream.Stream<R, E | PlatformError, Uint8Array>,
  <R, E>(
    self: Stream.Stream<R, E, string | Uint8Array>,
    duplex: LazyArg<Duplex>
  ) => Stream.Stream<R, E | PlatformError, Uint8Array>
>(
  2,
  (self, duplex) =>
    Stream.pipeThroughChannelOrFail(
      self,
      fromDuplex(duplex, (error) =>
        SystemError({
          module: "Stream",
          method: "pipeThroughSimple",
          pathOrDescriptor: "",
          reason: "Unknown",
          message: String(error)
        }))
    )
)

const readChannel = <E, A = Uint8Array>(
  readable: Readable,
  onError: (error: unknown) => E,
  chunkSize: number | undefined
): Channel.Channel<never, unknown, unknown, unknown, E, Chunk.Chunk<A>, void> =>
  Channel.acquireUseRelease(
    Queue.unbounded<Exit.Exit<E, void>>(),
    (queue) =>
      Channel.flatMap(
        readInput<E, A>(readable, queue, onError, chunkSize),
        Channel.fromInput
      ),
    (queue) => Queue.shutdown(queue)
  )

const readInput = <E, A>(
  readable: Readable,
  queue: Queue.Queue<Exit.Exit<E, void>>,
  onError: (error: unknown) => E,
  chunkSize: number | undefined
) =>
  Channel.sync((): AsyncInput.AsyncInputConsumer<E, Chunk.Chunk<A>, void> => {
    readable.on("readable", () => {
      const size = queue.unsafeSize()
      if (size._tag === "Some" && size.value <= 0) {
        queue.unsafeOffer(Exit.unit)
      }
    })
    readable.on("error", (err) => {
      queue.unsafeOffer(Exit.fail(onError(err)))
    })
    readable.on("end", () => {
      queue.unsafeOffer(Exit.failCause(Cause.empty))
    })
    if (readable.readable) {
      queue.unsafeOffer(Exit.unit)
    }

    const read = readChunkEffect<A>(readable, chunkSize)
    return {
      takeWith: (onError, onElement, onDone) =>
        Effect.flatMap(
          Queue.take(queue),
          Exit.match({
            onFailure: (cause) => Effect.succeed(Cause.isEmpty(cause) ? onDone(void 0) : onError(cause)),
            onSuccess: (_readable) => Effect.map(read, onElement)
          })
        )
    }
  })

const readChunkEffect = <A>(
  readable: Readable,
  chunkSize: number | undefined
) =>
  Effect.sync(() => {
    const arr: Array<A> = []
    let chunk = readable.read(chunkSize)
    while (chunk !== null) {
      arr.push(chunk)
      chunk = readable.read(chunkSize)
    }
    return Chunk.unsafeFromArray(arr)
  })

const writeInput = <IE, E, A>(
  writable: Writable,
  queue: Queue.Queue<Exit.Exit<IE | E, void>>,
  onError: (error: unknown) => E,
  { encoding, endOnDone = true }: FromWritableOptions = {}
): AsyncInput.AsyncInputProducer<IE, Chunk.Chunk<A>, unknown> => {
  const write = writeEffect(writable, onError, encoding)
  const close = endOnDone ?
    Effect.async<never, never, void>((resume) => {
      if (writable.closed) {
        resume(Effect.unit)
      } else {
        writable.end(() => resume(Effect.unit))
      }
    }) :
    Effect.unit
  return {
    awaitRead: () => Effect.unit,
    emit: (chunk) =>
      Effect.catchAllCause(
        write(chunk),
        (cause) => Queue.offer(queue, Exit.failCause(cause))
      ),
    error: (cause) =>
      Effect.zipRight(
        close,
        Queue.offer(queue, Exit.failCause(cause))
      ),
    done: (_) => close
  }
}

/** @internal */
export const writeEffect =
  <E, A>(writable: Writable, onError: (error: unknown) => E, encoding?: BufferEncoding) => (chunk: Chunk.Chunk<A>) =>
    Effect.async<never, E, void>((resume) => {
      const iterator = chunk[Symbol.iterator]()
      function loop() {
        const item = iterator.next()
        if (item.done) {
          resume(Effect.unit)
        } else if (encoding) {
          writable.write(item.value, encoding, onDone)
        } else {
          writable.write(item.value, onDone)
        }
      }
      function onDone(err: unknown) {
        if (err) {
          resume(Effect.fail(onError(err)))
        } else {
          loop()
        }
      }
      loop()
    })
