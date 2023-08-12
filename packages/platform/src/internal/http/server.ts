import * as Context from "@effect/data/Context"
import { dual } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import * as Fiber from "@effect/io/Fiber"
import type * as App from "@effect/platform/Http/App"
import type * as Middleware from "@effect/platform/Http/Middleware"
import type * as Server from "@effect/platform/Http/Server"
import type * as Error from "@effect/platform/Http/ServerError"
import * as internalApp from "@effect/platform/internal/http/app"

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
  serve: (
    httpApp: App.Default<unknown, unknown>,
    middleware?: Middleware.Middleware
  ) => Effect.Effect<never, never, Fiber.RuntimeFiber<Error.ServeError, never>>
): Server.HttpServer => Object.assign(Object.create(httpServerProto), { serve })

/** @internal */
export const serve = dual<
  {
    (): <R, E>(
      httpApp: App.Default<R, E>
    ) => Effect.Effect<R | Server.HttpServer, never, Fiber.RuntimeFiber<Error.ServeError, never>>
    <R, E, App extends App.Default<any, any>>(
      middleware: Middleware.Middleware.Applied<R, E, App>
    ): (
      httpApp: App.Default<R, E>
    ) => Effect.Effect<
      Server.HttpServer | App.HttpApp.Context<App>,
      never,
      Fiber.RuntimeFiber<Error.ServeError, never>
    >
  },
  {
    <R, E>(
      httpApp: App.Default<R, E>
    ): Effect.Effect<Server.HttpServer | R, never, Fiber.RuntimeFiber<Error.ServeError, never>>
    <R, E, App extends App.Default<any, any>>(
      httpApp: App.Default<R, E>,
      middleware: Middleware.Middleware.Applied<R, E, App>
    ): Effect.Effect<
      Server.HttpServer | App.HttpApp.Context<App>,
      never,
      Fiber.RuntimeFiber<Error.ServeError, never>
    >
  }
>(
  (args) => internalApp.isHttpApp(args[0]),
  <R, E, App extends App.Default<any, any>>(
    httpApp: App.Default<R, E>,
    middleware?: Middleware.Middleware.Applied<R, E, App>
  ) =>
    Effect.flatMap(
      httpServerTag,
      (server) => server.serve(httpApp, middleware as any)
    )
)

/** @internal */
export const serveJoin = dual<
  {
    (): <R, E>(
      httpApp: App.Default<R, E>
    ) => Effect.Effect<R | Server.HttpServer, Error.ServeError, never>
    <R, E, App extends App.Default<any, any>>(
      middleware: Middleware.Middleware.Applied<R, E, App>
    ): (
      httpApp: App.Default<R, E>
    ) => Effect.Effect<Server.HttpServer | App.HttpApp.Context<App>, Error.ServeError, never>
  },
  {
    <R, E>(
      httpApp: App.Default<R, E>
    ): Effect.Effect<Server.HttpServer | R, Error.ServeError, never>
    <R, E, App extends App.Default<any, any>>(
      httpApp: App.Default<R, E>,
      middleware: Middleware.Middleware.Applied<R, E, App>
    ): Effect.Effect<Server.HttpServer | App.HttpApp.Context<App>, Error.ServeError, never>
  }
>(
  (args) => internalApp.isHttpApp(args[0]),
  <R, E, App extends App.Default<any, any>>(
    httpApp: App.Default<R, E>,
    middleware?: Middleware.Middleware.Applied<R, E, App>
  ) =>
    Effect.flatMap(
      Effect.flatMap(
        httpServerTag,
        (server) => server.serve(httpApp, middleware as any)
      ),
      Fiber.join
    )
)
