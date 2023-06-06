---
title: FileSystem/File.ts
nav_order: 5
parent: "@effect/platform"
---

## File overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructor](#constructor)
  - [FileDescriptor](#filedescriptor)
  - [make](#make)
- [model](#model)
  - [File (interface)](#file-interface)
  - [FileReadOptions (interface)](#filereadoptions-interface)
- [type id](#type-id)
  - [FileTypeId](#filetypeid)
  - [FileTypeId (type alias)](#filetypeid-type-alias)

---

# constructor

## FileDescriptor

**Signature**

```ts
export declare const FileDescriptor: Brand.Brand.Constructor<File.Descriptor>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: (impl: Omit<File, FileTypeId>) => File
```

Added in v1.0.0

# model

## File (interface)

**Signature**

```ts
export interface File {
  readonly [FileTypeId]: FileTypeId
  readonly fd: File.Descriptor
  readonly stat: Effect.Effect<never, PlatformError, File.Info>
  readonly read: (buffer: Uint8Array, options?: FileReadOptions) => Effect.Effect<never, PlatformError, Size>
  readonly readAlloc: (size: Size, options?: FileReadOptions) => Effect.Effect<never, PlatformError, Option<Uint8Array>>
  readonly truncate: (length?: Size) => Effect.Effect<never, PlatformError, void>
  readonly write: (buffer: Uint8Array) => Effect.Effect<never, PlatformError, Size>
  readonly writeAll: (buffer: Uint8Array) => Effect.Effect<never, PlatformError, void>
}
```

Added in v1.0.0

## FileReadOptions (interface)

**Signature**

```ts
export interface FileReadOptions {
  readonly offset?: Size
  readonly length?: Size
}
```

Added in v1.0.0

# type id

## FileTypeId

**Signature**

```ts
export declare const FileTypeId: typeof FileTypeId
```

Added in v1.0.0

## FileTypeId (type alias)

**Signature**

```ts
export type FileTypeId = typeof FileTypeId
```

Added in v1.0.0
