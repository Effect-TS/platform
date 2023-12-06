/**
 * @since 1.0.0
 *
 * Also includes exports from [`@effect/platform/WebSocket`](https://effect-ts.github.io/platform/platform/WebSocket.ts.html).
 */
import type * as Socket from "@effect/platform-browser/WebSocket"
import type { PlatformError } from "@effect/platform/Error"
import type * as Layer from "effect/Layer"
import * as internal from "./internal/webSocket.js"

/**
 * @since 1.0.0
 */
export * from "@effect/platform/WebSocket"

/**
 * Creates a WebSocket layer.
 *
 * @since 1.0.0
 * @category models
 */
export const layer: (url: string | URL) => Layer.Layer<never, PlatformError, Socket.Socket> = internal.layer
