---
title: Worker.ts
nav_order: 31
parent: "@effect/platform"
---

## Worker overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [makeManager](#makemanager)
  - [makePool](#makepool)
  - [makePoolLayer](#makepoollayer)
- [layers](#layers)
  - [layerManager](#layermanager)
- [models](#models)
  - [BackingWorker (interface)](#backingworker-interface)
  - [BackingWorker (namespace)](#backingworker-namespace)
    - [Message (type alias)](#message-type-alias)
  - [PlatformWorker (interface)](#platformworker-interface)
  - [Worker (interface)](#worker-interface)
  - [Worker (namespace)](#worker-namespace)
    - [Options (interface)](#options-interface)
    - [Request (type alias)](#request-type-alias)
    - [Response (type alias)](#response-type-alias)
  - [WorkerManager (interface)](#workermanager-interface)
  - [WorkerPool (interface)](#workerpool-interface)
  - [WorkerPool (namespace)](#workerpool-namespace)
    - [Options (type alias)](#options-type-alias)
  - [WorkerQueue (interface)](#workerqueue-interface)
- [tags](#tags)
  - [PlatformWorker](#platformworker)
  - [WorkerManager](#workermanager)
- [type ids](#type-ids)
  - [PlatformWorkerTypeId](#platformworkertypeid)
  - [PlatformWorkerTypeId (type alias)](#platformworkertypeid-type-alias)
  - [WorkerManagerTypeId](#workermanagertypeid)
  - [WorkerManagerTypeId (type alias)](#workermanagertypeid-type-alias)

---

# constructors

## makeManager

**Signature**

```ts
export declare const makeManager: Effect.Effect<PlatformWorker, never, WorkerManager>
```

Added in v1.0.0

## makePool

**Signature**

```ts
export declare const makePool: <W>() => <I, E, O>(
  options: WorkerPool.Options<I, W>
) => Effect.Effect<Scope.Scope | WorkerManager, never, WorkerPool<I, E, O>>
```

Added in v1.0.0

## makePoolLayer

**Signature**

```ts
export declare const makePoolLayer: <W>(
  managerLayer: Layer.Layer<never, never, WorkerManager>
) => <Tag, I, E, O>(
  tag: Context.Tag<Tag, WorkerPool<I, E, O>>,
  options: WorkerPool.Options<I, W>
) => Layer.Layer<never, never, Tag>
```

Added in v1.0.0

# layers

## layerManager

**Signature**

```ts
export declare const layerManager: Layer.Layer<PlatformWorker, never, WorkerManager>
```

Added in v1.0.0

# models

## BackingWorker (interface)

**Signature**

```ts
export interface BackingWorker<I, O> {
  readonly join: Effect.Effect<never, WorkerError, never>
  readonly send: (message: I, transfers?: ReadonlyArray<unknown>) => Effect.Effect<never, never, void>
  readonly queue: Queue.Dequeue<BackingWorker.Message<O>>
}
```

Added in v1.0.0

## BackingWorker (namespace)

Added in v1.0.0

### Message (type alias)

**Signature**

```ts
export type Message<O> = readonly [ready: 0] | readonly [data: 1, O]
```

Added in v1.0.0

## PlatformWorker (interface)

**Signature**

```ts
export interface PlatformWorker {
  readonly [PlatformWorkerTypeId]: PlatformWorkerTypeId
  readonly spawn: <I, O>(worker: unknown) => Effect.Effect<Scope.Scope, WorkerError, BackingWorker<I, O>>
}
```

Added in v1.0.0

## Worker (interface)

**Signature**

```ts
export interface Worker<I, E, O> {
  readonly id: number
  readonly join: Effect.Effect<never, WorkerError, never>
  readonly execute: (message: I) => Stream.Stream<never, E, O>
  readonly executeEffect: (message: I) => Effect.Effect<never, E, O>
}
```

Added in v1.0.0

## Worker (namespace)

Added in v1.0.0

### Options (interface)

**Signature**

```ts
export interface Options<I, W = unknown> {
  readonly spawn: (id: number) => W
  readonly transfers?: (message: I) => ReadonlyArray<unknown>
  readonly permits?: number
  readonly queue?: WorkerQueue<I>
}
```

Added in v1.0.0

### Request (type alias)

**Signature**

```ts
export type Request<I> = readonly [id: number, data: 0, I] | readonly [id: number, interrupt: 1]
```

Added in v1.0.0

### Response (type alias)

**Signature**

```ts
export type Response<E, O> =
  | readonly [id: number, data: 0, O]
  | readonly [id: number, end: 1]
  | readonly [id: number, end: 1, O]
  | readonly [id: number, error: 2, E]
  | readonly [id: number, defect: 3, unknown]
```

Added in v1.0.0

## WorkerManager (interface)

**Signature**

```ts
export interface WorkerManager {
  readonly [WorkerManagerTypeId]: WorkerManagerTypeId
  readonly spawn: <I, E, O>(options: Worker.Options<I>) => Effect.Effect<Scope.Scope, WorkerError, Worker<I, E, O>>
}
```

Added in v1.0.0

## WorkerPool (interface)

**Signature**

```ts
export interface WorkerPool<I, E, O> {
  readonly backing: Pool.Pool<WorkerError, Worker<I, E, O>>
  readonly execute: (message: I) => Stream.Stream<never, E | WorkerError, O>
  readonly executeEffect: (message: I) => Effect.Effect<never, E | WorkerError, O>
}
```

Added in v1.0.0

## WorkerPool (namespace)

Added in v1.0.0

### Options (type alias)

**Signature**

```ts
export type Options<I, W = unknown> = Worker.Options<I, W> &
  (
    | {
        readonly size: number
      }
    | {
        readonly minSize: number
        readonly maxSize: number
        readonly timeToLive: Duration.DurationInput
      }
  )
```

Added in v1.0.0

## WorkerQueue (interface)

**Signature**

```ts
export interface WorkerQueue<I> {
  readonly offer: (id: number, item: I) => Effect.Effect<never, never, void>
  readonly take: Effect.Effect<never, never, readonly [id: number, item: I]>
  readonly shutdown: Effect.Effect<never, never, void>
}
```

Added in v1.0.0

# tags

## PlatformWorker

**Signature**

```ts
export declare const PlatformWorker: Context.Tag<PlatformWorker, PlatformWorker>
```

Added in v1.0.0

## WorkerManager

**Signature**

```ts
export declare const WorkerManager: Context.Tag<WorkerManager, WorkerManager>
```

Added in v1.0.0

# type ids

## PlatformWorkerTypeId

**Signature**

```ts
export declare const PlatformWorkerTypeId: typeof PlatformWorkerTypeId
```

Added in v1.0.0

## PlatformWorkerTypeId (type alias)

**Signature**

```ts
export type PlatformWorkerTypeId = typeof PlatformWorkerTypeId
```

Added in v1.0.0

## WorkerManagerTypeId

**Signature**

```ts
export declare const WorkerManagerTypeId: typeof WorkerManagerTypeId
```

Added in v1.0.0

## WorkerManagerTypeId (type alias)

**Signature**

```ts
export type WorkerManagerTypeId = typeof WorkerManagerTypeId
```

Added in v1.0.0
