---
title: Http/FormData.ts
nav_order: 13
parent: "@effect/platform"
---

## FormData overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [fiber refs](#fiber-refs)
  - [fieldMimeTypes](#fieldmimetypes)
  - [maxFieldSize](#maxfieldsize)
  - [maxFileSize](#maxfilesize)
  - [withFieldMimeTypes](#withfieldmimetypes)
  - [withMaxFieldSize](#withmaxfieldsize)
  - [withMaxFileSize](#withmaxfilesize)
- [models](#models)
  - [Field (interface)](#field-interface)
  - [File (interface)](#file-interface)
  - [Part (type alias)](#part-type-alias)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# fiber refs

## fieldMimeTypes

**Signature**

```ts
export declare const fieldMimeTypes: FiberRef.FiberRef<Chunk.Chunk<string>>
```

Added in v1.0.0

## maxFieldSize

**Signature**

```ts
export declare const maxFieldSize: FiberRef.FiberRef<FileSystem.Size>
```

Added in v1.0.0

## maxFileSize

**Signature**

```ts
export declare const maxFileSize: FiberRef.FiberRef<Option.Option<FileSystem.Size>>
```

Added in v1.0.0

## withFieldMimeTypes

**Signature**

```ts
export declare const withFieldMimeTypes: ((
  mimeTypes: ReadonlyArray<string>
) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>) &
  (<R, E, A>(effect: Effect.Effect<R, E, A>, mimeTypes: ReadonlyArray<string>) => Effect.Effect<R, E, A>)
```

Added in v1.0.0

## withMaxFieldSize

**Signature**

```ts
export declare const withMaxFieldSize: ((
  size: FileSystem.SizeInput
) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>) &
  (<R, E, A>(effect: Effect.Effect<R, E, A>, size: FileSystem.SizeInput) => Effect.Effect<R, E, A>)
```

Added in v1.0.0

## withMaxFileSize

**Signature**

```ts
export declare const withMaxFileSize: ((
  size: Option.Option<FileSystem.SizeInput>
) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>) &
  (<R, E, A>(effect: Effect.Effect<R, E, A>, size: Option.Option<FileSystem.SizeInput>) => Effect.Effect<R, E, A>)
```

Added in v1.0.0

# models

## Field (interface)

**Signature**

```ts
export interface Field extends Part.Proto {
  readonly _tag: 'Field'
  readonly key: string
  readonly contentType: string
  readonly value: string
}
```

Added in v1.0.0

## File (interface)

**Signature**

```ts
export interface File extends Part.Proto {
  readonly _tag: 'File'
  readonly key: string
  readonly name: string
  readonly contentType: string
  readonly content: Stream.Stream<never, unknown, Uint8Array>
}
```

Added in v1.0.0

## Part (type alias)

**Signature**

```ts
export type Part = Field | File
```

Added in v1.0.0

# type ids

## TypeId

**Signature**

```ts
export declare const TypeId: typeof TypeId
```

Added in v1.0.0

## TypeId (type alias)

**Signature**

```ts
export type TypeId = typeof TypeId
```

Added in v1.0.0
