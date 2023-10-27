---
title: WorkerRunner.ts
nav_order: 19
parent: "@effect/platform-bun"
---

## WorkerRunner overview

Added in v1.0.0

Also includes exports from [`@effect/platform/WorkerRunner`](https://effect-ts.github.io/platform/platform/WorkerRunner.ts.html).

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [exports](#exports)
  - [From "@effect/platform/WorkerRunner"](#from-effectplatformworkerrunner)
- [layers](#layers)
  - [layer](#layer)

---

# constructors

## make

**Signature**

```ts
export declare const make: <I, R, E, O>(
  process: (request: I) => Stream.Stream<R, E, O>,
  options?: Runner.Runner.Options<O> | undefined
) => Effect.Effect<R | Scope.Scope, WorkerError, void>
```

Added in v1.0.0

# exports

## From "@effect/platform/WorkerRunner"

Re-exports all named exports from the "@effect/platform/WorkerRunner" module.

**Signature**

```ts
export * from '@effect/platform/WorkerRunner'
```

Added in v1.0.0

# layers

## layer

**Signature**

```ts
export declare const layer: Layer.Layer<never, never, Runner.PlatformRunner>
```

Added in v1.0.0
