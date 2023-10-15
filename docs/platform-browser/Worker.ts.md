---
title: Worker.ts
nav_order: 9
parent: "@effect/platform-browser"
---

## Worker overview

Added in v1.0.0

Also includes exports from [`@effect/platform/Worker`](https://effect-ts.github.io/platform/platform/Worker.ts.html).

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [makePool](#makepool)
- [exports](#exports)
  - [From "@effect/platform/Worker"](#from-effectplatformworker)
- [layers](#layers)
  - [layerManager](#layermanager)
  - [layerWorker](#layerworker)

---

# constructors

## makePool

**Signature**

```ts
export declare const makePool: <I, E, O>(
  options: Worker.WorkerPool.Options<I, any>
) => Effect.Effect<Scope.Scope, never, Worker.WorkerPool<I, E, O>>
```

Added in v1.0.0

# exports

## From "@effect/platform/Worker"

Re-exports all named exports from the "@effect/platform/Worker" module.

**Signature**

```ts
export * from '@effect/platform/Worker'
```

Added in v1.0.0

# layers

## layerManager

**Signature**

```ts
export declare const layerManager: Layer.Layer<never, never, Worker.WorkerManager>
```

Added in v1.0.0

## layerWorker

**Signature**

```ts
export declare const layerWorker: Layer.Layer<never, never, Worker.PlatformWorker>
```

Added in v1.0.0
