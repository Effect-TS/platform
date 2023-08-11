---
title: Http/Server.ts
nav_order: 18
parent: "@effect/platform"
---

## Server overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [accessors](#accessors)
  - [serve](#serve)
  - [serveJoin](#servejoin)
- [constructors](#constructors)
  - [HttpServer](#httpserver)
  - [make](#make)
- [models](#models)
  - [HttpServer (interface)](#httpserver-interface)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# accessors

## serve

**Signature**

```ts
export declare const serve: {
  (): <R, E>(
    httpApp: App.Default<R, E>
  ) => Effect.Effect<HttpServer | R, never, Fiber.RuntimeFiber<Error.ServeError, never>>
  <R, E, EX extends E, RM, EM>(middleware: Middleware.Middleware<RM, EX, EM>): (
    httpApp: App.Default<R, E>
  ) => Effect.Effect<HttpServer | R | RM, never, Fiber.RuntimeFiber<Error.ServeError, never>>
  <R, E>(httpApp: App.Default<R, E>): Effect.Effect<HttpServer | R, never, Fiber.RuntimeFiber<Error.ServeError, never>>
  <R, E, EX extends E, RM, EM>(
    httpApp: App.Default<R, E>,
    middleware: Middleware.Middleware<RM, EX, EM>
  ): Effect.Effect<HttpServer | R | RM, never, Fiber.RuntimeFiber<Error.ServeError, never>>
}
```

Added in v1.0.0

## serveJoin

**Signature**

```ts
export declare const serveJoin: {
  (): <R, E>(httpApp: App.Default<R, E>) => Effect.Effect<HttpServer | R, Error.ServeError, never>
  <R, E, EX extends E, RM, EM>(middleware: Middleware.Middleware<RM, EX, EM>): (
    httpApp: App.Default<R, E>
  ) => Effect.Effect<HttpServer | R | RM, Error.ServeError, never>
  <R, E>(httpApp: App.Default<R, E>): Effect.Effect<HttpServer | R, Error.ServeError, never>
  <R, E, EX extends E, RM, EM>(
    httpApp: App.Default<R, E>,
    middleware: Middleware.Middleware<RM, EX, EM>
  ): Effect.Effect<HttpServer | R | RM, Error.ServeError, never>
}
```

Added in v1.0.0

# constructors

## HttpServer

**Signature**

```ts
export declare const HttpServer: Context.Tag<HttpServer, HttpServer>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: (
  serve: (
    httpApp: App.Default<unknown, unknown>,
    middleware?: Middleware.Middleware<unknown, unknown, unknown> | undefined
  ) => Effect.Effect<never, never, Fiber.RuntimeFiber<Error.ServeError, never>>
) => HttpServer
```

Added in v1.0.0

# models

## HttpServer (interface)

**Signature**

```ts
export interface HttpServer {
  readonly [TypeId]: TypeId
  readonly serve: {
    <R, E>(httpApp: App.Default<R, E>): Effect.Effect<R, never, Fiber.RuntimeFiber<Error.ServeError, never>>
    <R, E, RM, EX extends E, EM>(
      httpApp: App.Default<R, E>,
      middleware: Middleware.Middleware<RM, EX, EM>
    ): Effect.Effect<RM, never, Fiber.RuntimeFiber<Error.ServeError, never>>
  }
}
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
