---
title: WorkerRunner.ts
nav_order: 35
parent: "@effect/platform"
---

## WorkerRunner overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [BackingRunner (interface)](#backingrunner-interface)
  - [BackingRunner (namespace)](#backingrunner-namespace)
    - [Message (type alias)](#message-type-alias)
  - [PlatformRunner (interface)](#platformrunner-interface)
  - [Runner (namespace)](#runner-namespace)
    - [Options (interface)](#options-interface)
- [tags](#tags)
  - [PlatformRunner](#platformrunner)
- [type ids](#type-ids)
  - [PlatformRunnerTypeId](#platformrunnertypeid)
  - [PlatformRunnerTypeId (type alias)](#platformrunnertypeid-type-alias)

---

# constructors

## make

**Signature**

```ts
export declare const make: <I, R, E, O>(
  process: (request: I) => Stream.Stream<R, E, O> | Effect.Effect<R, E, O>,
  options?: Runner.Options<O> | undefined
) => Effect.Effect<PlatformRunner | R | Scope.Scope, WorkerError, never>
```

Added in v1.0.0

# models

## BackingRunner (interface)

**Signature**

```ts
export interface BackingRunner<I, O> {
  readonly fiber: Fiber.Fiber<WorkerError, never>
  readonly queue: Queue.Dequeue<I>
  readonly send: (message: O, transfers?: ReadonlyArray<unknown>) => Effect.Effect<never, never, void>
}
```

Added in v1.0.0

## BackingRunner (namespace)

Added in v1.0.0

### Message (type alias)

**Signature**

```ts
export type Message<I> = readonly [request: 0, I] | readonly [close: 1]
```

Added in v1.0.0

## PlatformRunner (interface)

**Signature**

```ts
export interface PlatformRunner {
  readonly [PlatformRunnerTypeId]: PlatformRunnerTypeId
  readonly start: <I, O>() => Effect.Effect<Scope.Scope, WorkerError, BackingRunner<I, O>>
}
```

Added in v1.0.0

## Runner (namespace)

Added in v1.0.0

### Options (interface)

**Signature**

```ts
export interface Options<O> {
  readonly encode?: (message: O) => unknown
  readonly transfers?: (message: O) => ReadonlyArray<unknown>
}
```

Added in v1.0.0

# tags

## PlatformRunner

**Signature**

```ts
export declare const PlatformRunner: Context.Tag<PlatformRunner, PlatformRunner>
```

Added in v1.0.0

# type ids

## PlatformRunnerTypeId

**Signature**

```ts
export declare const PlatformRunnerTypeId: typeof PlatformRunnerTypeId
```

Added in v1.0.0

## PlatformRunnerTypeId (type alias)

**Signature**

```ts
export type PlatformRunnerTypeId = typeof PlatformRunnerTypeId
```

Added in v1.0.0
