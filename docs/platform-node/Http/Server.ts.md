---
title: Http/Server.ts
nav_order: 8
parent: "@effect/platform-node"
---

## Server overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [accessors](#accessors)
  - [respondServe](#respondserve)
- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
- [middleware](#middleware)
  - [respond](#respond)

---

# accessors

## respondServe

**Signature**

```ts
export declare const respondServe: <R, E>(
  httpApp: App.Default<R, E>
) => Effect.Effect<Server.HttpServer | R, Error.ServeError, never>
```

Added in v1.0.0

# constructors

## make

**Signature**

```ts
export declare const make: (
  evaluate: LazyArg<Http.Server<typeof Http.IncomingMessage, typeof Http.ServerResponse>>,
  options: Net.ListenOptions
) => Effect.Effect<Scope.Scope, never, Server.HttpServer>
```

Added in v1.0.0

# layers

## layer

**Signature**

```ts
export declare const layer: (
  evaluate: LazyArg<Http.Server<typeof Http.IncomingMessage, typeof Http.ServerResponse>>,
  options: Net.ListenOptions
) => Layer.Layer<never, never, Server.HttpServer>
```

Added in v1.0.0

# middleware

## respond

**Signature**

```ts
export declare const respond: <R, E>(
  httpApp: App.Default<R, E>
) => App.HttpApp<R, E | Error.ResponseError, ServerRequest.ServerRequest, ServerResponse.ServerResponse.NonEffectBody>
```

Added in v1.0.0
