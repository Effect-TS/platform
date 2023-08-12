---
title: Http/App.ts
nav_order: 7
parent: "@effect/platform"
---

## App overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [compose](#compose)
  - [map](#map)
  - [mapEffect](#mapeffect)
  - [mapRequest](#maprequest)
  - [mapRequestEffect](#maprequesteffect)
  - [tap](#tap)
  - [tapRequest](#taprequest)
- [constructors](#constructors)
  - [make](#make)
  - [makeDefault](#makedefault)
- [error handling](#error-handling)
  - [catchAll](#catchall)
  - [catchAllCause](#catchallcause)
  - [catchTag](#catchtag)
  - [catchTags](#catchtags)
- [models](#models)
  - [Default (type alias)](#default-type-alias)
  - [HttpApp (interface)](#httpapp-interface)
- [refinements](#refinements)
  - [isHttpApp](#ishttpapp)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# combinators

## compose

**Signature**

```ts
export declare const compose: {
  <R2, E2, Out, InX extends Out, Out2>(that: HttpApp<R2, E2, InX, Out2>): <R, E, In>(
    self: HttpApp<R, E, In, Out>
  ) => HttpApp<R2 | R, E2 | E, In, Out2>
  <R, E, In, Out, R2, E2, InX extends Out, Out2>(
    self: HttpApp<R, E, In, Out>,
    that: HttpApp<R2, E2, InX, Out2>
  ): HttpApp<R | R2, E | E2, In, Out2>
}
```

Added in v1.0.0

## map

**Signature**

```ts
export declare const map: {
  <A, In, B>(f: (a: A, request: In) => B): <R, E>(self: HttpApp<R, E, In, A>) => HttpApp<R, E, In, B>
  <R, E, In, A, B>(self: HttpApp<R, E, In, A>, f: (a: A, request: In) => B): HttpApp<R, E, In, B>
}
```

Added in v1.0.0

## mapEffect

**Signature**

```ts
export declare const mapEffect: {
  <A, In, R2, E1, B>(f: (a: A, request: In) => Effect.Effect<R2, E1, B>): <R, E>(
    self: HttpApp<R, E, In, A>
  ) => HttpApp<R2 | R, E1 | E, In, B>
  <R, E, In, A, R2, E1, B>(self: HttpApp<R, E, In, A>, f: (a: A, request: In) => Effect.Effect<R2, E1, B>): HttpApp<
    R | R2,
    E | E1,
    In,
    B
  >
}
```

Added in v1.0.0

## mapRequest

**Signature**

```ts
export declare const mapRequest: {
  <In, In2>(f: (request: In2) => In): <R, E, A>(self: HttpApp<R, E, In, A>) => HttpApp<R, E, In2, A>
  <R, E, In, A, In2>(self: HttpApp<R, E, In, A>, f: (request: In2) => In): HttpApp<R, E, In2, A>
}
```

Added in v1.0.0

## mapRequestEffect

**Signature**

```ts
export declare const mapRequestEffect: {
  <In2, R2, E1, In>(f: (request: In2) => Effect.Effect<R2, E1, In>): <R, E, A>(
    self: HttpApp<R, E, In, A>
  ) => HttpApp<R2 | R, E1 | E, In2, A>
  <R, E, In, A, In2, R2, E1>(self: HttpApp<R, E, In, A>, f: (request: In2) => Effect.Effect<R2, E1, In>): HttpApp<
    R | R2,
    E | E1,
    In2,
    A
  >
}
```

Added in v1.0.0

## tap

**Signature**

```ts
export declare const tap: {
  <A, In, R2, E1, _>(f: (a: A, request: In) => Effect.Effect<R2, E1, _>): <R, E>(
    self: HttpApp<R, E, In, A>
  ) => HttpApp<R2 | R, E1 | E, In, A>
  <R, E, In, A, R2, E1, _>(self: HttpApp<R, E, In, A>, f: (a: A, request: In) => Effect.Effect<R2, E1, _>): HttpApp<
    R | R2,
    E | E1,
    In,
    A
  >
}
```

Added in v1.0.0

## tapRequest

**Signature**

```ts
export declare const tapRequest: {
  <In, R2, E1, _>(f: (request: In) => Effect.Effect<R2, E1, _>): <R, E, A>(
    self: HttpApp<R, E, In, A>
  ) => HttpApp<R2 | R, E1 | E, In, A>
  <R, E, In, A, R2, E1, _>(self: HttpApp<R, E, In, A>, f: (request: In) => Effect.Effect<R2, E1, _>): HttpApp<
    R | R2,
    E | E1,
    In,
    A
  >
}
```

Added in v1.0.0

# constructors

## make

**Signature**

```ts
export declare const make: <R, E, In, Out>(f: (req: In) => Effect.Effect<R, E, Out>) => HttpApp<R, E, In, Out>
```

Added in v1.0.0

## makeDefault

**Signature**

```ts
export declare const makeDefault: <R, E>(
  f: (request: ServerRequest.ServerRequest) => Effect.Effect<R, E, ServerResponse.ServerResponse>
) => Default<R, E>
```

Added in v1.0.0

# error handling

## catchAll

**Signature**

```ts
export declare const catchAll: {
  <E, In, InX extends In, R2, E2, A2>(f: (e: E, request: InX) => Effect.Effect<R2, E2, A2>): <R, In, A>(
    self: HttpApp<R, E, In, A>
  ) => HttpApp<R2 | R, E2, In, A2 | A>
  <R, E, In, A, InX extends In, R2, E2, A2>(
    self: HttpApp<R, E, In, A>,
    f: (e: E, request: InX) => Effect.Effect<R2, E2, A2>
  ): HttpApp<R | R2, E2, In, A | A2>
}
```

Added in v1.0.0

## catchAllCause

**Signature**

```ts
export declare const catchAllCause: {
  <E, In, InX extends In, R2, E2, A2>(f: (e: Cause.Cause<E>, request: InX) => Effect.Effect<R2, E2, A2>): <R, In, A>(
    self: HttpApp<R, E, In, A>
  ) => HttpApp<R2 | R, E2, In, A2 | A>
  <R, E, In, A, InX extends In, R2, E2, A2>(
    self: HttpApp<R, E, In, A>,
    f: (e: Cause.Cause<E>, request: InX) => Effect.Effect<R2, E2, A2>
  ): HttpApp<R | R2, E2, In, A | A2>
}
```

Added in v1.0.0

## catchTag

**Signature**

```ts
export declare const catchTag: {
  <E extends { _tag: string }, K extends E['_tag'] & string, In, InX extends In, R1, E1, A1>(
    tag: K,
    f: (e: Extract<E, { _tag: K }>, request: InX) => Effect.Effect<R1, E1, A1>
  ): <R, A>(self: HttpApp<R, E, In, A>) => HttpApp<R1 | R, E1 | Exclude<E, { _tag: K }>, In, A1 | A>
  <R, E extends { _tag: string }, In, A, K extends E['_tag'] & string, InX extends In, E1, R1, A1>(
    self: HttpApp<R, E, In, A>,
    tag: K,
    f: (e: Extract<E, { _tag: K }>, request: InX) => Effect.Effect<R1, E1, A1>
  ): HttpApp<R | R1, E1 | Exclude<E, { _tag: K }>, In, A | A1>
}
```

Added in v1.0.0

## catchTags

**Signature**

```ts
export declare const catchTags: {
  <
    E extends { _tag: string },
    Cases extends { [K in E['_tag']]+?: ((error: Extract<E, { _tag: K }>) => Effect.Effect<any, any, any>) | undefined }
  >(
    cases: Cases
  ): <R, In, A>(
    self: HttpApp<R, E, In, A>
  ) => HttpApp<
    | R
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<infer R, any, any> ? R : never
      }[keyof Cases],
    | Exclude<E, { _tag: keyof Cases }>
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, infer E, any> ? E : never
      }[keyof Cases],
    In,
    | A
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, any, infer A> ? A : never
      }[keyof Cases]
  >
  <
    R,
    E extends { _tag: string },
    In,
    A,
    Cases extends { [K in E['_tag']]+?: ((error: Extract<E, { _tag: K }>) => Effect.Effect<any, any, any>) | undefined }
  >(
    self: HttpApp<R, E, In, A>,
    cases: Cases
  ): HttpApp<
    | R
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<infer R, any, any> ? R : never
      }[keyof Cases],
    | Exclude<E, { _tag: keyof Cases }>
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, infer E, any> ? E : never
      }[keyof Cases],
    In,
    | A
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, any, infer A> ? A : never
      }[keyof Cases]
  >
}
```

Added in v1.0.0

# models

## Default (type alias)

**Signature**

```ts
export type Default<R, E> = HttpApp<R, E, ServerRequest.ServerRequest, ServerResponse.ServerResponse>
```

Added in v1.0.0

## HttpApp (interface)

**Signature**

```ts
export interface HttpApp<R, E, In, Out> extends Pipeable {
  readonly [TypeId]: TypeId
  (request: In): Effect.Effect<R, E, Out>
}
```

Added in v1.0.0

# refinements

## isHttpApp

**Signature**

```ts
export declare const isHttpApp: (u: unknown) => u is HttpApp<unknown, unknown, unknown, unknown>
```

Added in v1.0.0

# type ids

## TypeId

**Signature**

```ts
export declare const TypeId: typeof TypeId
```

Added in v1.0.0

## TypeId (type alias)

**Signature**

```ts
export type TypeId = typeof TypeId
```

Added in v1.0.0
