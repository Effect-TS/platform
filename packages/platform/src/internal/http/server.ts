import * as Context from "@effect/data/Context"
import { dual } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import type * as Scope from "@effect/io/Scope"
import type * as App from "@effect/platform/Http/App"
import type * as Server from "@effect/platform/Http/Server"
import type * as Error from "@effect/platform/Http/ServerError"
import type * as ServerRequest from "@effect/platform/Http/ServerRequest"

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
  options: Omit<Server.Server, Server.TypeId>
): Server.Server => Object.assign(Object.create(serverProto), options)

/** @internal */
export const serve = dual<
  (options?: Server.ServeOptions) => <R, E>(
    httpApp: App.Default<R, E>
  ) => Effect.Effect<Server.Server | Scope.Scope | Exclude<R, ServerRequest.ServerRequest>, Error.ServeError, never>,
  <R, E>(
    httpApp: App.Default<R, E>,
    options?: Server.ServeOptions
  ) => Effect.Effect<Server.Server | Scope.Scope | Exclude<R, ServerRequest.ServerRequest>, Error.ServeError, never>
>((args) => Effect.isEffect(args[0]), (httpApp, options) =>
  Effect.flatMap(
    serverTag,
    (server) => server.serve(httpApp, { respond: options?.respond ?? true })
  ))
