---
title: Http/Middleware.ts
nav_order: 17
parent: "@effect/platform"
---

## Middleware overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [apply](#apply)
  - [compose](#compose)
- [constructors](#constructors)
  - [fromEffect](#fromeffect)
  - [logger](#logger)
  - [loggerTracer](#loggertracer)
  - [tracer](#tracer)
- [models](#models)
  - [Middleware (interface)](#middleware-interface)

---

# combinators

## apply

**Signature**

```ts
export declare const apply: {
  <R2, E, EIn extends E, EOut>(middleware: Middleware<R2, EIn, EOut>): <R>(
    httpApp: App.Default<R, E>
  ) => App.Default<R2 | R, unknown extends EOut ? E : EOut>
  <R, E, R2, EIn extends E, EOut>(httpApp: App.Default<R, E>, middleware: Middleware<R2, EIn, EOut>): App.Default<
    R | R2,
    unknown extends EOut ? E : EOut
  >
}
```

Added in v1.0.0

## compose

**Signature**

```ts
export declare const compose: {
  <R2, EOut, EIn2 extends EOut, EOut2>(that: Middleware<R2, EIn2, EOut2>): <R, EIn>(
    self: Middleware<R, EIn, EOut>
  ) => Middleware<R2 | R, EIn, EOut2>
  <R, EIn, EOut, R2, EIn2 extends EOut, EOut2>(
    self: Middleware<R, EIn, EOut>,
    that: Middleware<R2, EIn2, EOut2>
  ): Middleware<R | R2, EIn, EOut2>
}
```

Added in v1.0.0

# constructors

## fromEffect

**Signature**

```ts
export declare const fromEffect: <R, EIn, EOut>(
  f: (
    httpApp: App.Default<never, EIn>,
    request: ServerRequest.ServerRequest
  ) => Effect.Effect<R, EOut, ServerResponse.ServerResponse>
) => Middleware<R, EIn, EOut>
```

Added in v1.0.0

## logger

**Signature**

```ts
export declare const logger: Middleware<never, unknown, unknown>
```

Added in v1.0.0

## loggerTracer

**Signature**

```ts
export declare const loggerTracer: Middleware<never, unknown, unknown>
```

Added in v1.0.0

## tracer

**Signature**

```ts
export declare const tracer: Middleware<never, unknown, unknown>
```

Added in v1.0.0

# models

## Middleware (interface)

**Signature**

```ts
export interface Middleware<R, EIn, EOut> {
  (self: App.Default<never, EIn>): App.Default<R, EOut>
}
```

Added in v1.0.0
