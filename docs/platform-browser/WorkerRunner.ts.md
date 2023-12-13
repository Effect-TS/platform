---
title: WorkerRunner.ts
nav_order: 11
parent: "@effect/platform-browser"
---

## WorkerRunner overview

Added in v1.0.0

Also includes exports from [`@effect/platform/WorkerRunner`](https://effect-ts.github.io/platform/platform/WorkerRunner.ts.html).

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
  - [makeSerialized](#makeserialized)
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

## makeSerialized

**Signature**

```ts
export declare const makeSerialized: <
  I,
  A extends Schema.TaggedRequest.Any,
  Handlers extends {
    readonly [K in A["_tag"]]: Extract<A, { readonly _tag: K }> extends Serializable.SerializableWithResult<
      infer _IS,
      infer S,
      infer _IE,
      infer E,
      infer _IO,
      infer O
    >
      ? (_: S) => Stream.Stream<any, E, O> | Effect.Effect<any, E, O>
      : never
  }
>(
  schema: Schema.Schema<I, A>,
  handlers: Handlers
) => Effect.Effect<
  Scope.Scope | (ReturnType<Handlers[keyof Handlers]> extends Stream.Stream<infer R, infer _E, infer _A> ? R : never),
  WorkerError,
  never
>
```

Added in v1.0.0

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
export declare const layer: Layer.Layer<never, never, Runner.PlatformRunner>
```

Added in v1.0.0
