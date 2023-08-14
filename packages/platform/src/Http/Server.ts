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
export interface Server {
  readonly [TypeId]: TypeId
  readonly serve: <R, E>(httpApp: App.Default<R, E>) => Effect.Effect<R, Error.ServeError, never>
  readonly address: Address
}

/**
 * @since 1.0.0
 * @category models
 */
export type Address = UnixAddress | TcpAddress

/**
 * @since 1.0.0
 * @category models
 */
export interface TcpAddress {
  readonly _tag: "TcpAddress"
  readonly hostname: string
  readonly port: number
}

/**
 * @since 1.0.0
 * @category models
 */
export interface UnixAddress {
  readonly _tag: "UnixAddress"
  readonly path: string
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const Server: Context.Tag<Server, Server> = internal.serverTag

/**
 * @since 1.0.0
 * @category constructors
 */
export const make: (
  options: {
    readonly serve: (httpApp: App.Default<unknown, unknown>) => Effect.Effect<never, Error.ServeError, never>
    readonly address: Address
  }
) => Server = internal.make

/**
 * @since 1.0.0
 * @category accessors
 */
export const serve: <R, E>(httpApp: App.Default<R, E>) => Effect.Effect<Server | R, Error.ServeError, never> =
  internal.serve
