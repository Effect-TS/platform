/**
 * @since 1.0.0
 */
import * as Effect from "@effect/io/Effect"
import type * as Error from "@effect/platform/Http/ClientError"
import type * as Headers from "@effect/platform/Http/Headers"
import type * as ParseResult from "@effect/schema/ParseResult"
import * as Schema from "@effect/schema/Schema"
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
  readonly headers: Headers.Headers
  readonly json: Effect.Effect<never, Error.TransportError, unknown>
  readonly text: Effect.Effect<never, Error.TransportError, string>
  readonly blob: Effect.Effect<never, Error.TransportError, Blob>
  readonly formData: Effect.Effect<never, Error.TransportError, FormData>
  // readonly formDataStream: Stream.Stream<never, Error.TransportError, FormData.Part>
  readonly stream: Stream.Stream<never, Error.TransportError, Uint8Array>
}

/**
 * @since 1.0.0
 * @category schema
 */
export const parse = <I, A>(schema: Schema.Schema<I, A>) => {
  const parse = Schema.parse(schema)
  return (self: IncomingMessage): Effect.Effect<never, Error.TransportError | ParseResult.ParseError, A> =>
    Effect.flatMap(self.json, parse)
}
