/**
 * @since 1.0.0
 */
import type * as Context from "@effect/data/Context"
import type * as Effect from "@effect/io/Effect"
import type * as Fiber from "@effect/io/Fiber"
import type * as App from "@effect/platform/Http/App"
import type * as Middleware from "@effect/platform/Http/Middleware"
import type * as Error from "@effect/platform/Http/ServerError"
import * as internal from "@effect/platform/internal/http/server"

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
export interface HttpServer {
  readonly [TypeId]: TypeId
  readonly serve: {
    <R, E>(httpApp: App.Default<R, E>): Effect.Effect<R, never, Fiber.RuntimeFiber<Error.ServeError, never>>
    <R, E, RM, EX extends E, EM>(
      httpApp: App.Default<R, E>,
      middleware: Middleware.Middleware<RM, EX, EM>
    ): Effect.Effect<RM, never, Fiber.RuntimeFiber<Error.ServeError, never>>
  }
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const HttpServer: Context.Tag<HttpServer, HttpServer> = internal.httpServerTag

/**
 * @since 1.0.0
 * @category constructors
 */
export const make: (
  serve: (
    httpApp: App.Default<unknown, unknown>,
    middleware?: Middleware.Middleware<unknown, unknown, unknown> | undefined
  ) => Effect.Effect<never, never, Fiber.RuntimeFiber<Error.ServeError, never>>
) => HttpServer = internal.make

/**
 * @since 1.0.0
 * @category accessors
 */
export const serve: {
  (): <R, E>(
    httpApp: App.Default<R, E>
  ) => Effect.Effect<HttpServer | R, never, Fiber.RuntimeFiber<Error.ServeError, never>>
  <R, E, EX extends E, RM, EM>(
    middleware: Middleware.Middleware<RM, EX, EM>
  ): (
    httpApp: App.Default<R, E>
  ) => Effect.Effect<HttpServer | R | RM, never, Fiber.RuntimeFiber<Error.ServeError, never>>
  <R, E>(httpApp: App.Default<R, E>): Effect.Effect<HttpServer | R, never, Fiber.RuntimeFiber<Error.ServeError, never>>
  <R, E, EX extends E, RM, EM>(
    httpApp: App.Default<R, E>,
    middleware: Middleware.Middleware<RM, EX, EM>
  ): Effect.Effect<HttpServer | R | RM, never, Fiber.RuntimeFiber<Error.ServeError, never>>
} = internal.serve

/**
 * @since 1.0.0
 * @category accessors
 */
export const serveJoin: {
  (): <R, E>(httpApp: App.Default<R, E>) => Effect.Effect<HttpServer | R, Error.ServeError, never>
  <R, E, EX extends E, RM, EM>(
    middleware: Middleware.Middleware<RM, EX, EM>
  ): (httpApp: App.Default<R, E>) => Effect.Effect<HttpServer | R | RM, Error.ServeError, never>
  <R, E>(httpApp: App.Default<R, E>): Effect.Effect<HttpServer | R, Error.ServeError, never>
  <R, E, EX extends E, RM, EM>(
    httpApp: App.Default<R, E>,
    middleware: Middleware.Middleware<RM, EX, EM>
  ): Effect.Effect<HttpServer | R | RM, Error.ServeError, never>
} = internal.serveJoin
