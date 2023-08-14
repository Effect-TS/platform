/**
 * @since 1.0.0
 */
import type * as Effect from "@effect/io/Effect"
import type * as Scope from "@effect/io/Scope"
import type * as FileSystem from "@effect/platform/FileSystem"
import type * as FormData from "@effect/platform/Http/FormData"
import type * as Headers from "@effect/platform/Http/Headers"
import type * as IncomingMessage from "@effect/platform/Http/IncomingMessage"
import type { Method } from "@effect/platform/Http/Method"
import type * as Error from "@effect/platform/Http/ServerError"
import * as internal from "@effect/platform/internal/http/serverRequest"
import type * as Path from "@effect/platform/Path"
import type * as Stream from "@effect/stream/Stream"

export {
  /**
   * @since 1.0.0
   * @category fiber refs
   */
  maxBodySize,
  /**
   * @since 1.0.0
   * @category schema
   */
  schemaBodyJson,
  /**
   * @since 1.0.0
   * @category schema
   */
  schemaBodyUrlParams,
  /**
   * @since 1.0.0
   * @category schema
   */
  schemaHeaders
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

  readonly formData: Effect.Effect<Scope.Scope | FileSystem.FileSystem | Path.Path, Error.RequestError, FormData>
  readonly formDataStream: Stream.Stream<never, Error.RequestError, FormData.Part>

  readonly setUrl: (url: string) => ServerRequest
  readonly replaceHeaders: (headers: Headers.Headers) => ServerRequest
}
