---
title: Http/Body.ts
nav_order: 7
parent: "@effect/platform"
---

## Body overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [empty](#empty)
  - [file](#file)
  - [fileInfo](#fileinfo)
  - [fileWeb](#fileweb)
  - [formData](#formdata)
  - [json](#json)
  - [jsonSchema](#jsonschema)
  - [raw](#raw)
  - [stream](#stream)
  - [text](#text)
  - [uint8Array](#uint8array)
  - [unsafeJson](#unsafejson)
- [errors](#errors)
  - [BodyError](#bodyerror)
  - [BodyError (interface)](#bodyerror-interface)
  - [BodyErrorReason (type alias)](#bodyerrorreason-type-alias)
- [models](#models)
  - [Body (type alias)](#body-type-alias)
  - [Empty (interface)](#empty-interface)
  - [FormData (interface)](#formdata-interface)
  - [Raw (interface)](#raw-interface)
  - [Stream (interface)](#stream-interface)
  - [Uint8Array (interface)](#uint8array-interface)
- [type ids](#type-ids)
  - [ErrorTypeId](#errortypeid)
  - [ErrorTypeId (type alias)](#errortypeid-type-alias)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
- [utils](#utils)
  - [Body (namespace)](#body-namespace)
    - [FileLike (interface)](#filelike-interface)
    - [Proto (interface)](#proto-interface)

---

# constructors

## empty

**Signature**

```ts
export declare const empty: Empty
```

Added in v1.0.0

## file

**Signature**

```ts
export declare const file: (
  path: string,
  options?: FileSystem.StreamOptions & { readonly contentType?: string }
) => Effect.Effect<FileSystem.FileSystem, PlatformError.PlatformError, Stream>
```

Added in v1.0.0

## fileInfo

**Signature**

```ts
export declare const fileInfo: (
  path: string,
  info: FileSystem.File.Info,
  options?: FileSystem.StreamOptions & { readonly contentType?: string }
) => Effect.Effect<FileSystem.FileSystem, PlatformError.PlatformError, Stream>
```

Added in v1.0.0

## fileWeb

**Signature**

```ts
export declare const fileWeb: (file: Body.FileLike) => Stream
```

Added in v1.0.0

## formData

**Signature**

```ts
export declare const formData: (body: globalThis.FormData) => FormData
```

Added in v1.0.0

## json

**Signature**

```ts
export declare const json: (body: unknown) => Effect.Effect<never, BodyError, Uint8Array>
```

Added in v1.0.0

## jsonSchema

**Signature**

```ts
export declare const jsonSchema: <I, A>(
  schema: Schema.Schema<I, A>
) => (body: A) => Effect.Effect<never, BodyError, Uint8Array>
```

Added in v1.0.0

## raw

**Signature**

```ts
export declare const raw: (body: unknown) => Raw
```

Added in v1.0.0

## stream

**Signature**

```ts
export declare const stream: (
  body: Stream_.Stream<never, unknown, globalThis.Uint8Array>,
  contentType?: string,
  contentLength?: number,
  etag?: string
) => Stream
```

Added in v1.0.0

## text

**Signature**

```ts
export declare const text: (body: string, contentType?: string) => Uint8Array
```

Added in v1.0.0

## uint8Array

**Signature**

```ts
export declare const uint8Array: (body: globalThis.Uint8Array) => Uint8Array
```

Added in v1.0.0

## unsafeJson

**Signature**

```ts
export declare const unsafeJson: (body: unknown) => Uint8Array
```

Added in v1.0.0

# errors

## BodyError

**Signature**

```ts
export declare const BodyError: (reason: BodyErrorReason) => BodyError
```

Added in v1.0.0

## BodyError (interface)

**Signature**

```ts
export interface BodyError extends Data.Case {
  readonly [ErrorTypeId]: ErrorTypeId
  readonly _tag: 'BodyError'
  readonly reason: BodyErrorReason
}
```

Added in v1.0.0

## BodyErrorReason (type alias)

**Signature**

```ts
export type BodyErrorReason =
  | {
      readonly _tag: 'JsonError'
      readonly error: unknown
    }
  | {
      readonly _tag: 'SchemaError'
      readonly error: ParseResult.ParseError
    }
```

Added in v1.0.0

# models

## Body (type alias)

**Signature**

```ts
export type Body = Empty | Raw | Uint8Array | FormData | Stream
```

Added in v1.0.0

## Empty (interface)

**Signature**

```ts
export interface Empty extends Body.Proto {
  readonly _tag: 'Empty'
}
```

Added in v1.0.0

## FormData (interface)

**Signature**

```ts
export interface FormData extends Body.Proto {
  readonly _tag: 'FormData'
  readonly formData: globalThis.FormData
}
```

Added in v1.0.0

## Raw (interface)

**Signature**

```ts
export interface Raw extends Body.Proto {
  readonly _tag: 'Raw'
  readonly body: unknown
}
```

Added in v1.0.0

## Stream (interface)

**Signature**

```ts
export interface Stream extends Body.Proto {
  readonly _tag: 'Stream'
  readonly stream: Stream_.Stream<never, unknown, globalThis.Uint8Array>
  readonly contentType: string
  readonly contentLength?: number
}
```

Added in v1.0.0

## Uint8Array (interface)

**Signature**

```ts
export interface Uint8Array extends Body.Proto {
  readonly _tag: 'Uint8Array'
  readonly body: globalThis.Uint8Array
  readonly contentType: string
  readonly contentLength: number
}
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

## Body (namespace)

Added in v1.0.0

### FileLike (interface)

**Signature**

```ts
export interface FileLike {
  readonly name: string
  readonly lastModified: number
  readonly size: number
  readonly stream: () => unknown
  readonly type: string
}
```

Added in v1.0.0

### Proto (interface)

**Signature**

```ts
export interface Proto {
  readonly [TypeId]: TypeId
  readonly _tag: string
  readonly contentType?: string
  readonly contentLength?: number
}
```

Added in v1.0.0
