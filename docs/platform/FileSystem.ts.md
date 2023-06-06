---
title: FileSystem.ts
nav_order: 4
parent: "@effect/platform"
---

## FileSystem overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructor](#constructor)
  - [FileDescriptor](#filedescriptor)
  - [make](#make)
- [model](#model)
  - [AccessFileOptions (interface)](#accessfileoptions-interface)
  - [DirectoryEntry (interface)](#directoryentry-interface)
  - [File (interface)](#file-interface)
  - [FileDescriptor (type alias)](#filedescriptor-type-alias)
  - [FileInfo (interface)](#fileinfo-interface)
  - [FileReadOptions (interface)](#filereadoptions-interface)
  - [FileSystem (interface)](#filesystem-interface)
  - [MakeDirectoryOptions (interface)](#makedirectoryoptions-interface)
  - [MakeTempDirOptions (interface)](#maketempdiroptions-interface)
  - [MakeTempFileOptions (interface)](#maketempfileoptions-interface)
  - [OpenFileOptions (interface)](#openfileoptions-interface)
  - [ReadDirectoryOptions (interface)](#readdirectoryoptions-interface)
  - [RemoveOptions (interface)](#removeoptions-interface)
  - [SinkOptions (interface)](#sinkoptions-interface)
  - [StreamOptions (interface)](#streamoptions-interface)
  - [WriteFileOptions (interface)](#writefileoptions-interface)
- [tag](#tag)
  - [tag](#tag-1)

---

# constructor

## FileDescriptor

**Signature**

```ts
export declare const FileDescriptor: Brand.Brand.Constructor<FileDescriptor>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: (impl: Omit<FileSystem, 'stream' | 'sink'>) => FileSystem
```

Added in v1.0.0

# model

## AccessFileOptions (interface)

**Signature**

```ts
export interface AccessFileOptions {
  readonly ok?: boolean
  readonly readable?: boolean
  readonly writable?: boolean
}
```

Added in v1.0.0

## DirectoryEntry (interface)

**Signature**

```ts
export interface DirectoryEntry {
  readonly name: string
  readonly isDirectory: boolean
  readonly isFile: boolean
  readonly isSymbolicLink: boolean
}
```

Added in v1.0.0

## File (interface)

**Signature**

```ts
export interface File {
  readonly fd: FileDescriptor
  readonly stat: Effect.Effect<never, PlatformError, FileInfo>
  readonly read: (buffer: Uint8Array, options?: FileReadOptions) => Effect.Effect<never, PlatformError, number>
  readonly truncate: (length?: number) => Effect.Effect<never, PlatformError, void>
  readonly write: (buffer: Uint8Array) => Effect.Effect<never, PlatformError, number>
}
```

Added in v1.0.0

## FileDescriptor (type alias)

**Signature**

```ts
export type FileDescriptor = Brand.Branded<number, 'FileDescriptor'>
```

Added in v1.0.0

## FileInfo (interface)

**Signature**

```ts
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
```

Added in v1.0.0

## FileReadOptions (interface)

**Signature**

```ts
export interface FileReadOptions {
  readonly offset?: number
  readonly length?: number
}
```

Added in v1.0.0

## FileSystem (interface)

**Signature**

```ts
export interface FileSystem {
  readonly access: (path: string, options?: AccessFileOptions) => Effect.Effect<never, PlatformError, void>
  readonly copyFile: (fromPath: string, toPath: string) => Effect.Effect<never, PlatformError, void>
  readonly chmod: (path: string, mode: number) => Effect.Effect<never, PlatformError, void>
  readonly chown: (path: string, uid: number, gid: number) => Effect.Effect<never, PlatformError, void>
  readonly link: (fromPath: string, toPath: string) => Effect.Effect<never, PlatformError, void>
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
  readonly symlink: (fromPath: string, toPath: string) => Effect.Effect<never, PlatformError, void>
  readonly truncate: (path: string, length?: number) => Effect.Effect<never, PlatformError, void>
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
```

Added in v1.0.0

## MakeDirectoryOptions (interface)

**Signature**

```ts
export interface MakeDirectoryOptions {
  readonly recursive?: boolean
  readonly mode?: number
}
```

Added in v1.0.0

## MakeTempDirOptions (interface)

**Signature**

```ts
export interface MakeTempDirOptions {
  readonly directory?: string
  readonly prefix?: string
}
```

Added in v1.0.0

## MakeTempFileOptions (interface)

**Signature**

```ts
export interface MakeTempFileOptions {
  readonly directory?: string
  readonly prefix?: string
}
```

Added in v1.0.0

## OpenFileOptions (interface)

**Signature**

```ts
export interface OpenFileOptions {
  readonly read?: boolean
  readonly write?: boolean
  readonly append?: boolean
  readonly truncate?: boolean
  readonly create?: boolean
  readonly createNew?: boolean
  readonly mode?: number
}
```

Added in v1.0.0

## ReadDirectoryOptions (interface)

**Signature**

```ts
export interface ReadDirectoryOptions {
  readonly recursive?: boolean
}
```

Added in v1.0.0

## RemoveOptions (interface)

**Signature**

```ts
export interface RemoveOptions {
  readonly recursive?: boolean
}
```

Added in v1.0.0

## SinkOptions (interface)

**Signature**

```ts
export interface SinkOptions extends OpenFileOptions {}
```

Added in v1.0.0

## StreamOptions (interface)

**Signature**

```ts
export interface StreamOptions {
  bufferSize?: number
  bytesToRead?: number
  chunkSize?: number
  offset?: number
}
```

Added in v1.0.0

## WriteFileOptions (interface)

**Signature**

```ts
export interface WriteFileOptions {
  readonly append?: boolean
  readonly create?: boolean
  readonly createNew?: boolean
  readonly mode?: number
}
```

Added in v1.0.0

# tag

## tag

**Signature**

```ts
export declare const tag: Tag<FileSystem, FileSystem>
```

Added in v1.0.0
