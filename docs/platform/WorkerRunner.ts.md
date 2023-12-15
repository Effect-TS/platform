---
title: WorkerRunner.ts
nav_order: 34
parent: "@effect/platform"
---

## WorkerRunner overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
  - [makeSerialized](#makeserialized)
- [layers](#layers)
  - [layer](#layer)
  - [layerSerialized](#layerserialized)
- [models](#models)
  - [BackingRunner (interface)](#backingrunner-interface)
  - [BackingRunner (namespace)](#backingrunner-namespace)
    - [Message (type alias)](#message-type-alias)
  - [PlatformRunner (interface)](#platformrunner-interface)
  - [Runner (namespace)](#runner-namespace)
    - [Options (interface)](#options-interface)
  - [SerializedRunner (namespace)](#serializedrunner-namespace)
    - [Handlers (type alias)](#handlers-type-alias)
    - [HandlersContext (type alias)](#handlerscontext-type-alias)
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
  options?: Runner.Options<I, E, O> | undefined
) => Effect.Effect<PlatformRunner | R | Scope.Scope, WorkerError, void>
```

Added in v1.0.0

## makeSerialized

**Signature**

```ts
export declare const makeSerialized: <
  I,
  A extends Schema.TaggedRequest.Any,
  const Handlers extends SerializedRunner.Handlers<A>
>(
  schema: Schema.Schema<I, A>,
  handlers: Handlers
) => Effect.Effect<PlatformRunner | Scope.Scope | SerializedRunner.HandlersContext<Handlers>, WorkerError, void>
```

Added in v1.0.0

# layers

## layer

**Signature**

```ts
export declare const layer: <I, R, E, O>(
  process: (request: I) => Stream.Stream<R, E, O> | Effect.Effect<R, E, O>,
  options?: Runner.Options<I, E, O> | undefined
) => Layer.Layer<PlatformRunner | R, WorkerError, never>
```

Added in v1.0.0

## layerSerialized

**Signature**

```ts
export declare const layerSerialized: <
  I,
  A extends Schema.TaggedRequest.Any,
  const Handlers extends SerializedRunner.Handlers<A>
>(
  schema: Schema.Schema<I, A>,
  handlers: Handlers
) => Layer.Layer<PlatformRunner | SerializedRunner.HandlersContext<Handlers>, WorkerError, never>
```

Added in v1.0.0

# models

## BackingRunner (interface)

**Signature**

```ts
export interface BackingRunner<I, O> {
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
export interface Options<I, E, O> {
  readonly decode?: (message: unknown) => Effect.Effect<never, WorkerError, I>
  readonly encodeOutput?: (request: I, message: O) => Effect.Effect<never, WorkerError, unknown>
  readonly encodeError?: (request: I, error: E) => Effect.Effect<never, WorkerError, unknown>
  readonly transfers?: (message: O | E) => ReadonlyArray<unknown>
}
```

Added in v1.0.0

## SerializedRunner (namespace)

Added in v1.0.0

### Handlers (type alias)

**Signature**

```ts
export type Handlers<A extends Schema.TaggedRequest.Any> = {
  readonly [K in A["_tag"]]: Extract<A, { readonly _tag: K }> extends Serializable.SerializableWithResult<
    infer _IS,
    infer S,
    infer _IE,
    infer E,
    infer _IO,
    infer O
  >
    ? (
        _: S
      ) => Stream.Stream<any, E, O> | Effect.Effect<any, E, O> | Layer.Layer<any, E, any> | Layer.Layer<any, E, never>
    : never
}
```

Added in v1.0.0

### HandlersContext (type alias)

**Signature**

```ts
export type HandlersContext<Handlers extends Record<string, (...args: ReadonlyArray<any>) => any>> =
  | Exclude<
      {
        [K in keyof Handlers]: ReturnType<Handlers[K]> extends Stream.Stream<infer R, infer _E, infer _A> ? R : never
      }[keyof Handlers],
      {
        [K in keyof Handlers]: ReturnType<Handlers[K]> extends Layer.Layer<infer _R, infer _E, infer A> ? A : never
      }[keyof Handlers]
    >
  | {
      [K in keyof Handlers]: ReturnType<Handlers[K]> extends Layer.Layer<infer R, infer _E, infer _A> ? R : never
    }[keyof Handlers]
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
