---
title: Http/Multipart.ts
nav_order: 17
parent: "@effect/platform"
---

## Multipart overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [makeChannel](#makechannel)
  - [makeConfig](#makeconfig)
  - [toPersisted](#topersisted)
- [errors](#errors)
  - [MultipartError](#multiparterror)
  - [MultipartError (interface)](#multiparterror-interface)
- [fiber refs](#fiber-refs)
  - [fieldMimeTypes](#fieldmimetypes)
  - [maxFieldSize](#maxfieldsize)
  - [maxFileSize](#maxfilesize)
  - [maxParts](#maxparts)
  - [withFieldMimeTypes](#withfieldmimetypes)
  - [withMaxFieldSize](#withmaxfieldsize)
  - [withMaxFileSize](#withmaxfilesize)
  - [withMaxParts](#withmaxparts)
- [models](#models)
  - [Field (interface)](#field-interface)
  - [File (interface)](#file-interface)
  - [Part (type alias)](#part-type-alias)
  - [Persisted (interface)](#persisted-interface)
  - [PersistedFile (interface)](#persistedfile-interface)
- [refinements](#refinements)
  - [isField](#isfield)
- [schema](#schema)
  - [filesSchema](#filesschema)
  - [schemaJson](#schemajson)
  - [schemaPersisted](#schemapersisted)
- [type ids](#type-ids)
  - [ErrorTypeId](#errortypeid)
  - [ErrorTypeId (type alias)](#errortypeid-type-alias)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
- [utils](#utils)
  - [Part (namespace)](#part-namespace)
    - [Proto (interface)](#proto-interface)

---

# constructors

## makeChannel

**Signature**

```ts
export declare const makeChannel: <IE>(
  headers: Record<string, string>,
  bufferSize?: number
) => Channel.Channel<never, IE, Chunk.Chunk<Uint8Array>, unknown, MultipartError | IE, Chunk.Chunk<Part>, unknown>
```

Added in v1.0.0

## makeConfig

**Signature**

```ts
export declare const makeConfig: (headers: Record<string, string>) => Effect.Effect<never, never, Multipasta.BaseConfig>
```

Added in v1.0.0

## toPersisted

**Signature**

```ts
export declare const toPersisted: (
  stream: Stream.Stream<never, MultipartError, Part>,
  writeFile?: ((path: string, file: File) => Effect.Effect<FileSystem.FileSystem, MultipartError, void>) | undefined
) => Effect.Effect<FileSystem.FileSystem | Path.Path | Scope.Scope, MultipartError, Persisted>
```

Added in v1.0.0

# errors

## MultipartError

**Signature**

```ts
export declare const MultipartError: (reason: MultipartError["reason"], error: unknown) => MultipartError
```

Added in v1.0.0

## MultipartError (interface)

**Signature**

```ts
export interface MultipartError extends Data.Case {
  readonly [ErrorTypeId]: ErrorTypeId
  readonly _tag: "MultipartError"
  readonly reason: "FileTooLarge" | "FieldTooLarge" | "BodyTooLarge" | "TooManyParts" | "InternalError" | "Parse"
  readonly error: unknown
}
```

Added in v1.0.0

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

## maxParts

**Signature**

```ts
export declare const maxParts: FiberRef.FiberRef<Option.Option<number>>
```

Added in v1.0.0

## withFieldMimeTypes

**Signature**

```ts
export declare const withFieldMimeTypes: {
  (mimeTypes: ReadonlyArray<string>): <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>
  <R, E, A>(effect: Effect.Effect<R, E, A>, mimeTypes: ReadonlyArray<string>): Effect.Effect<R, E, A>
}
```

Added in v1.0.0

## withMaxFieldSize

**Signature**

```ts
export declare const withMaxFieldSize: {
  (size: FileSystem.SizeInput): <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>
  <R, E, A>(effect: Effect.Effect<R, E, A>, size: FileSystem.SizeInput): Effect.Effect<R, E, A>
}
```

Added in v1.0.0

## withMaxFileSize

**Signature**

```ts
export declare const withMaxFileSize: {
  (size: Option.Option<FileSystem.SizeInput>): <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>
  <R, E, A>(effect: Effect.Effect<R, E, A>, size: Option.Option<FileSystem.SizeInput>): Effect.Effect<R, E, A>
}
```

Added in v1.0.0

## withMaxParts

**Signature**

```ts
export declare const withMaxParts: {
  (count: Option.Option<number>): <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>
  <R, E, A>(effect: Effect.Effect<R, E, A>, count: Option.Option<number>): Effect.Effect<R, E, A>
}
```

Added in v1.0.0

# models

## Field (interface)

**Signature**

```ts
export interface Field extends Part.Proto {
  readonly _tag: "Field"
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
  readonly _tag: "File"
  readonly key: string
  readonly name: string
  readonly contentType: string
  readonly content: Stream.Stream<never, MultipartError, Uint8Array>
}
```

Added in v1.0.0

## Part (type alias)

**Signature**

```ts
export type Part = Field | File
```

Added in v1.0.0

## Persisted (interface)

**Signature**

```ts
export interface Persisted {
  readonly [key: string]: ReadonlyArray<PersistedFile> | string
}
```

Added in v1.0.0

## PersistedFile (interface)

**Signature**

```ts
export interface PersistedFile extends Part.Proto {
  readonly _tag: "PersistedFile"
  readonly key: string
  readonly name: string
  readonly contentType: string
  readonly path: string
}
```

Added in v1.0.0

# refinements

## isField

**Signature**

```ts
export declare const isField: (u: unknown) => u is Field
```

Added in v1.0.0

# schema

## filesSchema

**Signature**

```ts
export declare const filesSchema: Schema.Schema<readonly PersistedFile[], readonly PersistedFile[]>
```

Added in v1.0.0

## schemaJson

**Signature**

```ts
export declare const schemaJson: <I, A>(
  schema: Schema.Schema<I, A>
) => {
  (field: string): (persisted: Persisted) => Effect.Effect<never, MultipartError | ParseResult.ParseError, A>
  (persisted: Persisted, field: string): Effect.Effect<never, MultipartError | ParseResult.ParseError, A>
}
```

Added in v1.0.0

## schemaPersisted

**Signature**

```ts
export declare const schemaPersisted: <I extends Persisted, A>(
  schema: Schema.Schema<I, A>
) => (persisted: Persisted) => Effect.Effect<never, ParseResult.ParseError, A>
```

Added in v1.0.0

# type ids

## ErrorTypeId

**Signature**

```ts
export declare const ErrorTypeId: typeof ErrorTypeId
```

Added in v1.0.0

## ErrorTypeId (type alias)

**Signature**

```ts
export type ErrorTypeId = typeof ErrorTypeId
```

Added in v1.0.0

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

# utils

## Part (namespace)

Added in v1.0.0

### Proto (interface)

**Signature**

```ts
export interface Proto {
  readonly [TypeId]: TypeId
  readonly _tag: string
}
```

Added in v1.0.0
