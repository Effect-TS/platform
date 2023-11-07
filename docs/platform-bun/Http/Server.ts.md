---
title: Http/Server.ts
nav_order: 8
parent: "@effect/platform-bun"
---

## Server overview

Added in v1.0.0

Also includes exports from [`@effect/platform/Http/Server`](https://effect-ts.github.io/platform/platform/Http/Server.ts.html).

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
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
  options: Omit<ServeOptions, "fetch" | "error">
) => Effect.Effect<Scope.Scope, never, Server.Server>
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
  options: Omit<ServeOptions, "fetch" | "error">
) => Layer.Layer<never, never, Server.Server | Platform.Platform>
```

Added in v1.0.0

## layerConfig

**Signature**

```ts
export declare const layerConfig: (
  options: Config.Config.Wrap<Omit<ServeOptions, "fetch" | "error">>
) => Layer.Layer<never, ConfigError.ConfigError, Server.Server | Platform.Platform>
```

Added in v1.0.0
