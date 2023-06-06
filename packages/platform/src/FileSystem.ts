/**
 * @since 1.0.0
 */
import * as Brand from "@effect/data/Brand"
import type { Tag } from "@effect/data/Context"
import type { Option } from "@effect/data/Option"
import type * as Effect from "@effect/io/Effect"
import type { Scope } from "@effect/io/Scope"
import type { PlatformError } from "@effect/platform/Error"
import * as internal from "@effect/platform/internal/fileSystem"
import type { Sink } from "@effect/stream/Sink"
import type { Stream } from "@effect/stream/Stream"

/**
 * @since 1.0.0
 * @category model
 */
export type FileDescriptor = Brand.Branded<number, "FileDescriptor">

/**
 * @since 1.0.0
 * @category constructor
 */
export const FileDescriptor = Brand.nominal<FileDescriptor>()

/**
 * @since 1.0.0
 * @category model
 */
export interface File {
  readonly fd: FileDescriptor
  readonly stat: Effect.Effect<never, PlatformError, FileInfo>
  readonly read: (buffer: Uint8Array, options?: FileReadOptions) => Effect.Effect<never, PlatformError, number>
  readonly truncate: (length?: number) => Effect.Effect<never, PlatformError, void>
  readonly write: (buffer: Uint8Array) => Effect.Effect<never, PlatformError, number>
}

/**
 * @since 1.0.0
 * @category model
 */
export interface FileReadOptions {
  readonly offset?: number
  readonly length?: number
}

/**
 * @since 1.0.0
 * @category model
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
 * @category model
 */
export interface AccessFileOptions {
  readonly ok?: boolean
  readonly readable?: boolean
  readonly writable?: boolean
}

/**
 * @since 1.0.0
 * @category model
 */
export interface DirectoryEntry {
  readonly name: string
  readonly isDirectory: boolean
  readonly isFile: boolean
  readonly isSymbolicLink: boolean
}

/**
 * @since 1.0.0
 * @category model
 */
export interface MakeDirectoryOptions {
  readonly recursive?: boolean
  readonly mode?: number
}

/**
 * @since 1.0.0
 * @category model
 */
export interface MakeTempDirOptions {
  readonly directory?: string
  readonly prefix?: string
}

/**
 * @since 1.0.0
 * @category model
 */
export interface MakeTempFileOptions {
  readonly directory?: string
  readonly prefix?: string
}

/**
 * @since 1.0.0
 * @category model
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
 * @category model
 */
export interface ReadDirectoryOptions {
  readonly recursive?: boolean
}

/**
 * @since 1.0.0
 * @category model
 */
export interface RemoveOptions {
  readonly recursive?: boolean
}

/**
 * @since 1.0.0
 * @category model
 */
export interface SinkOptions extends OpenFileOptions {}

/**
 * @since 1.0.0
 * @category model
 */
export interface StreamOptions {
  bufferSize?: number
  bytesToRead?: number
  chunkSize?: number
  offset?: number
}

/**
 * @since 1.0.0
 * @category model
 */
export interface WriteFileOptions {
  readonly append?: boolean
  readonly create?: boolean
  readonly createNew?: boolean
  readonly mode?: number
}

/**
 * @since 1.0.0
 * @category model
 */
export interface FileSystem {
  readonly access: (path: string, options?: AccessFileOptions) => Effect.Effect<never, PlatformError, void>
  readonly copyFile: (
    fromPath: string,
    toPath: string
  ) => Effect.Effect<never, PlatformError, void>
  readonly chmod: (path: string, mode: number) => Effect.Effect<never, PlatformError, void>
  readonly chown: (path: string, uid: number, gid: number) => Effect.Effect<never, PlatformError, void>
  readonly link: (
    fromPath: string,
    toPath: string
  ) => Effect.Effect<never, PlatformError, void>
  readonly makeTempDir: (options?: MakeTempDirOptions) => Effect.Effect<never, PlatformError, string>
  readonly makeTempDirScoped: (options?: MakeTempDirOptions) => Effect.Effect<Scope, PlatformError, string>
  readonly makeTempFile: (options?: MakeTempFileOptions) => Effect.Effect<never, PlatformError, string>
  readonly makeDirectory: (path: string, options?: MakeDirectoryOptions) => Effect.Effect<never, PlatformError, void>
  readonly open: (path: string, options?: OpenFileOptions) => Effect.Effect<Scope, PlatformError, File>
  readonly readDirectory: (
    path: string,
    options?: ReadDirectoryOptions
  ) => Effect.Effect<never, PlatformError, Uint8Array>
  readonly readFile: (path: string) => Effect.Effect<never, PlatformError, Uint8Array>
  readonly readLink: (path: string) => Effect.Effect<never, PlatformError, string>
  readonly realPath: (path: string) => Effect.Effect<never, PlatformError, string>
  readonly remove: (path: string, options?: RemoveOptions) => Effect.Effect<never, PlatformError, void>
  readonly rename: (oldPath: string, newPath: string) => Effect.Effect<never, PlatformError, void>
  readonly sink: (path: string, options?: SinkOptions) => Sink<never, PlatformError, Uint8Array, never, void>
  readonly stat: (path: string) => Effect.Effect<never, PlatformError, FileInfo>
  readonly stream: (path: string, options?: StreamOptions) => Stream<never, PlatformError, Uint8Array>
  readonly symlink: (
    fromPath: string,
    toPath: string
  ) => Effect.Effect<never, PlatformError, void>
  readonly truncate: (
    path: string,
    length?: number
  ) => Effect.Effect<never, PlatformError, void>
  readonly utime: (
    path: string,
    atime: Date | number,
    mtime: Date | number
  ) => Effect.Effect<never, PlatformError, void>
  readonly writeFile: (
    path: string,
    data: Uint8Array,
    options?: WriteFileOptions
  ) => Effect.Effect<never, PlatformError, void>
}

/**
 * @since 1.0.0
 * @category tag
 */
export const tag: Tag<FileSystem, FileSystem> = internal.tag

/**
 * @since 1.0.0
 * @category constructor
 */
export const make: (impl: Omit<FileSystem, "stream" | "sink">) => FileSystem = internal.make
