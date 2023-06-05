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
export interface PlatformError extends Data.Case {
  readonly [PlatformErrorTypeId]: typeof PlatformErrorTypeId
  readonly _tag: string
  readonly message: string
}

/**
 * @since 1.0.0
 * @category models
 */
export interface AlreadyExists extends PlatformError {
  readonly _tag: "AlreadyExists"
  readonly module: "FileSystem"
  readonly method: string
  readonly path: string
}

/**
 * @since 1.0.0
 * @category models
 */
export interface BadArgument extends PlatformError {
  readonly _tag: "BadArgument"
  readonly module: "FileSystem"
  readonly method: string
}

/**
 * @since 1.0.0
 * @category models
 */
export interface BadResource extends PlatformError {
  readonly _tag: "BadResource"
  readonly module: "FileSystem"
  readonly method: string
  readonly pathOrDescriptor: string | number
}

/**
 * @since 1.0.0
 * @category models
 */
export interface Busy extends PlatformError {
  readonly _tag: "Busy"
  readonly module: "FileSystem"
  readonly method: string
  readonly pathOrDescriptor: string | number
}

/**
 * @since 1.0.0
 * @category models
 */
export interface InvalidData extends PlatformError {
  readonly _tag: "InvalidData"
  readonly module: "FileSystem"
  readonly method: string
  readonly pathOrDescriptor: string | number
}

/**
 * @since 1.0.0
 * @category models
 */
export interface NotFound extends PlatformError {
  readonly _tag: "NotFound"
  readonly module: "FileSystem"
  readonly method: string
  readonly pathOrDescriptor: string | number
}

/**
 * @since 1.0.0
 * @category models
 */
export interface NotSupported extends PlatformError {
  readonly _tag: "NotSupported"
  readonly module: "FileSystem"
  readonly method: string
  readonly pathOrDescriptor: string | number
}

/**
 * @since 1.0.0
 * @category models
 */
export interface PermissionDenied extends PlatformError {
  readonly _tag: "PermissionDenied"
  readonly module: "FileSystem"
  readonly method: string
  readonly pathOrDescriptor: string | number
}

/**
 * @since 1.0.0
 * @category models
 */
export interface TimedOut extends PlatformError {
  readonly _tag: "TimedOut"
  readonly module: "FileSystem"
  readonly method: string
  readonly pathOrDescriptor: string | number
}

/**
 * @since 1.0.0
 * @category models
 */
export interface UnexpectedEof extends PlatformError {
  readonly _tag: "UnexpectedEof"
  readonly module: "FileSystem"
  readonly method: string
  readonly pathOrDescriptor: string | number
}

/**
 * @since 1.0.0
 * @category models
 */
export interface WriteZero extends PlatformError {
  readonly _tag: "WriteZero"
  readonly module: "FileSystem"
  readonly method: string
  readonly pathOrDescriptor: string | number
}
