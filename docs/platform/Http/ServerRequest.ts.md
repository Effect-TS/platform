---
title: Http/ServerRequest.ts
nav_order: 21
parent: "@effect/platform"
---

## ServerRequest overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [fiber refs](#fiber-refs)
  - [maxBodySize](#maxbodysize)
- [models](#models)
  - [ServerRequest (interface)](#serverrequest-interface)
- [schema](#schema)
  - [schemaBodyJson](#schemabodyjson)
  - [schemaBodyUrlParams](#schemabodyurlparams)
  - [schemaHeaders](#schemaheaders)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# fiber refs

## maxBodySize

**Signature**

```ts
export declare const maxBodySize: FiberRef<Option<FileSystem.Size>>
```

Added in v1.0.0

# models

## ServerRequest (interface)

**Signature**

```ts
export interface ServerRequest extends IncomingMessage.IncomingMessage<Error.RequestError> {
  readonly [TypeId]: TypeId
  readonly url: string
  readonly originalUrl: string
  readonly method: Method

  readonly formData: Effect.Effect<Scope.Scope | FileSystem.FileSystem | Path.Path, Error.RequestError, FormData>
  readonly formDataStream: Stream.Stream<never, Error.RequestError, FormData.Part>

  readonly setUrl: (url: string) => ServerRequest
  readonly replaceHeaders: (headers: Headers.Headers) => ServerRequest
}
```

Added in v1.0.0

# schema

## schemaBodyJson

**Signature**

```ts
export declare const schemaBodyJson: <I, A>(
  schema: Schema<I, A>
) => <E>(self: IncomingMessage.IncomingMessage<E>) => Effect.Effect<never, E | ParseError, A>
```

Added in v1.0.0

## schemaBodyUrlParams

**Signature**

```ts
export declare const schemaBodyUrlParams: <I extends Readonly<Record<string, string>>, A>(
  schema: Schema<I, A>
) => <E>(self: IncomingMessage.IncomingMessage<E>) => Effect.Effect<never, ParseError | E, A>
```

Added in v1.0.0

## schemaHeaders

**Signature**

```ts
export declare const schemaHeaders: <I extends Readonly<Record<string, string>>, A>(
  schema: Schema<I, A>
) => <E>(self: IncomingMessage.IncomingMessage<E>) => Effect.Effect<never, ParseError, A>
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
