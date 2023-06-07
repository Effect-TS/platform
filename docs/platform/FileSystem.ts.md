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
  - [Size](#size)
  - [make](#make)
- [model](#model)
  - [AccessFileOptions (interface)](#accessfileoptions-interface)
  - [FileSystem (interface)](#filesystem-interface)
  - [MakeDirectoryOptions (interface)](#makedirectoryoptions-interface)
  - [MakeTempDirectoryOptions (interface)](#maketempdirectoryoptions-interface)
  - [MakeTempFileOptions (interface)](#maketempfileoptions-interface)
  - [OpenFileOptions (interface)](#openfileoptions-interface)
  - [OpenFlag (type alias)](#openflag-type-alias)
  - [ReadDirectoryOptions (interface)](#readdirectoryoptions-interface)
  - [RemoveOptions (interface)](#removeoptions-interface)
  - [SinkOptions (interface)](#sinkoptions-interface)
  - [Size (type alias)](#size-type-alias)
  - [StreamOptions (interface)](#streamoptions-interface)
  - [WriteFileOptions (interface)](#writefileoptions-interface)
- [tag](#tag)
  - [FileSystem](#filesystem)

---

# constructor

## Size

**Signature**

```ts
export declare const Size: (bytes: number | bigint) => Size
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

## FileSystem (interface)

**Signature**

```ts
export interface FileSystem {
  readonly access: (path: string, options?: AccessFileOptions) => Effect.Effect<never, PlatformError, void>
  readonly copyFile: (fromPath: string, toPath: string) => Effect.Effect<never, PlatformError, void>
  readonly chmod: (path: string, mode: number) => Effect.Effect<never, PlatformError, void>
  readonly chown: (path: string, uid: number, gid: number) => Effect.Effect<never, PlatformError, void>
  readonly link: (fromPath: string, toPath: string) => Effect.Effect<never, PlatformError, void>
  readonly makeDirectory: (path: string, options?: MakeDirectoryOptions) => Effect.Effect<never, PlatformError, void>
  readonly makeTempDirectory: (options?: MakeTempDirectoryOptions) => Effect.Effect<never, PlatformError, string>
  readonly makeTempDirectoryScoped: (options?: MakeTempDirectoryOptions) => Effect.Effect<Scope, PlatformError, string>
  readonly makeTempFile: (options?: MakeTempFileOptions) => Effect.Effect<Scope, PlatformError, File>
  readonly open: (path: string, options?: OpenFileOptions) => Effect.Effect<Scope, PlatformError, File>
  readonly readDirectory: (
    path: string,
    options?: ReadDirectoryOptions
  ) => Effect.Effect<never, PlatformError, ReadonlyArray<string>>
  readonly readFile: (path: string) => Effect.Effect<never, PlatformError, Uint8Array>
  readonly readLink: (path: string) => Effect.Effect<never, PlatformError, string>
  readonly realPath: (path: string) => Effect.Effect<never, PlatformError, string>
  readonly remove: (path: string, options?: RemoveOptions) => Effect.Effect<never, PlatformError, void>
  readonly rename: (oldPath: string, newPath: string) => Effect.Effect<never, PlatformError, void>
  readonly sink: (path: string, options?: SinkOptions) => Sink<never, PlatformError, Uint8Array, never, void>
  readonly stat: (path: string) => Effect.Effect<never, PlatformError, File.Info>
  readonly stream: (path: string, options?: StreamOptions) => Stream<never, PlatformError, Uint8Array>
  readonly symlink: (fromPath: string, toPath: string) => Effect.Effect<never, PlatformError, void>
  readonly truncate: (path: string, length?: Size) => Effect.Effect<never, PlatformError, void>
  readonly utimes: (
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

## MakeTempDirectoryOptions (interface)

**Signature**

```ts
export interface MakeTempDirectoryOptions {
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
  readonly flag?: OpenFlag
  readonly mode?: number
}
```

Added in v1.0.0

## OpenFlag (type alias)

**Signature**

```ts
export type OpenFlag = 'r' | 'r+' | 'w' | 'wx' | 'w+' | 'wx+' | 'a' | 'ax' | 'a+' | 'ax+'
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

## Size (type alias)

Represents a size in bytes.

**Signature**

```ts
export type Size = Brand.Branded<bigint, 'Size'>
```

Added in v1.0.0

## StreamOptions (interface)

**Signature**

```ts
export interface StreamOptions {
  readonly bufferSize?: number
  readonly bytesToRead?: Size
  readonly chunkSize?: Size
  readonly offset?: Size
}
```

Added in v1.0.0

## WriteFileOptions (interface)

**Signature**

```ts
export interface WriteFileOptions {
  readonly flag?: OpenFlag
  readonly mode?: number
}
```

Added in v1.0.0

# tag

## FileSystem

**Signature**

```ts
export declare const FileSystem: Tag<FileSystem, FileSystem>
```

Added in v1.0.0
