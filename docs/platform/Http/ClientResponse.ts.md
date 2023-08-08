---
title: Http/ClientResponse.ts
nav_order: 11
parent: "@effect/platform"
---

## ClientResponse overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromWeb](#fromweb)
- [models](#models)
  - [ClientResponse (interface)](#clientresponse-interface)
- [schema](#schema)
  - [parseSchema](#parseschema)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## fromWeb

**Signature**

```ts
export declare const fromWeb: (request: ClientRequest.ClientRequest, source: Response) => ClientResponse
```

Added in v1.0.0

# models

## ClientResponse (interface)

**Signature**

```ts
export interface ClientResponse extends IncomingMessage.IncomingMessage<Error.ResponseError> {
  readonly [TypeId]: TypeId
  readonly status: number
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
