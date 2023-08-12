import * as Context from "@effect/data/Context"
import * as Effect from "@effect/io/Effect"
import type * as App from "@effect/platform/Http/App"
import type * as Server from "@effect/platform/Http/Server"
import type * as Error from "@effect/platform/Http/ServerError"

/** @internal */
export const TypeId: Server.TypeId = Symbol.for("@effect/platform/Http/Server") as Server.TypeId

/** @internal */
export const httpServerTag = Context.Tag<Server.HttpServer>("@effect/platform/Http/Server")

const httpServerProto = {
  [TypeId]: TypeId
}

/** @internal */
export const isHttpServer = (u: unknown): u is Server.HttpServer => typeof u === "object" && u !== null && TypeId in u

/** @internal */
export const make = (
  serve: (httpApp: App.Default<unknown, unknown>) => Effect.Effect<never, Error.ServeError, never>
): Server.HttpServer => Object.assign(Object.create(httpServerProto), { serve })

/** @internal */
export const serve = <R, E>(httpApp: App.Default<R, E>) =>
  Effect.flatMap(
    httpServerTag,
    (server) => server.serve(httpApp)
  )
