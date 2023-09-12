---
title: Http/IncomingMessage.ts
nav_order: 15
parent: "@effect/platform"
---

## IncomingMessage overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [fiber refs](#fiber-refs)
  - [maxBodySize](#maxbodysize)
  - [withMaxBodySize](#withmaxbodysize)
- [models](#models)
  - [IncomingMessage (interface)](#incomingmessage-interface)
- [schema](#schema)
  - [schemaBodyJson](#schemabodyjson)
  - [schemaBodyUrlParams](#schemabodyurlparams)
  - [schemaExternalSpan](#schemaexternalspan)
  - [schemaHeaders](#schemaheaders)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# fiber refs

## maxBodySize

**Signature**

```ts
export declare const maxBodySize: FiberRef.FiberRef<Option.Option<FileSystem.Size>>
```

Added in v1.0.0

## withMaxBodySize

**Signature**

```ts
export declare const withMaxBodySize: ((
  size: Option.Option<FileSystem.SizeInput>
) => <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>) &
  (<R, E, A>(effect: Effect.Effect<R, E, A>, size: Option.Option<FileSystem.SizeInput>) => Effect.Effect<R, E, A>)
```

Added in v1.0.0

# models

## IncomingMessage (interface)

**Signature**

```ts
export interface IncomingMessage<E> {
  readonly [TypeId]: TypeId
  readonly headers: Headers.Headers
  readonly json: Effect.Effect<never, E, unknown>
  readonly text: Effect.Effect<never, E, string>
  readonly urlParamsBody: Effect.Effect<never, E, UrlParams.UrlParams>
  readonly arrayBuffer: Effect.Effect<never, E, ArrayBuffer>
  readonly stream: Stream.Stream<never, E, Uint8Array>
}
```

Added in v1.0.0

# schema

## schemaBodyJson

**Signature**

```ts
export declare const schemaBodyJson: <I, A>(
  schema: Schema.Schema<I, A>
) => <E>(self: IncomingMessage<E>) => Effect.Effect<never, ParseResult.ParseError | E, A>
```

Added in v1.0.0

## schemaBodyUrlParams

**Signature**

```ts
export declare const schemaBodyUrlParams: <I extends Readonly<Record<string, string>>, A>(
  schema: Schema.Schema<I, A>
) => <E>(self: IncomingMessage<E>) => Effect.Effect<never, ParseResult.ParseError | E, A>
```

Added in v1.0.0

## schemaExternalSpan

**Signature**

```ts
export declare const schemaExternalSpan: <E>(
  self: IncomingMessage<E>
) => Effect.Effect<never, ParseResult.ParseError, ExternalSpan>
```

Added in v1.0.0

## schemaHeaders

**Signature**

```ts
export declare const schemaHeaders: <I extends Readonly<Record<string, string>>, A>(
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
