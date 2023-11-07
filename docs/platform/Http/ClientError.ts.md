---
title: Http/ClientError.ts
nav_order: 9
parent: "@effect/platform"
---

## ClientError overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [error](#error)
  - [HttpClientError (type alias)](#httpclienterror-type-alias)
  - [RequestError](#requesterror)
  - [RequestError (interface)](#requesterror-interface)
  - [ResponseError](#responseerror)
  - [ResponseError (interface)](#responseerror-interface)
- [type id](#type-id)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
- [utils](#utils)
  - [HttpError (namespace)](#httperror-namespace)
    - [Proto (interface)](#proto-interface)
    - [ProvidedFields (type alias)](#providedfields-type-alias)

---

# error

## HttpClientError (type alias)

**Signature**

```ts
export type HttpClientError = RequestError | ResponseError
```

Added in v1.0.0

## RequestError

**Signature**

```ts
export declare const RequestError: (props: Omit<RequestError, HttpError.ProvidedFields>) => RequestError
```

Added in v1.0.0

## RequestError (interface)

**Signature**

```ts
export interface RequestError extends HttpError.Proto {
  readonly _tag: "RequestError"
  readonly request: ClientRequest.ClientRequest
  readonly reason: "Transport" | "Encode" | "InvalidUrl"
  readonly error: unknown
}
```

Added in v1.0.0

## ResponseError

**Signature**

```ts
export declare const ResponseError: (props: Omit<ResponseError, HttpError.ProvidedFields>) => ResponseError
```

Added in v1.0.0

## ResponseError (interface)

**Signature**

```ts
export interface ResponseError extends HttpError.Proto {
  readonly _tag: "ResponseError"
  readonly request: ClientRequest.ClientRequest
  readonly response: ClientResponse.ClientResponse
  readonly reason: "StatusCode" | "Decode" | "EmptyBody"
  readonly error: unknown
}
```

Added in v1.0.0

# type id

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

## HttpError (namespace)

Added in v1.0.0

### Proto (interface)

**Signature**

```ts
export interface Proto extends Data.Case {
  readonly [TypeId]: TypeId
  readonly _tag: string
}
```

Added in v1.0.0

### ProvidedFields (type alias)

**Signature**

```ts
export type ProvidedFields = TypeId | "_tag" | keyof Data.Case
```

Added in v1.0.0
