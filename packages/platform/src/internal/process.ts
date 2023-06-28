import * as Brand from "@effect/data/Brand"
import * as Chunk from "@effect/data/Chunk"
import { Tag } from "@effect/data/Context"
import { pipe } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import type * as Process from "@effect/platform/Process"
import * as Sink from "@effect/stream/Sink"
import * as Stream from "@effect/stream/Stream"

/** @internal */
export const ProcessTypeId: Process.ProcessTypeId = Symbol.for("@effect/platform/Process") as Process.ProcessTypeId

/** @internal */
export const ExitCode = Brand.nominal<Process.ExitCode>()

/** @internal */
export const ProcessId = Brand.nominal<Process.Process.Id>()

/** @internal */
export const ProcessExecutor = Tag<Process.ProcessExecutor>()

/** @internal */
export const makeExecutor = (start: Process.ProcessExecutor["start"]): Process.ProcessExecutor => ({
  start,
  stream: (command) =>
    pipe(
      Stream.fromEffect(start(command)),
      Stream.flatMap((process) => process.stdout)
    ),
  string: (command, encoding = "utf-8") =>
    pipe(
      start(command),
      Effect.flatMap((process) => Stream.run(process.stdout, collectUint8Array)),
      Effect.map((bytes) => new TextDecoder(encoding).decode(bytes))
    )
})

const collectUint8Array: Sink.Sink<never, never, Uint8Array, never, Uint8Array> = Sink.foldLeftChunks(
  new Uint8Array(),
  (bytes, chunk: Chunk.Chunk<Uint8Array>) => Chunk.reduce(chunk, bytes, (acc, curr) => Buffer.concat([acc, curr]))
)
