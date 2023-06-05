/**
 * @since 1.0.0
 */
import type * as Data from "@effect/data/Data"
import type { Option } from "@effect/data/Option"
import type * as Effect from "@effect/io/Effect"
import type { Scope } from "@effect/io/Scope"
import * as internal from "@effect/platform/internal/fileSystem"

/**
 * @since 1.0.0
 * @category type id
 */
export const FileSystemErrorId: unique symbol = internal.FileSystemErrorId

/**
 * @since 1.0.0
 * @category type id
 */
export type FileSystemErrorId = typeof FileSystemErrorId

/**
 * @since 1.0.0
 * @category models
 */
export interface FileSystemError extends Data.Case {
  readonly [FileSystemErrorId]: typeof FileSystemErrorId
  readonly _tag: "FileSystemError"
}

/**
 * @since 1.0.0
 * @category constructor
 */
export const FileSystemError: Data.Case.Constructor<FileSystemError, "_tag" | FileSystemErrorId> =
  internal.FileSystemError

/**
 * @since 1.0.0
 * @category models
 */
export interface File {
  readonly stat: Effect.Effect<never, FileSystemError, FileInfo>
}

/**
 * @since 1.0.0
 * @category models
 */
export interface FileInfo {
  readonly isFile: boolean
  readonly isDirectory: boolean
  readonly isSymbolicLink: boolean
  readonly isBlockDevice: boolean
  readonly isCharacterDevice: boolean
  readonly isFIFO: boolean
  readonly isSocket: boolean
  readonly mtime: Option<Date>
  readonly atime: Option<Date>
  readonly birthtime: Option<Date>
  readonly dev: number
  readonly ino: Option<number>
  readonly mode: number
  readonly nlink: Option<number>
  readonly uid: Option<number>
  readonly gid: Option<number>
  readonly rdev: Option<number>
  readonly size: number
  readonly blksize: Option<number>
  readonly blocks: Option<number>
}

/**
 * @since 1.0.0
 * @category models
 */
export interface OpenFileOptions {
  readonly read?: boolean
  readonly write?: boolean
  readonly append?: boolean
  readonly truncate?: boolean
  readonly create?: boolean
  readonly createNew?: boolean
  readonly mode?: number
}

/**
 * @since 1.0.0
 * @category models
 */
export interface FileSystem {
  open(path: string, options?: OpenFileOptions): Effect.Effect<Scope, FileSystemError, File>
}
