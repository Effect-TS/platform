---
title: FileSystem.ts
nav_order: 2
parent: "@effect/platform"
---

## FileSystem overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructor](#constructor)
  - [FileSystemError](#filesystemerror)
- [models](#models)
  - [File (interface)](#file-interface)
  - [FileInfo (interface)](#fileinfo-interface)
  - [FileSystem (interface)](#filesystem-interface)
  - [FileSystemError (interface)](#filesystemerror-interface)
  - [OpenFileOptions (interface)](#openfileoptions-interface)
- [type id](#type-id)
  - [FileSystemErrorId](#filesystemerrorid)
  - [FileSystemErrorId (type alias)](#filesystemerrorid-type-alias)

---

# constructor

## FileSystemError

**Signature**

```ts
export declare const FileSystemError: Data.Case.Constructor<FileSystemError, typeof FileSystemErrorId | '_tag'>
```

Added in v1.0.0

# models

## File (interface)

**Signature**

```ts
export interface File {
  readonly stat: Effect.Effect<never, FileSystemError, FileInfo>
}
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

## FileSystem (interface)

**Signature**

```ts
export interface FileSystem {
  open(path: string, options?: OpenFileOptions): Effect.Effect<Scope, FileSystemError, File>
}
```

Added in v1.0.0

## FileSystemError (interface)

**Signature**

```ts
export interface FileSystemError extends Data.Case {
  readonly [FileSystemErrorId]: typeof FileSystemErrorId
  readonly _tag: 'FileSystemError'
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

# type id

## FileSystemErrorId

**Signature**

```ts
export declare const FileSystemErrorId: typeof FileSystemErrorId
```

Added in v1.0.0

## FileSystemErrorId (type alias)

**Signature**

```ts
export type FileSystemErrorId = typeof FileSystemErrorId
```

Added in v1.0.0
