---
title: Http/Server.ts
nav_order: 8
parent: "@effect/platform-node"
---

## Server overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [layers](#layers)
  - [layer](#layer)
- [middleware](#middleware)
  - [respond](#respond)

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

# layers

## layer

**Signature**

```ts
export declare const layer: (
  evaluate: LazyArg<Http.Server<typeof Http.IncomingMessage, typeof Http.ServerResponse>>,
  options: Net.ListenOptions
) => Layer.Layer<never, never, Server.Server>
```

Added in v1.0.0

# middleware

## respond

**Signature**

```ts
export declare const respond: <R, E>(
  httpApp: App.Default<R, E>
) => App.HttpApp<R, E | Error.ResponseError, ServerResponse.ServerResponse.NonEffectBody>
```

Added in v1.0.0
