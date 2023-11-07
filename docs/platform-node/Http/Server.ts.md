---
title: Http/Server.ts
nav_order: 10
parent: "@effect/platform-node"
---

## Server overview

Added in v1.0.0

Also includes exports from [`@effect/platform/Http/Server`](https://effect-ts.github.io/platform/platform/Http/Server.ts.html).

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
  - [makeHandler](#makehandler)
- [exports](#exports)
  - [From "@effect/platform/Http/Server"](#from-effectplatformhttpserver)
- [layers](#layers)
  - [layer](#layer)
  - [layerConfig](#layerconfig)

---

# constructors

## make

**Signature**

```ts
export declare const make: (
  evaluate: LazyArg<Http.Server>,
  options: Net.ListenOptions
) => Effect.Effect<Scope.Scope, never, Server.Server>
```

Added in v1.0.0

## makeHandler

**Signature**

```ts
export declare const makeHandler: {
  <R, E>(
    httpApp: App.Default<R, E>
  ): Effect.Effect<
    Exclude<R, ServerRequest.ServerRequest>,
    never,
    (nodeRequest: Http.IncomingMessage, nodeResponse: Http.ServerResponse<Http.IncomingMessage>) => void
  >
  <R, E, App extends App.Default<any, any>>(
    httpApp: App.Default<R, E>,
    middleware: Middleware.Middleware.Applied<R, E, App>
  ): Effect.Effect<
    Exclude<Effect.Effect.Context<App>, ServerRequest.ServerRequest>,
    never,
    (nodeRequest: Http.IncomingMessage, nodeResponse: Http.ServerResponse<Http.IncomingMessage>) => void
  >
}
```

Added in v1.0.0

# exports

## From "@effect/platform/Http/Server"

Re-exports all named exports from the "@effect/platform/Http/Server" module.

**Signature**

```ts
export * from "@effect/platform/Http/Server"
```

Added in v1.0.0

# layers

## layer

**Signature**

```ts
export declare const layer: (
  evaluate: LazyArg<Http.Server<typeof Http.IncomingMessage, typeof Http.ServerResponse>>,
  options: Net.ListenOptions
) => Layer.Layer<never, never, Server.Server | Platform.Platform>
```

Added in v1.0.0

## layerConfig

**Signature**

```ts
export declare const layerConfig: (
  evaluate: LazyArg<Http.Server<typeof Http.IncomingMessage, typeof Http.ServerResponse>>,
  options: Config.Config.Wrap<Net.ListenOptions>
) => Layer.Layer<never, ConfigError.ConfigError, Server.Server | Platform.Platform>
```

Added in v1.0.0
