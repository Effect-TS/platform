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
  - [schemaBodyJson](#schemabodyjson)
  - [schemaBodyUrlParams](#schemabodyurlparams)
  - [schemaHeaders](#schemaheaders)
  - [schemaJson](#schemajson)
  - [schemaNoBody](#schemanobody)
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
  readonly formData: Effect.Effect<never, Error.ResponseError, FormData>
}
```

Added in v1.0.0

# schema

## schemaBodyJson

**Signature**

```ts
export declare const schemaBodyJson: <I, A>(
  schema: Schema.Schema<I, A>
) => <E>(self: IncomingMessage.IncomingMessage<E>) => Effect.Effect<never, ParseResult.ParseError | E, A>
```

Added in v1.0.0

## schemaBodyUrlParams

**Signature**

```ts
export declare const schemaBodyUrlParams: <I extends Readonly<Record<string, string>>, A>(
  schema: Schema.Schema<I, A>
) => <E>(self: IncomingMessage.IncomingMessage<E>) => Effect.Effect<never, ParseResult.ParseError | E, A>
```

Added in v1.0.0

## schemaHeaders

**Signature**

```ts
export declare const schemaHeaders: <I extends Readonly<Record<string, string>>, A>(
  schema: Schema.Schema<I, A>
) => <E>(self: IncomingMessage.IncomingMessage<E>) => Effect.Effect<never, ParseResult.ParseError, A>
```

Added in v1.0.0

## schemaJson

**Signature**

```ts
export declare const schemaJson: <
  I extends {
    readonly status?: number | undefined
    readonly headers?: Headers.Headers | undefined
    readonly body?: unknown
  },
  A
>(
  schema: Schema.Schema<I, A>
) => (self: ClientResponse) => Effect.Effect<never, ParseResult.ParseError | Error.ResponseError, A>
```

Added in v1.0.0

## schemaNoBody

**Signature**

```ts
export declare const schemaNoBody: <
  I extends { readonly status?: number | undefined; readonly headers?: Headers.Headers | undefined },
  A
>(
  schema: Schema.Schema<I, A>
) => (self: ClientResponse) => Effect.Effect<never, ParseResult.ParseError, A>
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
