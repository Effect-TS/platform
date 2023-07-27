import type * as Http from "@effect/platform/Http"
import type * as Body from "@effect/platform/Http/Body"
import type * as Headers from "@effect/platform/Http/Headers"
import type * as UrlParams from "@effect/platform/Http/UrlParams"

/**
 * @since 1.0.0
 * @category type ids
 */
export const TypeId = Symbol.for("@effect/platform/Http/ClientRequest")

/**
 * @since 1.0.0
 * @category type ids
 */
export type TypeId = typeof TypeId

/**
 * @since 1.0.0
 * @category models
 */
export interface ClientRequest {
  readonly [TypeId]: TypeId
  readonly method: Http.Method
  readonly url: string
  readonly urlParams: UrlParams.UrlParams
  readonly headers: Headers.Headers
  readonly body: Body.Body
}
