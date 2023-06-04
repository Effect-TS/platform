---
title: FileSystem.ts
nav_order: 2
parent: Modules
---

## FileSystem overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [OpenFileError](#openfileerror)
- [models](#models)
  - [FileDescriptor (type alias)](#filedescriptor-type-alias)
  - [FileOpenFlags (type alias)](#fileopenflags-type-alias)
  - [FileSystem (interface)](#filesystem-interface)
  - [OpenFileError (interface)](#openfileerror-interface)
  - [OpenFileOptions (interface)](#openfileoptions-interface)

---

# constructors

## OpenFileError

**Signature**

```ts
export declare const OpenFileError: Data.Case.Constructor<OpenFileError, '_tag'>
```

Added in v1.0.0

# models

## FileDescriptor (type alias)

**Signature**

```ts
export type FileDescriptor = number & Brand.Brand<'FileDescriptor'>
```

Added in v1.0.0

## FileOpenFlags (type alias)

**Signature**

```ts
export type FileOpenFlags = 'a' | 'ax' | 'a+' | 'ax+' | 'as' | 'as+' | 'r' | 'r+' | 'rs+' | 'w' | 'wx' | 'w+' | 'wx+'
```

Added in v1.0.0

## FileSystem (interface)

**Signature**

```ts
export interface FileSystem {
  open(path: string, options?: OpenFileOptions): Effect.Effect<never, OpenFileError, FileDescriptor>
}
```

Added in v1.0.0

## OpenFileError (interface)

**Signature**

```ts
export interface OpenFileError extends Data.Case {
  readonly _tag: 'OpenFileError'
  readonly error: unknown
}
```

Added in v1.0.0

## OpenFileOptions (interface)

**Signature**

```ts
export interface OpenFileOptions {
  readonly flags: FileOpenFlags
  readonly mode: number | string
}
```

Added in v1.0.0
