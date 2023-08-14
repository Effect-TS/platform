import * as Chunk from "@effect/data/Chunk"
import * as Context from "@effect/data/Context"
import { dual } from "@effect/data/Function"
import * as Option from "@effect/data/Option"
import { pipeArguments } from "@effect/data/Pipeable"
import * as Effect from "@effect/io/Effect"
import * as App from "@effect/platform/Http/App"
import type * as Method from "@effect/platform/Http/Method"
import type * as Router from "@effect/platform/Http/Router"
import * as Error from "@effect/platform/Http/ServerError"
import * as ServerRequest from "@effect/platform/Http/ServerRequest"
import type * as ServerResponse from "@effect/platform/Http/ServerResponse"
import * as Schema from "@effect/schema/Schema"
import type { HTTPMethod } from "find-my-way"
import FindMyWay from "find-my-way"

/** @internal */
export const TypeId: Router.TypeId = Symbol.for("@effect/platform/Http/Router") as Router.TypeId

/** @internal */
export const RouteTypeId: Router.RouteTypeId = Symbol.for("@effect/platform/Http/Router/Route") as Router.RouteTypeId

/** @internal */
export const RouteContextTypeId: Router.RouteContextTypeId = Symbol.for(
  "@effect/platform/Http/Router/RouteContext"
) as Router.RouteContextTypeId

/** @internal */
export const RouteContext = Context.Tag<Router.RouteContext>("@effect/platform/Http/Router/RouteContext")

/** @internal */
export const context: Router.ContextHelpers = {
  request: Effect.map(RouteContext, (_) => _.request),
  params: Effect.map(RouteContext, (_) => _.params),
  searchParams: Effect.map(RouteContext, (_) => _.searchParams),
  schemaParams<I extends Readonly<Record<string, string>>, A>(schema: Schema.Schema<I, A>) {
    const parse = Schema.parse(schema)
    return Effect.flatMap(
      RouteContext,
      (_) =>
        parse({
          ..._.searchParams,
          ..._.params
        })
    )
  },
  schemaHeaders<I extends Readonly<Record<string, string>>, A>(schema: Schema.Schema<I, A>) {
    const parse = ServerRequest.schemaHeaders(schema)
    return Effect.flatMap(
      RouteContext,
      (_) => parse(_.request)
    )
  },
  schemaBodyJson<I, A>(schema: Schema.Schema<I, A>) {
    const parse = ServerRequest.schemaBodyJson(schema)
    return Effect.flatMap(
      RouteContext,
      (_) => parse(_.request)
    )
  },
  schemaBodyUrlParams<I extends Readonly<Record<string, string>>, A>(schema: Schema.Schema<I, A>) {
    const parse = ServerRequest.schemaBodyUrlParams(schema)
    return Effect.flatMap(
      RouteContext,
      (_) => parse(_.request)
    )
  }
}

class RouterImpl<R, E> implements Router.Router<R, E> {
  readonly [App.TypeId]: App.TypeId = App.TypeId
  readonly [TypeId]: Router.TypeId = TypeId
  constructor(
    readonly routes: Chunk.Chunk<Router.Route<R, E>>,
    readonly mounts: Chunk.Chunk<readonly [string, App.Default<R, E>]>
  ) {}
  pipe() {
    return pipeArguments(this, arguments)
  }
  get handler() {
    const router = FindMyWay()
    Chunk.forEach(this.mounts, ([path, app]) => {
      const fn = () => {}
      fn.handler = App.mapRequest(app, (request: ServerRequest.ServerRequest) => sliceRequestUrl(request, path))
      router.all(path, fn)
      router.all(path + "/*", fn)
    })
    Chunk.forEach(this.routes, (route) => {
      const fn = () => {}
      fn.handler = route
      if (route.method === "*") {
        router.all(route.path, fn)
      } else {
        router.on(route.method, route.path, fn)
      }
    })
    return (
      request: ServerRequest.ServerRequest
    ): Effect.Effect<Exclude<R, Router.RouteContext>, E | Error.RouteNotFound, ServerResponse.ServerResponse> => {
      const result = router.find(request.method as HTTPMethod, request.url)
      if (result === null) {
        return Effect.fail(Error.RouteNotFound({ request }))
      }
      const handler = (result.handler as any).handler
      if (App.TypeId in handler) {
        return (handler as App.Default<Exclude<R, Router.RouteContext>, E>).handler(request)
      }
      const route = handler as Router.Route<R, E>
      if (route.prefix._tag === "Some") {
        request = sliceRequestUrl(request, route.prefix.value)
      }
      return Effect.provideService(
        route.handler,
        RouteContext,
        new RouteContextImpl(request, result.params, result.searchParams)
      )
    }
  }
}

function sliceRequestUrl(request: ServerRequest.ServerRequest, prefix: string) {
  const prefexLen = prefix.length
  return request.setUrl(request.url.length <= prefexLen ? "/" : request.url.slice(prefexLen))
}

class RouteImpl<R, E> implements Router.Route<R, E> {
  readonly [RouteTypeId]: Router.RouteTypeId = RouteTypeId
  constructor(
    readonly method: Method.Method | "*",
    readonly path: string,
    readonly handler: Router.Route.Handler<R, E>,
    readonly prefix = Option.none<string>()
  ) {}
}

class RouteContextImpl implements Router.RouteContext {
  readonly [RouteContextTypeId]: Router.RouteContextTypeId = RouteContextTypeId
  constructor(
    readonly request: ServerRequest.ServerRequest,
    readonly params: Readonly<Record<string, string | undefined>>,
    readonly searchParams: Readonly<Record<string, string>>
  ) {}
}

/** @internal */
export const empty: Router.Router<never, never> = new RouterImpl(Chunk.empty(), Chunk.empty())

/** @internal */
export const fromIterable = <R, E>(
  routes: Iterable<Router.Route<R, E>>
): Router.Router<R, E> => new RouterImpl(Chunk.fromIterable(routes), Chunk.empty())

/** @internal */
export const makeRoute = <R, E>(
  method: Method.Method,
  path: string,
  handler: Router.Route.Handler<R, E>,
  prefix: Option.Option<string> = Option.none()
): Router.Route<R, E> => new RouteImpl(method, path, handler, prefix)

/** @internal */
export const concat = dual<
  <R1, E1>(that: Router.Router<R1, E1>) => <R, E>(self: Router.Router<R, E>) => Router.Router<R | R1, E | E1>,
  <R, E, R1, E1>(self: Router.Router<R, E>, that: Router.Router<R1, E1>) => Router.Router<R | R1, E | E1>
>(2, (self, that) => new RouterImpl(Chunk.appendAll(self.routes, that.routes) as any, self.mounts))

const removeTrailingSlash = (path: string) => (path.endsWith("/") ? path.slice(0, -1) : path)

/** @internal */
export const prefixAll = dual<
  (prefix: string) => <R, E>(self: Router.Router<R, E>) => Router.Router<R, E>,
  <R, E>(self: Router.Router<R, E>, prefix: string) => Router.Router<R, E>
>(
  2,
  (self, prefix) => {
    prefix = removeTrailingSlash(prefix)
    return new RouterImpl(
      Chunk.map(self.routes, (route) =>
        new RouteImpl(
          route.method,
          route.path === "/" ? prefix : prefix + route.path,
          route.handler,
          Option.orElse(
            Option.map(route.prefix, (_) => prefix + _),
            () => Option.some(prefix)
          )
        )),
      Chunk.map(self.mounts, ([path, app]) => [path === "/" ? prefix : prefix + path, app])
    )
  }
)

/** @internal */
export const mount = dual<
  <R1, E1>(
    path: string,
    that: Router.Router<R1, E1>
  ) => <R, E>(self: Router.Router<R, E>) => Router.Router<R | R1, E | E1>,
  <R, E, R1, E1>(
    self: Router.Router<R, E>,
    path: string,
    that: Router.Router<R1, E1>
  ) => Router.Router<R | R1, E | E1>
>(
  3,
  (self, path, that) => concat(self, prefixAll(that, path))
)

/** @internal */
export const mountApp = dual<
  <R1, E1>(
    path: string,
    that: App.Default<R1, E1>
  ) => <R, E>(self: Router.Router<R, E>) => Router.Router<R | R1, E | E1>,
  <R, E, R1, E1>(
    self: Router.Router<R, E>,
    path: string,
    that: App.Default<R1, E1>
  ) => Router.Router<R | R1, E | E1>
>(
  3,
  (self, path, that) => new RouterImpl(self.routes, Chunk.append(self.mounts, [removeTrailingSlash(path), that]) as any)
)

/** @internal */
export const route = (method: Method.Method | "*"): {
  <R1, E1>(
    path: string,
    handler: Router.Route.Handler<R1, E1>
  ): <R, E>(self: Router.Router<R, E>) => Router.Router<R | Exclude<R1, Router.RouteContext>, E1 | E>
  <R, E, R1, E1>(
    self: Router.Router<R, E>,
    path: string,
    handler: Router.Route.Handler<R1, E1>
  ): Router.Router<R | Exclude<R1, Router.RouteContext>, E | E1>
} =>
  dual<
    <R1, E1>(
      path: string,
      handler: Router.Route.Handler<R1, E1>
    ) => <R, E>(self: Router.Router<R, E>) => Router.Router<R | Exclude<R1, Router.RouteContext>, E | E1>,
    <R, E, R1, E1>(
      self: Router.Router<R, E>,
      path: string,
      handler: Router.Route.Handler<R1, E1>
    ) => Router.Router<R | Exclude<R1, Router.RouteContext>, E | E1>
  >(3, (self, path, handler) =>
    new RouterImpl(
      Chunk.append(self.routes, new RouteImpl(method, path, handler)) as any,
      self.mounts
    ))

/** @internal */
export const all = route("*")

/** @internal */
export const get = route("GET")

/** @internal */
export const post = route("POST")

/** @internal */
export const put = route("PUT")

/** @internal */
export const patch = route("PATCH")

/** @internal */
export const del = route("DELETE")

/** @internal */
export const head = route("HEAD")

/** @internal */
export const options = route("OPTIONS")
