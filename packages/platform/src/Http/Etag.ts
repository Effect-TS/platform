/**
 * @since 1.0.0
 */
import type * as Context from "@effect/data/Context"
import type * as Effect from "@effect/io/Effect"
import type * as FileSystem from "@effect/platform/FileSystem"
import * as internal from "@effect/platform/internal/http/etag"

/**
 * @since 1.0.0
 * @category type ids
 */
export const TypeId: unique symbol = internal.TypeId

/**
 * @since 1.0.0
 * @category type ids
 */
export type TypeId = typeof TypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface EtagGenerator {
  readonly [TypeId]: TypeId
  readonly fromFileInfo: (info: FileSystem.File.Info) => Effect.Effect<never, never, string>
}

/**
 * @since 1.0.0
 * @category tags
 */
export const EtagGenerator: Context.Tag<EtagGenerator, EtagGenerator> = internal.tag
