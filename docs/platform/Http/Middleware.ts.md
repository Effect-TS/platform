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
  - [b3Response](#b3response)
  - [logger](#logger)
  - [loggerTracer](#loggertracer)
  - [make](#make)
  - [tracer](#tracer)
  - [xForwardedHeaders](#xforwardedheaders)
- [models](#models)
  - [Middleware (interface)](#middleware-interface)
- [utils](#utils)
  - [Middleware (namespace)](#middleware-namespace)
    - [Applied (interface)](#applied-interface)

---

# constructors

## b3Response

**Signature**

```ts
export declare const b3Response: <R, E>(httpApp: App.Default<R, E>) => App.Default<R, E>
```

Added in v1.0.0

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
