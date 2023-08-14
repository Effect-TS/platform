/**
 * @since 1.0.0
 */
import type * as Effect from "@effect/io/Effect"
import type * as ServerRequest from "@effect/platform/Http/ServerRequest"
import type * as ServerResponse from "@effect/platform/Http/ServerResponse"

/**
 * @since 1.0.0
 * @category models
 */
export interface HttpApp<R, E, A> extends Effect.Effect<R | ServerRequest.ServerRequest, E, A> {
}

/**
 * @since 1.0.0
 */
export namespace HttpApp {
  /**
   * @since 1.0.0
   */
  export type Context<A> = A extends HttpApp<infer R, infer _E, infer _A> ? R : never

  /**
   * @since 1.0.0
   */
  export type Error<A> = A extends HttpApp<infer _R, infer E, infer _A> ? E : never
}

/**
 * @since 1.0.0
 * @category models
 */
export type Default<R, E> = HttpApp<R, E, ServerResponse.ServerResponse>
