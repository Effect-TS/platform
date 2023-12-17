---
title: Http/ServerError.ts
nav_order: 21
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
  - [RouteNotFound](#routenotfound)
  - [RouteNotFound (interface)](#routenotfound-interface)
  - [ServeError](#serveerror)
  - [ServeError (interface)](#serveerror-interface)
- [predicates](#predicates)
  - [isServerError](#isservererror)
- [type id](#type-id)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
- [utils](#utils)
  - [HttpError (namespace)](#httperror-namespace)
    - [Proto (interface)](#proto-interface)
    - [ProvidedFields (type alias)](#providedfields-type-alias)
  - [clientAbortFiberId](#clientabortfiberid)
  - [isClientAbortCause](#isclientabortcause)

---

# error

## HttpServerError (type alias)

**Signature**

```ts
export type HttpServerError = RequestError | ResponseError | RouteNotFound | ServeError
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
  readonly request: ServerRequest.ServerRequest
  readonly reason: "Transport" | "Decode"
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
  readonly request: ServerRequest.ServerRequest
  readonly response: ServerResponse.ServerResponse
  readonly reason: "Decode"
  readonly error: unknown
}
```

Added in v1.0.0

## RouteNotFound

**Signature**

```ts
export declare const RouteNotFound: (props: Omit<RouteNotFound, HttpError.ProvidedFields>) => RouteNotFound
```

Added in v1.0.0

## RouteNotFound (interface)

**Signature**

```ts
export interface RouteNotFound extends HttpError.Proto {
  readonly _tag: "RouteNotFound"
  readonly request: ServerRequest.ServerRequest
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
  readonly _tag: "ServeError"
  readonly error: unknown
}
```

Added in v1.0.0

# predicates

## isServerError

**Signature**

```ts
export declare const isServerError: (u: unknown) => u is HttpServerError
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

## clientAbortFiberId

**Signature**

```ts
export declare const clientAbortFiberId: FiberId.FiberId
```

Added in v1.0.0

## isClientAbortCause

**Signature**

```ts
export declare const isClientAbortCause: <E>(cause: Cause.Cause<E>) => boolean
```

Added in v1.0.0
