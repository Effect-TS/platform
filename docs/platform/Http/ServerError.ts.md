---
title: Http/ServerError.ts
nav_order: 20
parent: "@effect/platform"
---

## ServerError overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [error](#error)
  - [HttpServerError (type alias)](#httpservererror-type-alias)
  - [RequestError](#requesterror)
  - [RequestError (interface)](#requesterror-interface)
  - [ResponseError](#responseerror)
  - [ResponseError (interface)](#responseerror-interface)
  - [ServeError](#serveerror)
  - [ServeError (interface)](#serveerror-interface)
- [type id](#type-id)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# error

## HttpServerError (type alias)

**Signature**

```ts
export type HttpServerError = RequestError | ResponseError
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
  readonly _tag: 'RequestError'
  readonly request: ServerRequest.ServerRequest
  readonly reason: 'Transport' | 'Decode' | 'NotFound'
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
  readonly _tag: 'ResponseError'
  readonly request: ServerRequest.ServerRequest
  readonly response: ServerResponse.ServerResponse
  readonly reason: 'Decode'
  readonly error: unknown
}
```

Added in v1.0.0

## ServeError

**Signature**

```ts
export declare const ServeError: (props: Omit<ServeError, HttpError.ProvidedFields>) => ServeError
```

Added in v1.0.0

## ServeError (interface)

**Signature**

```ts
export interface ServeError extends HttpError.Proto {
  readonly _tag: 'ServeError'
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
