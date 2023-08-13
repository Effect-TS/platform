---
title: Http/IncomingMessage.ts
nav_order: 15
parent: "@effect/platform"
---

## IncomingMessage overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [models](#models)
  - [IncomingMessage (interface)](#incomingmessage-interface)
- [schema](#schema)
  - [schemaBody](#schemabody)
  - [schemaHeaders](#schemaheaders)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# models

## IncomingMessage (interface)

**Signature**

```ts
export interface IncomingMessage<E> {
  readonly [TypeId]: TypeId
  readonly headers: Headers.Headers
  readonly json: Effect.Effect<never, E, unknown>
  readonly text: Effect.Effect<never, E, string>
  readonly arrayBuffer: Effect.Effect<never, E, ArrayBuffer>
  readonly formData: Effect.Effect<never, E, FormData>
  // readonly formDataStream: Stream.Stream<never, Error.TransportError, FormData.Part>
  readonly stream: Stream.Stream<never, E, Uint8Array>
}
```

Added in v1.0.0

# schema

## schemaBody

**Signature**

```ts
export declare const schemaBody: <I, A>(
  schema: Schema.Schema<I, A>
) => <E>(self: IncomingMessage<E>) => Effect.Effect<never, E | ParseResult.ParseError, A>
```

Added in v1.0.0

## schemaHeaders

**Signature**

```ts
export declare const schemaHeaders: <I, A>(
  schema: Schema.Schema<I, A>
) => <E>(self: IncomingMessage<E>) => Effect.Effect<never, ParseResult.ParseError, A>
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
