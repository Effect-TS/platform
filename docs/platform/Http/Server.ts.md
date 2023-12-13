---
title: Http/Server.ts
nav_order: 20
parent: "@effect/platform"
---

## Server overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [accessors](#accessors)
  - [serve](#serve)
- [constructors](#constructors)
  - [Server](#server)
  - [make](#make)
- [models](#models)
  - [Address (type alias)](#address-type-alias)
  - [ServeOptions (interface)](#serveoptions-interface)
  - [Server (interface)](#server-interface)
  - [TcpAddress (interface)](#tcpaddress-interface)
  - [UnixAddress (interface)](#unixaddress-interface)
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
  ) => Effect.Effect<Scope.Scope | Server | Exclude<R, ServerRequest.ServerRequest>, never, void>
  <R, E, App extends App.Default<any, any>>(
    middleware: Middleware.Middleware.Applied<R, E, App>
  ): (
    httpApp: App.Default<R, E>
  ) => Effect.Effect<
    Scope.Scope | Server | Exclude<Effect.Effect.Context<App>, ServerRequest.ServerRequest>,
    never,
    void
  >
  <R, E>(
    httpApp: App.Default<R, E>
  ): Effect.Effect<Scope.Scope | Server | Exclude<R, ServerRequest.ServerRequest>, never, void>
  <R, E, App extends App.Default<any, any>>(
    httpApp: App.Default<R, E>,
    middleware: Middleware.Middleware.Applied<R, E, App>
  ): Effect.Effect<Scope.Scope | Server | Exclude<Effect.Effect.Context<App>, ServerRequest.ServerRequest>, never, void>
}
```

Added in v1.0.0

# constructors

## Server

**Signature**

```ts
export declare const Server: Context.Tag<Server, Server>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: (options: {
  readonly serve: (
    httpApp: App.Default<never, unknown>,
    middleware?: Middleware.Middleware
  ) => Effect.Effect<Scope.Scope, never, void>
  readonly address: Address
}) => Server
```

Added in v1.0.0

# models

## Address (type alias)

**Signature**

```ts
export type Address = UnixAddress | TcpAddress
```

Added in v1.0.0

## ServeOptions (interface)

**Signature**

```ts
export interface ServeOptions {
  readonly respond: boolean
}
```

Added in v1.0.0

## Server (interface)

**Signature**

```ts
export interface Server {
  readonly [TypeId]: TypeId
  readonly serve: {
    <R, E>(
      httpApp: App.Default<R, E>
    ): Effect.Effect<Exclude<R, ServerRequest.ServerRequest> | Scope.Scope, never, void>
    <R, E, App extends App.Default<any, any>>(
      httpApp: App.Default<R, E>,
      middleware: Middleware.Middleware.Applied<R, E, App>
    ): Effect.Effect<Exclude<Effect.Effect.Context<App>, ServerRequest.ServerRequest> | Scope.Scope, never, void>
  }
  readonly address: Address
}
```

Added in v1.0.0

## TcpAddress (interface)

**Signature**

```ts
export interface TcpAddress {
  readonly _tag: "TcpAddress"
  readonly hostname: string
  readonly port: number
}
```

Added in v1.0.0

## UnixAddress (interface)

**Signature**

```ts
export interface UnixAddress {
  readonly _tag: "UnixAddress"
  readonly path: string
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
