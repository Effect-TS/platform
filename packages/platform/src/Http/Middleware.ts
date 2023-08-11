/**
 * @since 1.0.0
 */
import type * as Effect from "@effect/io/Effect"
import type * as App from "@effect/platform/Http/App"
import type * as ServerRequest from "@effect/platform/Http/ServerRequest"
import type * as ServerResponse from "@effect/platform/Http/ServerResponse"
import * as internal from "@effect/platform/internal/http/middleware"

/**
 * @since 1.0.0
 * @category models
 */
export interface Middleware<R, EIn, EOut> {
  (self: App.Default<never, EIn>): App.Default<R, EOut>
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const fromEffect: <R, EIn, EOut>(
  f: (
    httpApp: App.Default<never, EIn>,
    request: ServerRequest.ServerRequest
  ) => Effect.Effect<R, EOut, ServerResponse.ServerResponse>
) => Middleware<R, EIn, EOut> = internal.fromEffect

/**
 * @since 1.0.0
 * @category constructors
 */
export const logger: Middleware<never, unknown, unknown> = internal.logger

/**
 * @since 1.0.0
 * @category constructors
 */
export const tracer: Middleware<never, unknown, unknown> = internal.tracer

/**
 * @since 1.0.0
 * @category combinators
 */
export const apply: {
  <R2, E, EIn extends E, EOut>(
    middleware: Middleware<R2, EIn, EOut>
  ): <R>(httpApp: App.Default<R, E>) => App.Default<R2 | R, unknown extends EOut ? E : EOut>
  <R, E, R2, EIn extends E, EOut>(
    httpApp: App.Default<R, E>,
    middleware: Middleware<R2, EIn, EOut>
  ): App.Default<R | R2, unknown extends EOut ? E : EOut>
} = internal.apply

/**
 * @since 1.0.0
 * @category combinators
 */
export const compose: {
  <R2, EOut, EIn2 extends EOut, EOut2>(
    that: Middleware<R2, EIn2, EOut2>
  ): <R, EIn>(self: Middleware<R, EIn, EOut>) => Middleware<R2 | R, EIn, EOut2>
  <R, EIn, EOut, R2, EIn2 extends EOut, EOut2>(
    self: Middleware<R, EIn, EOut>,
    that: Middleware<R2, EIn2, EOut2>
  ): Middleware<R | R2, EIn, EOut2>
} = internal.compose

/**
 * @since 1.0.0
 * @category combinators
 */
export const composeInput: {
  <R2, EIn, EIn2, EOut2 extends EIn>(
    that: Middleware<R2, EIn2, EOut2>
  ): <R, EOut>(self: Middleware<R, EIn, EOut>) => Middleware<R2 | R, EIn2, EOut>
  <R, EIn, EOut, R2, EIn2, EOut2 extends EIn>(
    self: Middleware<R, EIn, EOut>,
    that: Middleware<R2, EIn2, EOut2>
  ): Middleware<R | R2, EIn2, EOut>
} = internal.composeInput
