---
title: Worker.ts
nav_order: 10
parent: "@effect/platform-browser"
---

## Worker overview

Added in v1.0.0

Also includes exports from [`@effect/platform/Worker`](https://effect-ts.github.io/platform/platform/Worker.ts.html).

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [makePool](#makepool)
  - [makePoolLayer](#makepoollayer)
  - [makePoolSerialized](#makepoolserialized)
  - [makePoolSerializedLayer](#makepoolserializedlayer)
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
  options: Worker.WorkerPool.Options<I, Worker | SharedWorker>
) => Effect.Effect<Worker.WorkerManager | Scope.Scope, never, Worker.WorkerPool<I, E, O>>
```

Added in v1.0.0

## makePoolLayer

**Signature**

```ts
export declare const makePoolLayer: <Tag, I, E, O>(
  tag: Context.Tag<Tag, Worker.WorkerPool<I, E, O>>,
  options: Worker.WorkerPool.Options<I, Worker | SharedWorker>
) => Layer.Layer<never, never, Tag>
```

Added in v1.0.0

## makePoolSerialized

**Signature**

```ts
export declare const makePoolSerialized: <I extends Schema.TaggedRequest.Any>(
  options: Worker.SerializedWorkerPool.Options<I, Worker | SharedWorker>
) => Effect.Effect<Worker.WorkerManager | Scope.Scope, never, Worker.SerializedWorkerPool<I>>
```

Added in v1.0.0

## makePoolSerializedLayer

**Signature**

```ts
export declare const makePoolSerializedLayer: <Tag, I extends Schema.TaggedRequest.Any>(
  tag: Context.Tag<Tag, Worker.SerializedWorkerPool<I>>,
  options: Worker.SerializedWorkerPool.Options<I, Worker | SharedWorker>
) => Layer.Layer<never, never, Tag>
```

Added in v1.0.0

# exports

## From "@effect/platform/Worker"

Re-exports all named exports from the "@effect/platform/Worker" module.

**Signature**

```ts
export * from "@effect/platform/Worker"
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
