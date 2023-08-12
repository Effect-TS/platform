---
title: Http/ServerRequest.ts
nav_order: 21
parent: "@effect/platform"
---

## ServerRequest overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [models](#models)
  - [ServerRequest (interface)](#serverrequest-interface)
- [schema](#schema)
  - [parseSchema](#parseschema)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# models

## ServerRequest (interface)

**Signature**

```ts
export interface ServerRequest extends IncomingMessage.IncomingMessage<Error.RequestError> {
  readonly [TypeId]: TypeId
  readonly url: string
  readonly originalUrl: string
  readonly method: Method

  readonly setUrl: (url: string) => ServerRequest
  readonly replaceHeaders: (headers: Headers.Headers) => ServerRequest
}
```

Added in v1.0.0

# schema

## parseSchema

**Signature**

```ts
export declare const parseSchema: <I, A>(
  schema: Schema<I, A>
) => <E>(self: IncomingMessage.IncomingMessage<E>) => Effect<never, E | ParseError, A>
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
