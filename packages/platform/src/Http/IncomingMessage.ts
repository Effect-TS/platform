import type * as Chunk from "@effect/data/Chunk"
import type * as Effect from "@effect/io/Effect"
import type * as Error from "@effect/platform/Http/Error"
import type * as FormData from "@effect/platform/Http/FormData"
import type * as Stream from "@effect/stream/Stream"

/**
 * @since 1.0.0
 * @category type ids
 */
export const TypeId = Symbol.for("@effect/platform/Http/IncomingMessage")

/**
 * @since 1.0.0
 * @category type ids
 */
export type TypeId = typeof TypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface IncomingMessage {
  readonly [TypeId]: TypeId
  readonly headers: Chunk.Chunk<readonly [string, string]>
  readonly json: Effect.Effect<never, Error.TransportError, unknown>
  readonly text: Effect.Effect<never, Error.TransportError, string>
  readonly blob: Effect.Effect<never, Error.TransportError, Blob>
  readonly formData: Effect.Effect<never, Error.TransportError, FormData>
  readonly formDataStream: Stream.Stream<never, Error.TransportError, FormData.Part>
  readonly stream: Stream.Stream<never, Error.TransportError, Uint8Array>
}
