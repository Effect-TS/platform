/**
 * @since 1.0.0
 */
import type { LazyArg } from "@effect/data/Function"
import type * as Effect from "@effect/io/Effect"
import type * as Layer from "@effect/io/Layer"
import type * as Scope from "@effect/io/Scope"
import * as internal from "@effect/platform-node/internal/http/server"
import type * as Server from "@effect/platform/Http/Server"
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
  evaluate: LazyArg<Http.Server<typeof Http.IncomingMessage, typeof Http.ServerResponse>>,
  options: Net.ListenOptions
) => Effect.Effect<Scope.Scope, never, Server.HttpServer> = internal.make

/**
 * @since 1.0.0
 * @category layers
 */
export const layer: (
  evaluate: LazyArg<Http.Server<typeof Http.IncomingMessage, typeof Http.ServerResponse>>,
  options: Net.ListenOptions
) => Layer.Layer<never, never, Server.HttpServer> = internal.layer
