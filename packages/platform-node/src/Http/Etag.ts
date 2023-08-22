/**
 * @since 1.0.0
 */
import type * as Layer from "@effect/io/Layer"
import * as internal from "@effect/platform-node/internal/http/etag"
import type * as Etag from "@effect/platform/Http/Etag"

export * from "@effect/platform/Http/Etag"

/**
 * @since 1.0.0
 * @category layers
 */
export const layer: Layer.Layer<never, never, Etag.EtagGenerator> = internal.layer
