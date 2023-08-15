import * as Context from "@effect/data/Context"
import * as Effect from "@effect/io/Effect"
import type * as App from "@effect/platform/Http/App"
import type * as Server from "@effect/platform/Http/Server"
import type * as Error from "@effect/platform/Http/ServerError"

/** @internal */
export const TypeId: Server.TypeId = Symbol.for("@effect/platform/Http/Server") as Server.TypeId

/** @internal */
export const serverTag = Context.Tag<Server.Server>("@effect/platform/Http/Server")

const serverProto = {
  [TypeId]: TypeId
}

/** @internal */
export const isServer = (u: unknown): u is Server.Server => typeof u === "object" && u !== null && TypeId in u

/** @internal */
export const make = (
  options: {
    readonly serve: (httpApp: App.Default<unknown, unknown>) => Effect.Effect<never, Error.ServeError, never>
    readonly address: Server.Address
  }
): Server.Server => Object.assign(Object.create(serverProto), options)

/** @internal */
export const serveWithoutResponse = <R, E>(httpApp: App.Default<R, E>) =>
  Effect.flatMap(
    serverTag,
    (server) => server.serve(httpApp)
  )
