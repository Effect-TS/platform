---
title: Http/Middleware.ts
nav_order: 16
parent: "@effect/platform"
---

## Middleware overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [compose](#compose)
- [constructors](#constructors)
  - [logger](#logger)
  - [loggerTracer](#loggertracer)
  - [make](#make)
  - [tracer](#tracer)
  - [xForwardedHeaders](#xforwardedheaders)
- [models](#models)
  - [Middleware (interface)](#middleware-interface)

---

# combinators

## compose

**Signature**

```ts
export declare const compose: {
  <B extends App.Default<any, any>, C extends App.Default<any, any>>(that: (b: B) => C): <
    A extends App.Default<any, any>
  >(
    self: (a: A) => B
  ) => (a: A) => C
  <A extends App.Default<any, any>, B extends App.Default<any, any>, C extends App.Default<any, any>>(
    self: (a: A) => B,
    that: (b: B) => C
  ): (a: A) => C
}
```

Added in v1.0.0

# constructors

## logger

**Signature**

```ts
export declare const logger: <R, E>(httpApp: App.Default<R, E>) => App.Default<R, E>
```

Added in v1.0.0

## loggerTracer

**Signature**

```ts
export declare const loggerTracer: <R, E>(httpApp: App.Default<R, E>) => App.Default<R, E>
```

Added in v1.0.0

## make

**Signature**

```ts
export declare const make: <M extends Middleware>(middleware: M) => M
```

Added in v1.0.0

## tracer

**Signature**

```ts
export declare const tracer: <R, E>(httpApp: App.Default<R, E>) => App.Default<R, E>
```

Added in v1.0.0

## xForwardedHeaders

**Signature**

```ts
export declare const xForwardedHeaders: <R, E>(httpApp: App.Default<R, E>) => App.Default<R, E>
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
