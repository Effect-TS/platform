/**
 * @since 1.0.0
 */
import type * as Data from "@effect/data/Data"
import * as internal from "@effect/platform/internal/http/error"

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
export type HttpError = StatusError | TransportError

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
export interface StatusError extends HttpError.Proto {
  readonly _tag: "StatusError"
  readonly status: number
}

/**
 * @since 1.0.0
 * @category error
 */
export const StatusError: (props: Omit<StatusError, HttpError.ProvidedFields>) => StatusError = internal.statusError

/**
 * @since 1.0.0
 * @category error
 */
export interface TransportError extends HttpError.Proto {
  readonly _tag: "TransportError"
  readonly method: string
  readonly reason: "Timeout" | "Aborted" | "Decode" | "Encode"
  readonly error: unknown
}

/**
 * @since 1.0.0
 * @category error
 */
export const TransportError: (props: Omit<TransportError, HttpError.ProvidedFields>) => TransportError =
  internal.transportError
