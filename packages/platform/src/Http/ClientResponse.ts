/**
 * @since 1.0.0
 */
import type * as ClientRequest from "@effect/platform/Http/ClientRequest"
import type * as IncomingMessage from "@effect/platform/Http/IncomingMessage"
import * as internal from "@effect/platform/internal/http/clientResponse"

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
export interface ClientResponse extends IncomingMessage.IncomingMessage {
  readonly [TypeId]: TypeId
  readonly status: number
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const fromWeb: (request: ClientRequest.ClientRequest, source: Response) => ClientResponse = internal.fromWeb
