/**
 * @since 1.0.0
 */
import * as Context from "effect/Context"
import type * as WS from "../WebSocket.js"

export const TypeId: WS.TypeId = Symbol.for(
  "@effect/platform/WebSocket"
) as WS.TypeId

export const tag = Context.Tag<WS.Socket>("@effect/platform/WebSocket")

export const make = (impl: Omit<WS.Socket, WS.TypeId>) =>
  tag.of({
    [TypeId]: TypeId,
    ...impl
  })
