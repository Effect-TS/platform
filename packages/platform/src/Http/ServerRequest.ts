/**
 * @since 1.0.0
 */
import type * as Headers from "@effect/platform/Http/Headers"
import type * as IncomingMessage from "@effect/platform/Http/IncomingMessage"
import type { Method } from "@effect/platform/Http/Method"
import type * as Error from "@effect/platform/Http/ServerError"
import * as internal from "@effect/platform/internal/http/serverRequest"

export {
  /**
   * @since 1.0.0
   * @category schema
   */
  parseSchema
} from "@effect/platform/Http/IncomingMessage"

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
export interface ServerRequest extends IncomingMessage.IncomingMessage<Error.RequestError> {
  readonly [TypeId]: TypeId
  readonly url: string
  readonly originalUrl: string
  readonly method: Method

  readonly setUrl: (url: string) => ServerRequest
  readonly replaceHeaders: (headers: Headers.Headers) => ServerRequest
}
