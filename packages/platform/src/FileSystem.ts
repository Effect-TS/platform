/**
 * @since 1.0.0
 */
import type * as Brand from "@effect/data/Brand"
import type { Option } from "@effect/data/Option"
import type * as Effect from "@effect/io/Effect"
import type { Scope } from "@effect/io/Scope"

/**
 * @since 1.0.0
 * @category models
 */
export type FileDescriptor = Brand.Branded<number, "FileDescriptor">

/**
 * @since 1.0.0
 * @category models
 */
export interface File {
  readonly fd: FileDescriptor
  readonly stat: Effect.Effect<never, FileSystemError, FileInfo>
  readonly read: (buffer: Uint8Array, options?: FileReadOptions) => Effect.Effect<never, FileSystemError, number>
  readonly truncate: (length?: number) => Effect.Effect<never, FileSystemError, void>
  readonly write: (buffer: Uint8Array) => Effect.Effect<never, FileSystemError, number>
}

/**
 * @since 1.0.0
 * @category models
 */
export interface FileReadOptions {
  readonly offset?: number
  readonly length?: number
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
export interface AccessFileOptions {
  readonly ok?: boolean
  readonly readable?: boolean
  readonly writable?: boolean
}

/**
 * @since 1.0.0
 * @category models
 */
export interface DirectoryEntry {
  readonly name: string
  readonly isDirectory: boolean
  readonly isFile: boolean
  readonly isSymbolicLink: boolean
}

/**
 * @since 1.0.0
 * @category models
 */
export interface MakeDirectoryOptions {
  readonly recursive?: boolean
  readonly mode?: number
}

/**
 * @since 1.0.0
 * @category models
 */
export interface MakeTempDirOptions {
  readonly directory?: string
  readonly prefix?: string
}

/**
 * @since 1.0.0
 * @category models
 */
export interface MakeTempFileOptions {
  readonly directory?: string
  readonly prefix?: string
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
export interface ReadDirectoryOptions {
  readonly recursive?: boolean
}

/**
 * @since 1.0.0
 * @category models
 */
export interface RemoveOptions {
  readonly recursive?: boolean
}

/**
 * @since 1.0.0
 * @category models
 */
export interface WriteFileOptions {
  readonly append?: boolean
  readonly create?: boolean
  readonly createNew?: boolean
  readonly mode?: number
}

/**
 * @since 1.0.0
 * @category models
 */
export interface FileSystem {
  readonly access: (path: string, options?: AccessFileOptions) => Effect.Effect<never, FileSystemError, void>
  readonly copyFile: (
    fromPath: string,
    toPath: string
  ) => Effect.Effect<never, FileSystemError, void>
  readonly chmod: (path: string, mode: number) => Effect.Effect<never, FileSystemError, void>
  readonly chown: (path: string, uid: number, gid: number) => Effect.Effect<never, FileSystemError, void>
  readonly link: (
    fromPath: string,
    toPath: string
  ) => Effect.Effect<never, FileSystemError, void>
  readonly makeTempDir: (options?: MakeTempDirOptions) => Effect.Effect<never, FileSystemError, string>
  readonly makeTempFile: (options?: MakeTempFileOptions) => Effect.Effect<never, FileSystemError, string>
  readonly makeDirectory: (path: string, options?: MakeDirectoryOptions) => Effect.Effect<never, FileSystemError, void>
  readonly open: (path: string, options?: OpenFileOptions) => Effect.Effect<Scope, FileSystemError, File>
  readonly readDirectory: (
    path: string,
    options?: ReadDirectoryOptions
  ) => Effect.Effect<never, FileSystemError, Uint8Array>
  readonly readFile: (path: string) => Effect.Effect<never, FileSystemError, Uint8Array>
  readonly readLink: (path: string) => Effect.Effect<never, FileSystemError, string>
  readonly realPath: (path: string) => Effect.Effect<never, FileSystemError, string>
  readonly remove: (path: string, options?: RemoveOptions) => Effect.Effect<never, FileSystemError, void>
  readonly rename: (oldPath: string, newPath: string) => Effect.Effect<never, FileSystemError, void>
  readonly stat: (path: string) => Effect.Effect<never, FileSystemError, FileInfo>
  readonly symlink: (
    fromPath: string,
    toPath: string
  ) => Effect.Effect<never, FileSystemError, void>
  readonly truncate: (
    path: string,
    length?: number
  ) => Effect.Effect<never, FileSystemError, void>
  readonly utime: (
    path: string,
    atime: Date | number,
    mtime: Date | number
  ) => Effect.Effect<never, FileSystemError, void>
  readonly writeFile: (
    path: string,
    data: Uint8Array,
    options?: WriteFileOptions
  ) => Effect.Effect<never, FileSystemError, void>
}
