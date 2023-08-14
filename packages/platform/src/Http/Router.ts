/**
 * @since 1.0.0
 */
import type * as Chunk from "@effect/data/Chunk"
import type * as Context from "@effect/data/Context"
import type * as Option from "@effect/data/Option"
import type * as Effect from "@effect/io/Effect"
import type * as App from "@effect/platform/Http/App"
import type * as Method from "@effect/platform/Http/Method"
import type * as Error from "@effect/platform/Http/ServerError"
import type * as ServerRequest from "@effect/platform/Http/ServerRequest"
import type * as ServerResponse from "@effect/platform/Http/ServerResponse"
import * as internal from "@effect/platform/internal/http/router"
import type * as ParseResult from "@effect/schema/ParseResult"
import type * as Schema from "@effect/schema/Schema"

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
export interface Router<R, E> extends App.Default<Exclude<R, RouteContext>, E | Error.RouteNotFound> {
  readonly [TypeId]: TypeId
  readonly routes: Chunk.Chunk<Route<R, E>>
  readonly mounts: Chunk.Chunk<readonly [string, App.Default<R, E>]>
}

/**
 * @since 1.0.0
 * @category type ids
 */
export const RouteTypeId: unique symbol = internal.RouteTypeId

/**
 * @since 1.0.0
 * @category type ids
 */
export type RouteTypeId = typeof RouteTypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface Route<R, E> {
  readonly [RouteTypeId]: RouteTypeId
  readonly method: Method.Method | "*"
  readonly path: string
  readonly handler: Route.Handler<R, E>
  readonly prefix: Option.Option<string>
}

/**
 * @since 1.0.0
 */
export namespace Route {
  /**
   * @since 1.0.0
   */
  export type Handler<R, E> = Effect.Effect<
    R,
    E,
    ServerResponse.ServerResponse
  >
}

/**
 * @since 1.0.0
 * @category type ids
 */
export const RouteContextTypeId: unique symbol = internal.RouteContextTypeId

/**
 * @since 1.0.0
 * @category type ids
 */
export type RouteContextTypeId = typeof RouteContextTypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface RouteContext {
  readonly [RouteContextTypeId]: RouteContextTypeId
  readonly request: ServerRequest.ServerRequest
  readonly params: Readonly<Record<string, string | undefined>>
  readonly searchParams: Readonly<Record<string, string>>
}

/**
 * @since 1.0.0
 * @category route context
 */
export const RouteContext: Context.Tag<RouteContext, RouteContext> = internal.RouteContext

/**
 * @since 1.0.0
 * @category models
 */
export interface ContextHelpers {
  readonly request: Effect.Effect<
    RouteContext,
    never,
    ServerRequest.ServerRequest
  >
  readonly params: Effect.Effect<
    RouteContext,
    never,
    Readonly<Record<string, string | undefined>>
  >
  readonly searchParams: Effect.Effect<
    RouteContext,
    never,
    Readonly<Record<string, string>>
  >
  readonly schemaParams: <I extends Readonly<Record<string, string>>, A>(
    schema: Schema.Schema<I, A>
  ) => Effect.Effect<RouteContext, ParseResult.ParseError, A>
  readonly schemaHeaders: <I extends Readonly<Record<string, string>>, A>(
    schema: Schema.Schema<I, A>
  ) => Effect.Effect<RouteContext, ParseResult.ParseError, A>
  readonly schemaBodyJson: <I, A>(
    schema: Schema.Schema<I, A>
  ) => Effect.Effect<RouteContext, ParseResult.ParseError | Error.RequestError, A>
  readonly schemaBodyUrlParams: <I extends Readonly<Record<string, string>>, A>(
    schema: Schema.Schema<I, A>
  ) => Effect.Effect<RouteContext, Error.RequestError | ParseResult.ParseError, A>
}

/**
 * @since 1.0.0
 * @category route context
 */
export const context: ContextHelpers = internal.context

/**
 * @since 1.0.0
 * @category constructors
 */
export const empty: Router<never, never> = internal.empty

/**
 * @since 1.0.0
 * @category constructors
 */
export const fromIterable: <R, E>(
  routes: Iterable<Route<R, E>>
) => Router<R, E> = internal.fromIterable

/**
 * @since 1.0.0
 * @category constructors
 */
export const makeRoute: <R, E>(
  method: Method.Method,
  path: string,
  handler: Route.Handler<R, E>
) => Route<R, E> = internal.makeRoute

/**
 * @since 1.0.0
 * @category combinators
 */
export const prefixAll: {
  (prefix: string): <R, E>(self: Router<R, E>) => Router<R, E>
  <R, E>(self: Router<R, E>, prefix: string): Router<R, E>
} = internal.prefixAll

/**
 * @since 1.0.0
 * @category combinators
 */
export const concat: {
  <R1, E1>(that: Router<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<R1 | R, E1 | E>
  <R, E, R1, E1>(self: Router<R, E>, that: Router<R1, E1>): Router<
    R | R1,
    E | E1
  >
} = internal.concat

/**
 * @since 1.0.0
 * @category routing
 */
export const mount: {
  <R1, E1>(path: string, that: Router<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<R1 | R, E1 | E>
  <R, E, R1, E1>(
    self: Router<R, E>,
    path: string,
    that: Router<R1, E1>
  ): Router<R | R1, E | E1>
} = internal.mount

/**
 * @since 1.0.0
 * @category routing
 */
export const mountApp: {
  <R1, E1>(path: string, that: App.Default<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<R1 | R, E1 | E>
  <R, E, R1, E1>(
    self: Router<R, E>,
    path: string,
    that: App.Default<R1, E1>
  ): Router<R | R1, E | E1>
} = internal.mountApp

/**
 * @since 1.0.0
 * @category routing
 */
export const route: (method: Method.Method) => {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<R | Exclude<R1, RouteContext>, E1 | E>
  <R, E, R1, E1>(
    self: Router<R, E>,
    path: string,
    handler: Route.Handler<R1, E1>
  ): Router<R | Exclude<R1, RouteContext>, E | E1>
} = internal.route

/**
 * @since 1.0.0
 * @category routing
 */
export const all: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<R | Exclude<R1, RouteContext>, E1 | E>
  <R, E, R1, E1>(
    self: Router<R, E>,
    path: string,
    handler: Route.Handler<R1, E1>
  ): Router<R | Exclude<R1, RouteContext>, E | E1>
} = internal.all

/**
 * @since 1.0.0
 * @category routing
 */
export const get: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<R | Exclude<R1, RouteContext>, E1 | E>
  <R, E, R1, E1>(
    self: Router<R, E>,
    path: string,
    handler: Route.Handler<R1, E1>
  ): Router<R | Exclude<R1, RouteContext>, E | E1>
} = internal.get

/**
 * @since 1.0.0
 * @category routing
 */
export const post: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<R | Exclude<R1, RouteContext>, E1 | E>
  <R, E, R1, E1>(
    self: Router<R, E>,
    path: string,
    handler: Route.Handler<R1, E1>
  ): Router<R | Exclude<R1, RouteContext>, E | E1>
} = internal.post

/**
 * @since 1.0.0
 * @category routing
 */
export const patch: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<R | Exclude<R1, RouteContext>, E1 | E>
  <R, E, R1, E1>(
    self: Router<R, E>,
    path: string,
    handler: Route.Handler<R1, E1>
  ): Router<R | Exclude<R1, RouteContext>, E | E1>
} = internal.patch

/**
 * @since 1.0.0
 * @category routing
 */
export const put: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<R | Exclude<R1, RouteContext>, E1 | E>
  <R, E, R1, E1>(
    self: Router<R, E>,
    path: string,
    handler: Route.Handler<R1, E1>
  ): Router<R | Exclude<R1, RouteContext>, E | E1>
} = internal.put

/**
 * @since 1.0.0
 * @category routing
 */
export const del: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<R | Exclude<R1, RouteContext>, E1 | E>
  <R, E, R1, E1>(
    self: Router<R, E>,
    path: string,
    handler: Route.Handler<R1, E1>
  ): Router<R | Exclude<R1, RouteContext>, E | E1>
} = internal.del

/**
 * @since 1.0.0
 * @category routing
 */
export const head: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<R | Exclude<R1, RouteContext>, E1 | E>
  <R, E, R1, E1>(
    self: Router<R, E>,
    path: string,
    handler: Route.Handler<R1, E1>
  ): Router<R | Exclude<R1, RouteContext>, E | E1>
} = internal.head

/**
 * @since 1.0.0
 * @category routing
 */
export const options: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<R | Exclude<R1, RouteContext>, E1 | E>
  <R, E, R1, E1>(
    self: Router<R, E>,
    path: string,
    handler: Route.Handler<R1, E1>
  ): Router<R | Exclude<R1, RouteContext>, E | E1>
} = internal.options
