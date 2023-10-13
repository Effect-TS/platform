---
title: Http/Client.ts
nav_order: 8
parent: "@effect/platform"
---

## Client overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fetch](#fetch)
  - [fetchOk](#fetchok)
  - [make](#make)
  - [makeDefault](#makedefault)
- [error handling](#error-handling)
  - [catchAll](#catchall)
  - [catchTag](#catchtag)
  - [catchTags](#catchtags)
  - [retry](#retry)
- [filters](#filters)
  - [filterOrElse](#filterorelse)
  - [filterOrFail](#filterorfail)
  - [filterStatus](#filterstatus)
  - [filterStatusOk](#filterstatusok)
- [layers](#layers)
  - [layer](#layer)
- [mapping & sequencing](#mapping--sequencing)
  - [map](#map)
  - [mapEffect](#mapeffect)
  - [mapRequest](#maprequest)
  - [mapRequestEffect](#maprequesteffect)
  - [tap](#tap)
  - [tapRequest](#taprequest)
  - [transform](#transform)
  - [transformResponse](#transformresponse)
- [models](#models)
  - [Client (interface)](#client-interface)
- [schema](#schema)
  - [schemaFunction](#schemafunction)
- [tags](#tags)
  - [Client](#client)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
- [utils](#utils)
  - [Client (namespace)](#client-namespace)
    - [Default (type alias)](#default-type-alias)
    - [WithResponse (type alias)](#withresponse-type-alias)

---

# constructors

## fetch

**Signature**

```ts
export declare const fetch: (options?: RequestInit) => Client.Default
```

Added in v1.0.0

## fetchOk

**Signature**

```ts
export declare const fetchOk: (options?: RequestInit) => Client.Default
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <R, E, A>(
  f: (request: ClientRequest.ClientRequest) => Effect.Effect<R, E, A>
) => Client<R, E, A>
```

Added in v1.0.0

## makeDefault

**Signature**

```ts
export declare const makeDefault: (
  f: (
    request: ClientRequest.ClientRequest
  ) => Effect.Effect<never, Error.HttpClientError, ClientResponse.ClientResponse>
) => Client.Default
```

Added in v1.0.0

# error handling

## catchAll

**Signature**

```ts
export declare const catchAll: {
  <E, R2, E2, A2>(f: (e: E) => Effect.Effect<R2, E2, A2>): <R, A>(self: Client<R, E, A>) => Client<R2 | R, E2, A2 | A>
  <R, E, A, R2, E2, A2>(self: Client<R, E, A>, f: (e: E) => Effect.Effect<R2, E2, A2>): Client<R | R2, E2, A | A2>
}
```

Added in v1.0.0

## catchTag

**Signature**

```ts
export declare const catchTag: {
  <E extends { _tag: string }, K extends E['_tag'] & string, R1, E1, A1>(
    tag: K,
    f: (e: Extract<E, { _tag: K }>) => Effect.Effect<R1, E1, A1>
  ): <R, A>(self: Client<R, E, A>) => Client<R1 | R, E1 | Exclude<E, { _tag: K }>, A1 | A>
  <R, E extends { _tag: string }, A, K extends E['_tag'] & string, E1, R1, A1>(
    self: Client<R, E, A>,
    tag: K,
    f: (e: Extract<E, { _tag: K }>) => Effect.Effect<R1, E1, A1>
  ): Client<R | R1, E1 | Exclude<E, { _tag: K }>, A | A1>
}
```

Added in v1.0.0

## catchTags

**Signature**

```ts
export declare const catchTags: {
  <
    E extends { _tag: string },
    Cases extends { [K in E['_tag']]+?: ((error: Extract<E, { _tag: K }>) => Effect.Effect<any, any, any>) | undefined }
  >(
    cases: Cases
  ): <R, A>(
    self: Client<R, E, A>
  ) => Client<
    | R
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<infer R, any, any> ? R : never
      }[keyof Cases],
    | Exclude<E, { _tag: keyof Cases }>
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, infer E, any> ? E : never
      }[keyof Cases],
    | A
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, any, infer A> ? A : never
      }[keyof Cases]
  >
  <
    R,
    E extends { _tag: string },
    A,
    Cases extends { [K in E['_tag']]+?: ((error: Extract<E, { _tag: K }>) => Effect.Effect<any, any, any>) | undefined }
  >(
    self: Client<R, E, A>,
    cases: Cases
  ): Client<
    | R
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<infer R, any, any> ? R : never
      }[keyof Cases],
    | Exclude<E, { _tag: keyof Cases }>
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, infer E, any> ? E : never
      }[keyof Cases],
    | A
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, any, infer A> ? A : never
      }[keyof Cases]
  >
}
```

Added in v1.0.0

## retry

**Signature**

```ts
export declare const retry: {
  <R1, E extends E0, E0, B>(policy: Schedule.Schedule<R1, E0, B>): <R, A>(self: Client<R, E, A>) => Client<R1 | R, E, A>
  <R, E extends E0, E0, A, R1, B>(self: Client<R, E, A>, policy: Schedule.Schedule<R1, E0, B>): Client<R | R1, E, A>
}
```

Added in v1.0.0

# filters

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <A, R2, E2, B>(f: Predicate.Predicate<A>, orElse: (a: A) => Effect.Effect<R2, E2, B>): <R, E>(
    self: Client<R, E, A>
  ) => Client<R2 | R, E2 | E, A | B>
  <R, E, A, R2, E2, B>(
    self: Client<R, E, A>,
    f: Predicate.Predicate<A>,
    orElse: (a: A) => Effect.Effect<R2, E2, B>
  ): Client<R | R2, E | E2, A | B>
}
```

Added in v1.0.0

## filterOrFail

**Signature**

```ts
export declare const filterOrFail: {
  <A, E2>(f: Predicate.Predicate<A>, orFailWith: (a: A) => E2): <R, E>(self: Client<R, E, A>) => Client<R, E2 | E, A>
  <R, E, A, E2>(self: Client<R, E, A>, f: Predicate.Predicate<A>, orFailWith: (a: A) => E2): Client<R, E | E2, A>
}
```

Added in v1.0.0

## filterStatus

**Signature**

```ts
export declare const filterStatus: {
  (f: (status: number) => boolean): <R, E>(
    self: Client.WithResponse<R, E>
  ) => Client.WithResponse<R, Error.ResponseError | E>
  <R, E>(self: Client.WithResponse<R, E>, f: (status: number) => boolean): Client.WithResponse<
    R,
    Error.ResponseError | E
  >
}
```

Added in v1.0.0

## filterStatusOk

**Signature**

```ts
export declare const filterStatusOk: <R, E>(
  self: Client.WithResponse<R, E>
) => Client.WithResponse<R, Error.ResponseError | E>
```

Added in v1.0.0

# layers

## layer

**Signature**

```ts
export declare const layer: Layer.Layer<never, never, Client.Default>
```

Added in v1.0.0

# mapping & sequencing

## map

**Signature**

```ts
export declare const map: {
  <A, B>(f: (a: A) => B): <R, E>(self: Client<R, E, A>) => Client<R, E, B>
  <R, E, A, B>(self: Client<R, E, A>, f: (a: A) => B): Client<R, E, B>
}
```

Added in v1.0.0

## mapEffect

**Signature**

```ts
export declare const mapEffect: {
  <A, R2, E2, B>(f: (a: A) => Effect.Effect<R2, E2, B>): <R, E>(self: Client<R, E, A>) => Client<R2 | R, E2 | E, B>
  <R, E, A, R2, E2, B>(self: Client<R, E, A>, f: (a: A) => Effect.Effect<R2, E2, B>): Client<R | R2, E | E2, B>
}
```

Added in v1.0.0

## mapRequest

**Signature**

```ts
export declare const mapRequest: {
  (f: (a: ClientRequest.ClientRequest) => ClientRequest.ClientRequest): <R, E, A>(
    self: Client<R, E, A>
  ) => Client<R, E, A>
  <R, E, A>(self: Client<R, E, A>, f: (a: ClientRequest.ClientRequest) => ClientRequest.ClientRequest): Client<R, E, A>
}
```

Added in v1.0.0

## mapRequestEffect

**Signature**

```ts
export declare const mapRequestEffect: {
  <R2, E2>(f: (a: ClientRequest.ClientRequest) => Effect.Effect<R2, E2, ClientRequest.ClientRequest>): <R, E, A>(
    self: Client<R, E, A>
  ) => Client<R2 | R, E2 | E, A>
  <R, E, A, R2, E2>(
    self: Client<R, E, A>,
    f: (a: ClientRequest.ClientRequest) => Effect.Effect<R2, E2, ClientRequest.ClientRequest>
  ): Client<R | R2, E | E2, A>
}
```

Added in v1.0.0

## tap

**Signature**

```ts
export declare const tap: {
  <A, R2, E2, _>(f: (a: A) => Effect.Effect<R2, E2, _>): <R, E>(self: Client<R, E, A>) => Client<R2 | R, E2 | E, A>
  <R, E, A, R2, E2, _>(self: Client<R, E, A>, f: (a: A) => Effect.Effect<R2, E2, _>): Client<R | R2, E | E2, A>
}
```

Added in v1.0.0

## tapRequest

**Signature**

```ts
export declare const tapRequest: {
  <R2, E2, _>(f: (a: ClientRequest.ClientRequest) => Effect.Effect<R2, E2, _>): <R, E, A>(
    self: Client<R, E, A>
  ) => Client<R2 | R, E2 | E, A>
  <R, E, A, R2, E2, _>(self: Client<R, E, A>, f: (a: ClientRequest.ClientRequest) => Effect.Effect<R2, E2, _>): Client<
    R | R2,
    E | E2,
    A
  >
}
```

Added in v1.0.0

## transform

**Signature**

```ts
export declare const transform: {
  <R, E, A, R1, E1, A1>(
    f: (client: Client<R, E, A>) => (request: ClientRequest.ClientRequest) => Effect.Effect<R1, E1, A1>
  ): (self: Client<R, E, A>) => Client<R1, E1, A1>
  <R, E, A, R1, E1, A1>(
    self: Client<R, E, A>,
    f: (client: Client<R, E, A>) => (request: ClientRequest.ClientRequest) => Effect.Effect<R1, E1, A1>
  ): Client<R1, E1, A1>
}
```

Added in v1.0.0

## transformResponse

**Signature**

```ts
export declare const transformResponse: {
  <R, E, A, R1, E1, A1>(f: (effect: Effect.Effect<R, E, A>) => Effect.Effect<R1, E1, A1>): (
    self: Client<R, E, A>
  ) => Client<R1, E1, A1>
  <R, E, A, R1, E1, A1>(
    self: Client<R, E, A>,
    f: (effect: Effect.Effect<R, E, A>) => Effect.Effect<R1, E1, A1>
  ): Client<R1, E1, A1>
}
```

Added in v1.0.0

# models

## Client (interface)

**Signature**

```ts
export interface Client<R, E, A> extends Pipeable {
  readonly [TypeId]: TypeId
  (request: ClientRequest.ClientRequest): Effect.Effect<R, E, A>
}
```

Added in v1.0.0

# schema

## schemaFunction

**Signature**

```ts
export declare const schemaFunction: {
  <SI, SA>(schema: Schema.Schema<SI, SA>): <R, E, A>(
    self: Client<R, E, A>
  ) => (
    request: ClientRequest.ClientRequest
  ) => (a: SA) => Effect.Effect<R, ParseResult.ParseError | Error.RequestError | E, A>
  <R, E, A, SI, SA>(self: Client<R, E, A>, schema: Schema.Schema<SI, SA>): (
    request: ClientRequest.ClientRequest
  ) => (a: SA) => Effect.Effect<R, ParseResult.ParseError | Error.RequestError | E, A>
}
```

Added in v1.0.0

# tags

## Client

**Signature**

```ts
export declare const Client: Context.Tag<Client.Default, Client.Default>
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

# utils

## Client (namespace)

Added in v1.0.0

### Default (type alias)

**Signature**

```ts
export type Default = WithResponse<never, Error.HttpClientError>
```

Added in v1.0.0

### WithResponse (type alias)

**Signature**

```ts
export type WithResponse<R, E> = Client<R, E, ClientResponse.ClientResponse>
```

Added in v1.0.0
