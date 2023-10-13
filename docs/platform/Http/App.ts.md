---
title: Http/App.ts
nav_order: 6
parent: "@effect/platform"
---

## App overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [withDefaultMiddleware](#withdefaultmiddleware)
- [fiber refs](#fiber-refs)
  - [appendPreResponseHandler](#appendpreresponsehandler)
  - [currentPreResponseHandlers](#currentpreresponsehandlers)
  - [preResponseHandler](#preresponsehandler)
  - [withPreResponseHandler](#withpreresponsehandler)
- [models](#models)
  - [Default (type alias)](#default-type-alias)
  - [HttpApp (interface)](#httpapp-interface)
  - [PreResponseHandler (type alias)](#preresponsehandler-type-alias)

---

# combinators

## withDefaultMiddleware

**Signature**

```ts
export declare const withDefaultMiddleware: <R, E>(self: Default<R, E>) => Default<R, E>
```

Added in v1.0.0

# fiber refs

## appendPreResponseHandler

**Signature**

```ts
export declare const appendPreResponseHandler: (handler: PreResponseHandler) => Effect.Effect<never, never, void>
```

Added in v1.0.0

## currentPreResponseHandlers

**Signature**

```ts
export declare const currentPreResponseHandlers: FiberRef.FiberRef<readonly PreResponseHandler[]>
```

Added in v1.0.0

## preResponseHandler

**Signature**

```ts
export declare const preResponseHandler: Effect.Effect<never, never, PreResponseHandler>
```

Added in v1.0.0

## withPreResponseHandler

**Signature**

```ts
export declare const withPreResponseHandler: ((
  handler: PreResponseHandler
) => <R, E, A>(self: HttpApp<R, E, A>) => HttpApp<R, E, A>) &
  (<R, E, A>(self: HttpApp<R, E, A>, handler: PreResponseHandler) => HttpApp<R, E, A>)
```

Added in v1.0.0

# models

## Default (type alias)

**Signature**

```ts
export type Default<R, E> = HttpApp<R, E, ServerResponse.ServerResponse>
```

Added in v1.0.0

## HttpApp (interface)

**Signature**

```ts
export interface HttpApp<R, E, A> extends Effect.Effect<R | ServerRequest.ServerRequest, E, A> {}
```

Added in v1.0.0

## PreResponseHandler (type alias)

**Signature**

```ts
export type PreResponseHandler = (
  request: ServerRequest.ServerRequest,
  response: ServerResponse.ServerResponse
) => Effect.Effect<never, ServerError.ResponseError, ServerResponse.ServerResponse>
```

Added in v1.0.0
