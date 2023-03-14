/**
 * @since 1.0.0
 */
import type * as Brand from "@effect/data/Brand"
import * as Data from "@effect/data/Data"
import type * as Effect from "@effect/io/Effect"

/**
 * @since 1.0.0
 * @category models
 */
export type FileOpenFlags = "a" | "ax" | "a+" | "ax+" | "as" | "as+" | "r" | "r+" | "rs+" | "w" | "wx" | "w+" | "wx+"

/**
 * @since 1.0.0
 * @category models
 */
export type FileDescriptor = number & Brand.Brand<"FileDescriptor">

/**
 * @since 1.0.0
 * @category models
 */
export interface OpenFileOptions {
  readonly flags: FileOpenFlags
  readonly mode: number | string
}

/**
 * @since 1.0.0
 * @category models
 */
export interface OpenFileError extends Data.Case {
  readonly _tag: "OpenFileError"
  readonly error: unknown
}

/**
 * @since 1.0.0
 * @category constructors
 */
export const OpenFileError = Data.tagged<OpenFileError>("OpenFileError")

/**
 * @since 1.0.0
 * @category models
 */
export interface FileSystem {
  open(path: string, options?: OpenFileOptions): Effect.Effect<never, OpenFileError, FileDescriptor>
}
