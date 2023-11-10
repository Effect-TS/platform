import type * as ParseResult from "@effect/schema/ParseResult"
import * as Schema from "@effect/schema/Schema"
import * as Cause from "effect/Cause"
import * as Channel from "effect/Channel"
import type * as AsyncInput from "effect/ChannelSingleProducerAsyncInput"
import * as Chunk from "effect/Chunk"
import * as Data from "effect/Data"
import * as Effect from "effect/Effect"
import * as FiberRef from "effect/FiberRef"
import { dual, flow, pipe } from "effect/Function"
import { globalValue } from "effect/GlobalValue"
import * as Option from "effect/Option"
import * as Predicate from "effect/Predicate"
import * as Queue from "effect/Queue"
import * as ReadonlyArray from "effect/ReadonlyArray"
import * as Stream from "effect/Stream"
import * as MP from "multipasta"
import * as FileSystem from "../../FileSystem.js"
import type * as FormData from "../../Http/FormData.js"
import * as IncomingMessage from "../../Http/IncomingMessage.js"
import * as Path from "../../Path.js"

/** @internal */
export const TypeId: FormData.TypeId = Symbol.for("@effect/platform/Http/FormData") as FormData.TypeId

/** @internal */
export const ErrorTypeId: FormData.ErrorTypeId = Symbol.for(
  "@effect/platform/Http/FormData/FormDataError"
) as FormData.ErrorTypeId

/** @internal */
export const FormDataError = (reason: FormData.FormDataError["reason"], error: unknown): FormData.FormDataError =>
  Data.struct({
    [ErrorTypeId]: ErrorTypeId,
    _tag: "FormDataError",
    reason,
    error
  })

/** @internal */
export const maxParts: FiberRef.FiberRef<Option.Option<number>> = globalValue(
  "@effect/platform/Http/FormData/maxParts",
  () => FiberRef.unsafeMake(Option.none<number>())
)

/** @internal */
export const withMaxParts = dual<
  (count: Option.Option<number>) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(effect: Effect.Effect<R, E, A>, count: Option.Option<number>) => Effect.Effect<R, E, A>
>(2, (effect, count) => Effect.locally(effect, maxParts, count))

/** @internal */
export const maxFieldSize: FiberRef.FiberRef<FileSystem.Size> = globalValue(
  "@effect/platform/Http/FormData/maxFieldSize",
  () => FiberRef.unsafeMake(FileSystem.Size(10 * 1024 * 1024))
)

/** @internal */
export const withMaxFieldSize = dual<
  (size: FileSystem.SizeInput) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(effect: Effect.Effect<R, E, A>, size: FileSystem.SizeInput) => Effect.Effect<R, E, A>
>(2, (effect, size) => Effect.locally(effect, maxFieldSize, FileSystem.Size(size)))

/** @internal */
export const maxFileSize: FiberRef.FiberRef<Option.Option<FileSystem.Size>> = globalValue(
  "@effect/platform/Http/FormData/maxFileSize",
  () => FiberRef.unsafeMake(Option.none<FileSystem.Size>())
)

/** @internal */
export const withMaxFileSize = dual<
  (size: Option.Option<FileSystem.SizeInput>) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(effect: Effect.Effect<R, E, A>, size: Option.Option<FileSystem.SizeInput>) => Effect.Effect<R, E, A>
>(2, (effect, size) => Effect.locally(effect, maxFileSize, Option.map(size, FileSystem.Size)))

/** @internal */
export const fieldMimeTypes: FiberRef.FiberRef<Chunk.Chunk<string>> = globalValue(
  "@effect/platform/Http/FormData/fieldMimeTypes",
  () => FiberRef.unsafeMake(Chunk.make("application/json"))
)

/** @internal */
export const withFieldMimeTypes = dual<
  (mimeTypes: ReadonlyArray<string>) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>,
  <R, E, A>(effect: Effect.Effect<R, E, A>, mimeTypes: ReadonlyArray<string>) => Effect.Effect<R, E, A>
>(2, (effect, mimeTypes) => Effect.locally(effect, fieldMimeTypes, Chunk.fromIterable(mimeTypes)))

/** @internal */
export const toRecord = (formData: globalThis.FormData): Record<string, Array<globalThis.File> | string> =>
  ReadonlyArray.reduce(
    formData.entries(),
    {} as Record<string, Array<globalThis.File> | string>,
    (acc, [key, value]) => {
      if (Predicate.isString(value)) {
        acc[key] = value
      } else {
        const existing = acc[key]
        if (Array.isArray(existing)) {
          existing.push(value)
        } else {
          acc[key] = [value]
        }
      }
      return acc
    }
  )
/** @internal */
export const filesSchema: Schema.Schema<ReadonlyArray<File>, ReadonlyArray<File>> = Schema.array(
  pipe(
    Schema.instanceOf(Blob),
    Schema.filter(
      (blob): blob is File => "name" in blob
    )
  ) as any as Schema.Schema<File, File>
)

/** @internal */
export const schemaRecord = <I extends Readonly<Record<string, string | ReadonlyArray<globalThis.File>>>, A>(
  schema: Schema.Schema<I, A>
) => {
  const parse = Schema.parse(schema)
  return (formData: globalThis.FormData) => parse(toRecord(formData))
}

/** @internal */
export const schemaJson = <I, A>(schema: Schema.Schema<I, A>): {
  (
    field: string
  ): (formData: globalThis.FormData) => Effect.Effect<never, FormData.FormDataError | ParseResult.ParseError, A>
  (
    formData: globalThis.FormData,
    field: string
  ): Effect.Effect<never, FormData.FormDataError | ParseResult.ParseError, A>
} => {
  const parse = Schema.parse(schema)
  return dual<
    (
      field: string
    ) => (formData: globalThis.FormData) => Effect.Effect<never, FormData.FormDataError | ParseResult.ParseError, A>,
    (
      formData: globalThis.FormData,
      field: string
    ) => Effect.Effect<never, FormData.FormDataError | ParseResult.ParseError, A>
  >(2, (formData, field) =>
    pipe(
      Effect.succeed(formData.get(field)),
      Effect.filterOrFail(
        (field) => Predicate.isString(field),
        () => FormDataError("Parse", `schemaJson: field was not a string`)
      ),
      Effect.tryMap({
        try: (field) => JSON.parse(field as string),
        catch: (error) => FormDataError("Parse", `schemaJson: field was not valid json: ${error}`)
      }),
      Effect.flatMap(parse)
    ))
}

/** @internal */
export const makeConfig = (
  headers: Record<string, string>
): Effect.Effect<never, never, Omit<MP.PullConfig<any>, "pull">> =>
  Effect.map(
    Effect.all({
      maxParts: Effect.map(FiberRef.get(maxParts), Option.getOrUndefined),
      maxFieldSize: Effect.map(FiberRef.get(maxFieldSize), Number),
      maxPartSize: Effect.map(FiberRef.get(maxFileSize), flow(Option.map(Number), Option.getOrUndefined)),
      maxTotalSize: Effect.map(
        FiberRef.get(IncomingMessage.maxBodySize),
        flow(Option.map(Number), Option.getOrUndefined)
      ),
      isFile: Effect.map(FiberRef.get(fieldMimeTypes), (mimeTypes) => {
        if (mimeTypes.length === 0) {
          return undefined
        }
        return (info: MP.PartInfo): boolean =>
          Chunk.some(mimeTypes, (_) => info.contentType.includes(_)) || MP.defaultIsFile(info)
      })
    }),
    (_) => ({ ..._, headers })
  )

/** @internal */
export const makeChannel = <IE>(
  headers: Record<string, string>,
  bufferSize = 16
): Channel.Channel<
  never,
  IE,
  Chunk.Chunk<Uint8Array>,
  unknown,
  FormData.FormDataError | IE,
  Chunk.Chunk<FormData.Part>,
  unknown
> =>
  Channel.acquireUseRelease(
    Effect.all([
      makeConfig(headers),
      Queue.bounded<Chunk.Chunk<Uint8Array> | null>(bufferSize)
    ]),
    ([config, queue]) => makeFromQueue<IE>(config, queue),
    ([, queue]) => Queue.shutdown(queue)
  )

const makeFromQueue = <IE>(
  config: Omit<MP.PullConfig<any>, "pull">,
  queue: Queue.Queue<Chunk.Chunk<Uint8Array> | null>
): Channel.Channel<
  never,
  IE,
  Chunk.Chunk<Uint8Array>,
  unknown,
  IE | FormData.FormDataError,
  Chunk.Chunk<FormData.Part>,
  unknown
> =>
  Channel.suspend(() => {
    let error = Option.none<Cause.Cause<IE>>()

    const input: AsyncInput.AsyncInputProducer<IE, Chunk.Chunk<Uint8Array>, unknown> = {
      awaitRead: () => Effect.unit,
      emit(element) {
        return Queue.offer(queue, element)
      },
      error(cause) {
        error = Option.some(cause)
        return Queue.offer(queue, null)
      },
      done(_value) {
        return Queue.offer(queue, null)
      }
    }
    const takeInput = Queue.take(queue)

    const output = fromPullConfig<IE>({
      ...config,
      pull(cb) {
        Effect.runCallback(takeInput, function(exit) {
          if (exit._tag === "Success" && exit.value !== null) {
            cb(null, Chunk.toReadonlyArray(exit.value))
          } else {
            cb(Option.getOrNull(error), null)
          }
        })
      }
    })

    return Channel.embedInput(output, input)
  })

/** @internal */
export const fromPullConfig = <IE>(config: MP.PullConfig<Cause.Cause<IE>>) =>
  Channel.suspend(() => {
    const parser = MP.makePull(config)

    const takeOutput = Effect.async<never, IE | FormData.FormDataError, Chunk.Chunk<FormData.Part> | null>((resume) => {
      parser(function(err, data) {
        if (err) {
          const error = err.errors[0]
          if (Cause.isCause(error)) {
            return resume(Effect.failCause(error))
          }

          switch (error._tag) {
            case "ReachedLimit": {
              switch (error.limit) {
                case "MaxParts": {
                  resume(Effect.fail(FormDataError("TooManyParts", err)))
                  break
                }
                case "MaxFieldSize": {
                  resume(Effect.fail(FormDataError("FieldTooLarge", err)))
                  break
                }
                case "MaxPartSize": {
                  resume(Effect.fail(FormDataError("FileTooLarge", err)))
                  break
                }
                case "MaxTotalSize": {
                  resume(Effect.fail(FormDataError("BodyTooLarge", err)))
                  break
                }
              }
              break
            }
            default: {
              resume(Effect.fail(FormDataError("Parse", err)))
              break
            }
          }
        } else if (data === null) {
          resume(Effect.succeed(null))
        } else {
          resume(Effect.succeed(Chunk.unsafeFromArray(data.map(convertPart))))
        }
      })
    })

    const outputLoop: Channel.Channel<
      never,
      unknown,
      unknown,
      unknown,
      FormData.FormDataError | IE,
      Chunk.Chunk<FormData.Part>,
      unknown
    > = Channel.flatMap(
      takeOutput,
      (chunk) => chunk === null ? Channel.unit : Channel.flatMap(Channel.write(chunk), (_) => outputLoop)
    )

    return outputLoop
  })

const convertPart = (part: MP.Part): FormData.Part => {
  if (part._tag === "File") {
    return new FileImpl(part)
  }
  return new FieldImpl(part)
}

class FieldImpl implements FormData.Field {
  readonly [TypeId]: FormData.TypeId
  readonly _tag = "Field"
  readonly key: string
  readonly contentType: string
  readonly value: string

  constructor(
    field: MP.Field
  ) {
    this[TypeId] = TypeId
    this.key = field.info.name
    this.contentType = field.info.contentType
    this.value = MP.decodeField(field.info, field.value)
  }
}

class FileImpl implements FormData.File {
  readonly _tag = "File"
  readonly [TypeId]: FormData.TypeId
  readonly key: string
  readonly name: string
  readonly contentType: string

  constructor(private file: MP.File) {
    this[TypeId] = TypeId
    this.key = file.info.name
    this.name = file.info.filename ?? file.info.name
    this.contentType = file.info.contentType
  }

  get content(): Stream.Stream<never, FormData.FormDataError, Uint8Array> {
    return fileStream(this.file)
  }
}

const fileStream = (file: MP.File): Stream.Stream<never, never, Uint8Array> =>
  Stream.repeatEffectChunkOption(Effect.async<never, Option.Option<never>, Chunk.Chunk<Uint8Array>>((resume) => {
    file.read(function(chunk) {
      if (chunk === null) {
        resume(Effect.fail(Option.none()))
      } else {
        resume(Effect.succeed(Chunk.unsafeFromArray(chunk)))
      }
    })
  }))

/** @internal */
export const formData = (
  stream: Stream.Stream<never, FormData.FormDataError, FormData.Part>
) =>
  pipe(
    Effect.Do,
    Effect.bind("fs", () => FileSystem.FileSystem),
    Effect.bind("path", () => Path.Path),
    Effect.bind("dir", ({ fs }) => fs.makeTempDirectoryScoped()),
    Effect.flatMap(({ dir, fs, path: path_ }) =>
      Stream.runFoldEffect(
        stream,
        new globalThis.FormData(),
        (formData, part) => {
          if (part._tag === "Field") {
            formData.append(part.key, part.value)
            return Effect.succeed(formData)
          }
          const file = part
          const path = path_.join(dir, file.name)
          const blob = "Bun" in globalThis ?
            (globalThis as any).Bun.file(path, { type: file.contentType })
            : new Blob([], { type: file.contentType })
          formData.append(part.key, blob, path)
          return Effect.as(Stream.run(file.content, fs.sink(path)), formData)
        }
      )
    ),
    Effect.catchTags({
      SystemError: (err) => Effect.fail(FormDataError("InternalError", err)),
      BadArgument: (err) => Effect.fail(FormDataError("InternalError", err))
    })
  )
