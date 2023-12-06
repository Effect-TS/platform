/**
 * @since 1.0.0
 */
import type * as Context from "effect/Context"
import type * as Effect from "effect/Effect"
import type * as Stream from "effect/Stream"
import * as internal from "./internal/webSocket.js"

/**
 * @since 1.0.0
 * @category type id
 */
export const TypeId: unique symbol = internal.TypeId

/**
 * @since 1.0.0
 * @category type id
 */
export type TypeId = typeof TypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface Socket {
  readonly [TypeId]: TypeId
  send: (data: string | Blob) => Effect.Effect<never, never, void>
  messages: Stream.Stream<never, never, string | Blob | ArrayBuffer>
  errors: Stream.Stream<never, never, Event>
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const make: (
  impl: Omit<Socket, typeof TypeId>
) => Socket = internal.make

/**
 * @since 1.0.0
 * @category tags
 */
export const Socket: Context.Tag<Socket, Socket> = internal.tag
