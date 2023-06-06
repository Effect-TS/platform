/**
 * @since 1.0.0
 */
import type * as Data from "@effect/data/Data"
import * as internal from "@effect/platform/internal/error"

/**
 * @since 1.0.0
 * @category type id
 */
export const PlatformErrorTypeId: unique symbol = internal.PlatformErrorTypeId

/**
 * @since 1.0.0
 * @category type id
 */
export type PlatformErrorTypeId = typeof PlatformErrorTypeId

/**
 * @since 1.0.0
 * @category models
 */
export type PlatformError = BadArgument | SystemError

/**
 * @since 1.0.0
 */
export namespace PlatformError {
  /**
   * @since 1.0.0
   * @category models
   */
  export interface Base extends Data.Case {
    readonly [PlatformErrorTypeId]: typeof PlatformErrorTypeId
    readonly _tag: string
    readonly module: "FileSystem"
    readonly method: string
    readonly message: string
  }

  /**
   * @since 1.0.0
   */
  export type ProvidedFields = PlatformErrorTypeId | "_tag" | keyof Data.Case
}

/**
 * @since 1.0.0
 * @category models
 */
export interface BadArgument extends PlatformError.Base {
  readonly _tag: "BadArgument"
}

/**
 * @since 1.0.0
 * @category constructor
 */
export const BadArgument: (props: Omit<BadArgument, PlatformError.ProvidedFields>) => BadArgument = internal.badArgument

/**
 * @since 1.0.0
 * @category models
 */
export type SystemErrorReason =
  | "AlreadyExists"
  | "BadResource"
  | "Busy"
  | "InvalidData"
  | "NotFound"
  | "PermissionDenied"
  | "TimedOut"
  | "UnexpectedEof"
  | "WouldBlock"
  | "WriteZero"

/**
 * @since 1.0.0
 * @category models
 */
export interface SystemError extends PlatformError.Base {
  readonly _tag: "SystemError"
  readonly reason: SystemErrorReason
  readonly pathOrDescriptor: string | number
}

/**
 * @since 1.0.0
 * @category constructor
 */
export const SystemError: (props: Omit<SystemError, PlatformError.ProvidedFields>) => SystemError = internal.systemError
