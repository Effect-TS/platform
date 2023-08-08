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
  - [bytes](#bytes)
  - [bytesEffect](#byteseffect)
  - [empty](#empty)
  - [formData](#formdata)
  - [json](#json)
  - [jsonSchema](#jsonschema)
  - [raw](#raw)
  - [stream](#stream)
  - [text](#text)
- [models](#models)
  - [Body (type alias)](#body-type-alias)
  - [Bytes (interface)](#bytes-interface)
  - [BytesEffect (interface)](#byteseffect-interface)
  - [Empty (interface)](#empty-interface)
  - [FormData (interface)](#formdata-interface)
  - [Raw (interface)](#raw-interface)
  - [Stream (interface)](#stream-interface)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## bytes

**Signature**

```ts
export declare const bytes: (body: Uint8Array) => Bytes
```

Added in v1.0.0

## bytesEffect

**Signature**

```ts
export declare const bytesEffect: (body: Effect.Effect<never, unknown, Uint8Array>) => BytesEffect
```

Added in v1.0.0

## empty

**Signature**

```ts
export declare const empty: Empty
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
export declare const json: (body: unknown) => BytesEffect
```

Added in v1.0.0

## jsonSchema

**Signature**

```ts
export declare const jsonSchema: <I, A>(schema: Schema.Schema<I, A>) => (body: A) => BytesEffect
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
export declare const stream: (body: Stream_.Stream<never, unknown, Uint8Array>) => Stream
```

Added in v1.0.0

## text

**Signature**

```ts
export declare const text: (body: string, contentType?: string) => Bytes
```

Added in v1.0.0

# models

## Body (type alias)

**Signature**

```ts
export type Body = Empty | Raw | Bytes | BytesEffect | FormData | Stream
```

Added in v1.0.0

## Bytes (interface)

**Signature**

```ts
export interface Bytes extends Body.Proto {
  readonly _tag: 'Bytes'
  readonly body: Uint8Array
}
```

Added in v1.0.0

## BytesEffect (interface)

**Signature**

```ts
export interface BytesEffect extends Body.Proto {
  readonly _tag: 'BytesEffect'
  readonly body: Effect.Effect<never, unknown, Uint8Array>
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
  readonly stream: Stream_.Stream<never, unknown, Uint8Array>
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
