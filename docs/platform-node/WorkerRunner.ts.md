---
title: WorkerRunner.ts
nav_order: 24
parent: "@effect/platform-node"
---

## WorkerRunner overview

Added in v1.0.0

Also includes exports from [`@effect/platform/WorkerRunner`](https://effect-ts.github.io/platform/platform/WorkerRunner.ts.html).

---

<h2 class="text-delta">Table of contents</h2>

- [exports](#exports)
  - [From "@effect/platform/WorkerRunner"](#from-effectplatformworkerrunner)
- [layers](#layers)
  - [layer](#layer)
  - [layerPlatform](#layerplatform)
  - [layerSerialized](#layerserialized)

---

# exports

## From "@effect/platform/WorkerRunner"

Re-exports all named exports from the "@effect/platform/WorkerRunner" module.

**Signature**

```ts
export * from "@effect/platform/WorkerRunner"
```

Added in v1.0.0

# layers

## layer

**Signature**

```ts
export declare const layer: <I, R, E, O>(
  process: (request: I) => Stream.Stream<R, E, O>,
  options?: Runner.Runner.Options<I, E, O> | undefined
) => Layer.Layer<R, WorkerError, never>
```

Added in v1.0.0

## layerPlatform

**Signature**

```ts
export declare const layerPlatform: Layer.Layer<never, never, Runner.PlatformRunner>
```

Added in v1.0.0

## layerSerialized

**Signature**

```ts
export declare const layerSerialized: <
  I,
  A extends Schema.TaggedRequest.Any,
  Handlers extends Runner.SerializedRunner.Handlers<A>
>(
  schema: Schema.Schema<I, A>,
  handlers: Handlers
) => Layer.Layer<Runner.SerializedRunner.HandlersContext<Handlers>, WorkerError, never>
```

Added in v1.0.0
