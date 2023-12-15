---
title: WorkerRunner.ts
nav_order: 21
parent: "@effect/platform-bun"
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
) => Layer.Layer<
  ReturnType<Handlers[keyof Handlers]> extends Stream.Stream<infer R, infer _E, infer _A> ? R : never,
  WorkerError,
  never
>
```

Added in v1.0.0
