---
title: Http/Middleware.ts
nav_order: 17
parent: "@effect/platform"
---

## Middleware overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [logger](#logger)
  - [make](#make)
  - [xForwardedHeaders](#xforwardedheaders)
- [fiber refs](#fiber-refs)
  - [currentTracerDisabledWhen](#currenttracerdisabledwhen)
  - [loggerDisabled](#loggerdisabled)
  - [withLoggerDisabled](#withloggerdisabled)
  - [withTracerDisabledWhen](#withtracerdisabledwhen)
- [models](#models)
  - [Middleware (interface)](#middleware-interface)
- [utils](#utils)
  - [Middleware (namespace)](#middleware-namespace)
    - [Applied (interface)](#applied-interface)

---

# constructors

## logger

**Signature**

```ts
export declare const logger: <R, E>(httpApp: App.Default<R, E>) => App.Default<R, E>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <M extends Middleware>(middleware: M) => M
```

Added in v1.0.0

## xForwardedHeaders

**Signature**

```ts
export declare const xForwardedHeaders: <R, E>(httpApp: App.Default<R, E>) => App.Default<R, E>
```

Added in v1.0.0

# fiber refs

## currentTracerDisabledWhen

**Signature**

```ts
export declare const currentTracerDisabledWhen: FiberRef.FiberRef<Predicate.Predicate<ServerRequest.ServerRequest>>
```

Added in v1.0.0

## loggerDisabled

**Signature**

```ts
export declare const loggerDisabled: FiberRef.FiberRef<boolean>
```

Added in v1.0.0

## withLoggerDisabled

**Signature**

```ts
export declare const withLoggerDisabled: <R, E, A>(self: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>
```

Added in v1.0.0

## withTracerDisabledWhen

**Signature**

```ts
export declare const withTracerDisabledWhen: {
  (
    predicate: Predicate.Predicate<ServerRequest.ServerRequest>
  ): <R, E, A>(effect: Effect.Effect<R, E, A>) => Effect.Effect<R, E, A>
  <R, E, A>(
    effect: Effect.Effect<R, E, A>,
    predicate: Predicate.Predicate<ServerRequest.ServerRequest>
  ): Effect.Effect<R, E, A>
}
```

Added in v1.0.0

# models

## Middleware (interface)

**Signature**

```ts
export interface Middleware {
  <R, E>(self: App.Default<R, E>): App.Default<any, any>
}
```

Added in v1.0.0

# utils

## Middleware (namespace)

Added in v1.0.0

### Applied (interface)

**Signature**

```ts
export interface Applied<R, E, A extends App.Default<any, any>> {
  (self: App.Default<R, E>): A
}
```

Added in v1.0.0
