/**
 * @since 1.0.0
 */
import * as Chunk from "@effect/data/Chunk"
import { globalValue } from "@effect/data/Global"
import * as Option from "@effect/data/Option"
import * as FiberRef from "@effect/io/FiberRef"
import * as FileSystem from "@effect/platform/FileSystem"
import type * as Stream from "@effect/stream/Stream"

/**
 * @since 1.0.0
 * @category type ids
 */
export const TypeId = Symbol.for("@effect/platform/Http/FormData")

/**
 * @since 1.0.0
 * @category type ids
 */
export type TypeId = typeof TypeId

/**
 * @since 1.0.0
 * @category models
 */
export type Part = Field | File

/**
 * @since 1.0.0
 */
export namespace Part {
  /**
   * @since 1.0.0
   * @category models
   */
  export interface Proto {
    readonly [TypeId]: TypeId
    readonly _tag: string
  }
}

/**
 * @since 1.0.0
 * @category models
 */
export interface Field extends Part.Proto {
  readonly _tag: "Field"
  readonly key: string
  readonly contentType: string
  readonly value: string
}

/**
 * @since 1.0.0
 * @category models
 */
export interface File extends Part.Proto {
  readonly _tag: "File"
  readonly key: string
  readonly name: string
  readonly contentType: string
  readonly content: Stream.Stream<never, unknown, Uint8Array>
}

/**
 * @since 1.0.0
 * @category fiber refs
 */
export const maxFieldSize: FiberRef.FiberRef<FileSystem.Size> = globalValue(
  "@effect/platform/Http/FormData/maxFieldSize",
  () => FiberRef.unsafeMake(FileSystem.Size(100))
)

/**
 * @since 1.0.0
 * @category fiber refs
 */
export const maxFileSize: FiberRef.FiberRef<Option.Option<FileSystem.Size>> = globalValue(
  "@effect/platform/Http/FormData/maxFileSize",
  () => FiberRef.unsafeMake(Option.none<FileSystem.Size>())
)

/**
 * @since 1.0.0
 * @category fiber refs
 */
export const fieldMimeTypes: FiberRef.FiberRef<Chunk.Chunk<string>> = globalValue(
  "@effect/platform/Http/FormData/fieldMimeTypes",
  () => FiberRef.unsafeMake(Chunk.make("application/json"))
)
