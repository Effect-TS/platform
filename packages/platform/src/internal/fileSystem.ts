import { Tag } from "@effect/data/Context"
import * as Effect from "@effect/io/Effect"
import type { FileSystem } from "@effect/platform/FileSystem"
import * as Sink from "@effect/stream/Sink"
import * as Stream from "@effect/stream/Stream"

export const tag = Tag<FileSystem>()

/** @internal */
export const make = (impl: Omit<FileSystem, "stream" | "sink">): FileSystem => {
  return tag.of({
    ...impl,
    stream: () => Stream.empty,
    sink: () => Sink.forEach(() => Effect.unit())
  })
}
