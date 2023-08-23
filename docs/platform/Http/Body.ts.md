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
  - [effect](#effect)
  - [empty](#empty)
  - [file](#file)
  - [fileInfo](#fileinfo)
  - [formData](#formdata)
  - [json](#json)
  - [jsonSchema](#jsonschema)
  - [raw](#raw)
  - [stream](#stream)
  - [text](#text)
  - [uint8Array](#uint8array)
  - [unsafeJson](#unsafejson)
- [models](#models)
  - [Body (type alias)](#body-type-alias)
  - [EffectBody (interface)](#effectbody-interface)
  - [Empty (interface)](#empty-interface)
  - [FormData (interface)](#formdata-interface)
  - [NonEffect (type alias)](#noneffect-type-alias)
  - [Raw (interface)](#raw-interface)
  - [Stream (interface)](#stream-interface)
  - [Uint8Array (interface)](#uint8array-interface)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## effect

**Signature**

```ts
export declare const effect: (body: Effect.Effect<never, unknown, NonEffect>) => EffectBody
```

Added in v1.0.0

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

## formData

**Signature**

```ts
export declare const formData: (body: globalThis.FormData) => FormData
```

Added in v1.0.0

## json

**Signature**

```ts
export declare const json: (body: unknown) => EffectBody
```

Added in v1.0.0

## jsonSchema

**Signature**

```ts
export declare const jsonSchema: <I, A>(schema: Schema.Schema<I, A>) => (body: A) => EffectBody
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

# models

## Body (type alias)

**Signature**

```ts
export type Body = Empty | Raw | Uint8Array | EffectBody | FormData | Stream
```

Added in v1.0.0

## EffectBody (interface)

**Signature**

```ts
export interface EffectBody extends Body.Proto {
  readonly _tag: 'Effect'
  readonly effect: Effect.Effect<never, unknown, NonEffect>
}
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

## NonEffect (type alias)

**Signature**

```ts
export type NonEffect = Exclude<Body, EffectBody>
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
