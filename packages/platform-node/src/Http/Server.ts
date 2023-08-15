/**
 * @since 1.0.0
 */
import type { LazyArg } from "@effect/data/Function"
import type * as Effect from "@effect/io/Effect"
import type * as Layer from "@effect/io/Layer"
import type * as Scope from "@effect/io/Scope"
import * as internal from "@effect/platform-node/internal/http/server"
import type * as App from "@effect/platform/Http/App"
import type * as Server from "@effect/platform/Http/Server"
import type * as Error from "@effect/platform/Http/ServerError"
import type * as ServerRequest from "@effect/platform/Http/ServerRequest"
import type * as ServerResponse from "@effect/platform/Http/ServerResponse"
import type * as Http from "node:http"
import type * as Net from "node:net"

/**
 * @since 1.0.0
 */
export * from "@effect/platform/Http/Server"

/**
 * @since 1.0.0
 * @category constructors
 */
export const make: (
  evaluate: LazyArg<Http.Server>,
  options: Net.ListenOptions
) => Effect.Effect<Scope.Scope, never, Server.Server> = internal.make

/**
 * @since 1.0.0
 * @category middleware
 */
export const respond: <R, E>(
  httpApp: App.Default<R, E>
) => App.HttpApp<R, E | Error.ResponseError, ServerResponse.ServerResponse.NonEffectBody> = internal.respond

/**
 * @since 1.0.0
 * @category accessors
 */
export const serve: <R, E>(
  httpApp: App.Default<R, E>
) => Effect.Effect<Scope.Scope | Server.Server | Exclude<R, ServerRequest.ServerRequest>, Error.ServeError, never> =
  internal.serve

/**
 * @since 1.0.0
 * @category layers
 */
export const layer: (
  evaluate: LazyArg<Http.Server<typeof Http.IncomingMessage, typeof Http.ServerResponse>>,
  options: Net.ListenOptions
) => Layer.Layer<never, never, Server.Server> = internal.layer
