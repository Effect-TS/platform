import type * as IncomingMessage from "@effect/platform/Http/IncomingMessage"

/**
 * @since 1.0.0
 * @category type ids
 */
export const TypeId = Symbol.for("@effect/platform/Http/ClientResponse")

/**
 * @since 1.0.0
 * @category type ids
 */
export type TypeId = typeof TypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface ClientResponse extends IncomingMessage.IncomingMessage {
  readonly [TypeId]: TypeId
  readonly status: number
}
