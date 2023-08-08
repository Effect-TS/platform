/**
 * @since 1.0.0
 */
import type * as Data from "@effect/data/Data"
import type * as ClientRequest from "@effect/platform/Http/ClientRequest"
import type * as ClientResponse from "@effect/platform/Http/ClientResponse"
import * as internal from "@effect/platform/internal/http/clientError"

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
 * @category error
 */
export type HttpClientError = RequestError | ResponseError

/**
 * @since 1.0.0
 */
export namespace HttpError {
  /**
   * @since 1.0.0
   * @category models
   */
  export interface Proto extends Data.Case {
    readonly [TypeId]: TypeId
    readonly _tag: string
  }

  /**
   * @since 1.0.0
   */
  export type ProvidedFields = TypeId | "_tag" | keyof Data.Case
}

/**
 * @since 1.0.0
 * @category error
 */
export interface RequestError extends HttpError.Proto {
  readonly _tag: "RequestError"
  readonly request: ClientRequest.ClientRequest
  readonly reason: "Transport" | "Encode"
  readonly error: unknown
}

/**
 * @since 1.0.0
 * @category error
 */
export const RequestError: (props: Omit<RequestError, HttpError.ProvidedFields>) => RequestError = internal.requestError

/**
 * @since 1.0.0
 * @category error
 */
export interface ResponseError extends HttpError.Proto {
  readonly _tag: "ResponseError"
  readonly request: ClientRequest.ClientRequest
  readonly response: ClientResponse.ClientResponse
  readonly reason: "StatusCode" | "Decode" | "EmptyBody"
  readonly error: unknown
}

/**
 * @since 1.0.0
 * @category error
 */
export const ResponseError: (props: Omit<ResponseError, HttpError.ProvidedFields>) => ResponseError =
  internal.responseError
