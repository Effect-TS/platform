/**
 * @since 1.0.0
 */
import type * as Context from "@effect/data/Context"
import type * as Effect from "@effect/io/Effect"
import type * as App from "@effect/platform/Http/App"
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
  readonly serve: <R, E>(httpApp: App.Default<R, E>) => Effect.Effect<R, Error.ServeError, never>
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
  serve: (httpApp: App.Default<unknown, unknown>) => Effect.Effect<never, Error.ServeError, never>
) => HttpServer = internal.make

/**
 * @since 1.0.0
 * @category accessors
 */
export const serve: <R, E>(httpApp: App.Default<R, E>) => Effect.Effect<HttpServer | R, Error.ServeError, never> =
  internal.serve
