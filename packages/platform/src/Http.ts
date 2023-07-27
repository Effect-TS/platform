import type * as Effect from "@effect/io/Effect"

/**
 * @since 1.0.0
 * @category models
 */
export interface HttpApp<R, E, In, Out> {
  (request: In): Effect.Effect<R, E, Out>
}

/**
 * @since 1.0.0
 * @category models
 */
export type Method =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS"
