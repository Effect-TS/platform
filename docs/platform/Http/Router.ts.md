---
title: Http/Router.ts
nav_order: 19
parent: "@effect/platform"
---

## Router overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [catchAll](#catchall)
  - [catchAllCause](#catchallcause)
  - [catchTag](#catchtag)
  - [catchTags](#catchtags)
  - [concat](#concat)
  - [prefixAll](#prefixall)
  - [provideService](#provideservice)
  - [provideServiceEffect](#provideserviceeffect)
  - [use](#use)
- [constructors](#constructors)
  - [empty](#empty)
  - [fromIterable](#fromiterable)
  - [makeRoute](#makeroute)
- [models](#models)
  - [Route (interface)](#route-interface)
  - [RouteContext (interface)](#routecontext-interface)
  - [Router (interface)](#router-interface)
- [route context](#route-context)
  - [RouteContext](#routecontext)
  - [params](#params)
  - [schemaParams](#schemaparams)
  - [searchParams](#searchparams)
- [routing](#routing)
  - [all](#all)
  - [del](#del)
  - [get](#get)
  - [head](#head)
  - [mount](#mount)
  - [mountApp](#mountapp)
  - [options](#options)
  - [patch](#patch)
  - [post](#post)
  - [put](#put)
  - [route](#route)
- [type ids](#type-ids)
  - [RouteContextTypeId](#routecontexttypeid)
  - [RouteContextTypeId (type alias)](#routecontexttypeid-type-alias)
  - [RouteTypeId](#routetypeid)
  - [RouteTypeId (type alias)](#routetypeid-type-alias)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
- [utils](#utils)
  - [Route (namespace)](#route-namespace)
    - [Handler (type alias)](#handler-type-alias)
  - [Router (namespace)](#router-namespace)
    - [ExcludeProvided (type alias)](#excludeprovided-type-alias)

---

# combinators

## catchAll

**Signature**

```ts
export declare const catchAll: {
  <E, R2, E2>(f: (e: E) => Route.Handler<R2, E2>): <R>(
    self: Router<R, E>
  ) => Router<
    Exclude<R2, ServerRequest.ServerRequest | RouteContext> | Exclude<R, ServerRequest.ServerRequest | RouteContext>,
    E2
  >
  <R, E, R2, E2>(self: Router<R, E>, f: (e: E) => Route.Handler<R2, E2>): Router<
    Exclude<R, ServerRequest.ServerRequest | RouteContext> | Exclude<R2, ServerRequest.ServerRequest | RouteContext>,
    E2
  >
}
```

Added in v1.0.0

## catchAllCause

**Signature**

```ts
export declare const catchAllCause: {
  <E, R2, E2>(f: (e: Cause.Cause<E>) => Route.Handler<R2, E2>): <R>(
    self: Router<R, E>
  ) => Router<
    Exclude<R2, ServerRequest.ServerRequest | RouteContext> | Exclude<R, ServerRequest.ServerRequest | RouteContext>,
    E2
  >
  <R, E, R2, E2>(self: Router<R, E>, f: (e: Cause.Cause<E>) => Route.Handler<R2, E2>): Router<
    Exclude<R, ServerRequest.ServerRequest | RouteContext> | Exclude<R2, ServerRequest.ServerRequest | RouteContext>,
    E2
  >
}
```

Added in v1.0.0

## catchTag

**Signature**

```ts
export declare const catchTag: {
  <K extends E extends { _tag: string } ? E['_tag'] : never, E, R1, E1>(
    k: K,
    f: (e: Extract<E, { _tag: K }>) => Route.Handler<R1, E1>
  ): <R>(
    self: Router<R, E>
  ) => Router<
    Exclude<R1, ServerRequest.ServerRequest | RouteContext> | Exclude<R, ServerRequest.ServerRequest | RouteContext>,
    E1 | Exclude<E, { _tag: K }>
  >
  <R, E, K extends E extends { _tag: string } ? E['_tag'] : never, R1, E1>(
    self: Router<R, E>,
    k: K,
    f: (e: Extract<E, { _tag: K }>) => Route.Handler<R1, E1>
  ): Router<
    Exclude<R, ServerRequest.ServerRequest | RouteContext> | Exclude<R1, ServerRequest.ServerRequest | RouteContext>,
    E1 | Exclude<E, { _tag: K }>
  >
}
```

Added in v1.0.0

## catchTags

**Signature**

```ts
export declare const catchTags: {
  <
    E,
    Cases extends E extends { _tag: string }
      ? { [K in E['_tag']]+?: ((error: Extract<E, { _tag: K }>) => Route.Handler<any, any>) | undefined }
      : {}
  >(
    cases: Cases
  ): <R>(
    self: Router<R, E>
  ) => Router<
    | Exclude<R, ServerRequest.ServerRequest | RouteContext>
    | Exclude<
        {
          [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<infer R, any, any> ? R : never
        }[keyof Cases],
        ServerRequest.ServerRequest | RouteContext
      >,
    | Exclude<E, { _tag: keyof Cases }>
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, infer E, any> ? E : never
      }[keyof Cases]
  >
  <
    R,
    E,
    Cases extends E extends { _tag: string }
      ? { [K in E['_tag']]+?: ((error: Extract<E, { _tag: K }>) => Route.Handler<any, any>) | undefined }
      : {}
  >(
    self: Router<R, E>,
    cases: Cases
  ): Router<
    | Exclude<R, ServerRequest.ServerRequest | RouteContext>
    | Exclude<
        {
          [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<infer R, any, any> ? R : never
        }[keyof Cases],
        ServerRequest.ServerRequest | RouteContext
      >,
    | Exclude<E, { _tag: keyof Cases }>
    | {
        [K in keyof Cases]: Cases[K] extends (...args: Array<any>) => Effect.Effect<any, infer E, any> ? E : never
      }[keyof Cases]
  >
}
```

Added in v1.0.0

## concat

**Signature**

```ts
export declare const concat: {
  <R1, E1>(that: Router<R1, E1>): <R, E>(self: Router<R, E>) => Router<R1 | R, E1 | E>
  <R, E, R1, E1>(self: Router<R, E>, that: Router<R1, E1>): Router<R | R1, E | E1>
}
```

Added in v1.0.0

## prefixAll

**Signature**

```ts
export declare const prefixAll: {
  (prefix: string): <R, E>(self: Router<R, E>) => Router<R, E>
  <R, E>(self: Router<R, E>, prefix: string): Router<R, E>
}
```

Added in v1.0.0

## provideService

**Signature**

```ts
export declare const provideService: {
  <T extends Context.Tag<any, any>>(tag: T, service: Context.Tag.Service<T>): <R, E>(
    self: Router<R, E>
  ) => Router<Exclude<Exclude<R, Context.Tag.Identifier<T>>, ServerRequest.ServerRequest | RouteContext>, E>
  <R, E, T extends Context.Tag<any, any>>(self: Router<R, E>, tag: T, service: Context.Tag.Service<T>): Router<
    Exclude<Exclude<R, Context.Tag.Identifier<T>>, ServerRequest.ServerRequest | RouteContext>,
    E
  >
}
```

Added in v1.0.0

## provideServiceEffect

**Signature**

```ts
export declare const provideServiceEffect: {
  <T extends Context.Tag<any, any>, R1, E1>(tag: T, effect: Effect.Effect<R1, E1, Context.Tag.Service<T>>): <R, E>(
    self: Router<R, E>
  ) => Router<
    | Exclude<R1, ServerRequest.ServerRequest | RouteContext>
    | Exclude<Exclude<R, Context.Tag.Identifier<T>>, ServerRequest.ServerRequest | RouteContext>,
    E1 | E
  >
  <R, E, T extends Context.Tag<any, any>, R1, E1>(
    self: Router<R, E>,
    tag: T,
    effect: Effect.Effect<R1, E1, Context.Tag.Service<T>>
  ): Router<
    | Exclude<R1, ServerRequest.ServerRequest | RouteContext>
    | Exclude<Exclude<R, Context.Tag.Identifier<T>>, ServerRequest.ServerRequest | RouteContext>,
    E | E1
  >
}
```

Added in v1.0.0

## use

**Signature**

```ts
export declare const use: {
  <R, E, R1, E1>(f: (self: Route.Handler<R, E>) => App.Default<R1, E1>): (
    self: Router<R, E>
  ) => Router<Exclude<R1, ServerRequest.ServerRequest | RouteContext>, E1>
  <R, E, R1, E1>(self: Router<R, E>, f: (self: Route.Handler<R, E>) => App.Default<R1, E1>): Router<
    Exclude<R1, ServerRequest.ServerRequest | RouteContext>,
    E1
  >
}
```

Added in v1.0.0

# constructors

## empty

**Signature**

```ts
export declare const empty: Router<never, never>
```

Added in v1.0.0

## fromIterable

**Signature**

```ts
export declare const fromIterable: <R, E>(routes: Iterable<Route<R, E>>) => Router<R, E>
```

Added in v1.0.0

## makeRoute

**Signature**

```ts
export declare const makeRoute: <R, E>(method: Method.Method, path: string, handler: Route.Handler<R, E>) => Route<R, E>
```

Added in v1.0.0

# models

## Route (interface)

**Signature**

```ts
export interface Route<R, E> {
  readonly [RouteTypeId]: RouteTypeId
  readonly method: Method.Method | '*'
  readonly path: string
  readonly handler: Route.Handler<R, E>
  readonly prefix: Option.Option<string>
}
```

Added in v1.0.0

## RouteContext (interface)

**Signature**

```ts
export interface RouteContext {
  readonly [RouteContextTypeId]: RouteContextTypeId
  readonly params: Readonly<Record<string, string | undefined>>
  readonly searchParams: Readonly<Record<string, string>>
}
```

Added in v1.0.0

## Router (interface)

**Signature**

```ts
export interface Router<R, E> extends App.Default<Exclude<R, RouteContext>, E | Error.RouteNotFound> {
  readonly [TypeId]: TypeId
  readonly routes: Chunk.Chunk<Route<R, E>>
  readonly mounts: Chunk.Chunk<readonly [string, App.Default<R, E>]>
}
```

Added in v1.0.0

# route context

## RouteContext

**Signature**

```ts
export declare const RouteContext: Context.Tag<RouteContext, RouteContext>
```

Added in v1.0.0

## params

**Signature**

```ts
export declare const params: Effect.Effect<RouteContext, never, Readonly<Record<string, string | undefined>>>
```

Added in v1.0.0

## schemaParams

**Signature**

```ts
export declare const schemaParams: <I extends Readonly<Record<string, string>>, A>(
  schema: Schema.Schema<I, A>
) => Effect.Effect<RouteContext, ParseResult.ParseError, A>
```

Added in v1.0.0

## searchParams

**Signature**

```ts
export declare const searchParams: Effect.Effect<RouteContext, never, Readonly<Record<string, string>>>
```

Added in v1.0.0

# routing

## all

**Signature**

```ts
export declare const all: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<
    Exclude<R1, ServerRequest.ServerRequest | RouteContext> | Exclude<R, ServerRequest.ServerRequest | RouteContext>,
    E1 | E
  >
  <R, E, R1, E1>(self: Router<R, E>, path: string, handler: Route.Handler<R1, E1>): Router<
    Exclude<R, ServerRequest.ServerRequest | RouteContext> | Exclude<R1, ServerRequest.ServerRequest | RouteContext>,
    E | E1
  >
}
```

Added in v1.0.0

## del

**Signature**

```ts
export declare const del: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<
    Exclude<R1, ServerRequest.ServerRequest | RouteContext> | Exclude<R, ServerRequest.ServerRequest | RouteContext>,
    E1 | E
  >
  <R, E, R1, E1>(self: Router<R, E>, path: string, handler: Route.Handler<R1, E1>): Router<
    Exclude<R, ServerRequest.ServerRequest | RouteContext> | Exclude<R1, ServerRequest.ServerRequest | RouteContext>,
    E | E1
  >
}
```

Added in v1.0.0

## get

**Signature**

```ts
export declare const get: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<
    Exclude<R1, ServerRequest.ServerRequest | RouteContext> | Exclude<R, ServerRequest.ServerRequest | RouteContext>,
    E1 | E
  >
  <R, E, R1, E1>(self: Router<R, E>, path: string, handler: Route.Handler<R1, E1>): Router<
    Exclude<R, ServerRequest.ServerRequest | RouteContext> | Exclude<R1, ServerRequest.ServerRequest | RouteContext>,
    E | E1
  >
}
```

Added in v1.0.0

## head

**Signature**

```ts
export declare const head: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<
    Exclude<R1, ServerRequest.ServerRequest | RouteContext> | Exclude<R, ServerRequest.ServerRequest | RouteContext>,
    E1 | E
  >
  <R, E, R1, E1>(self: Router<R, E>, path: string, handler: Route.Handler<R1, E1>): Router<
    Exclude<R, ServerRequest.ServerRequest | RouteContext> | Exclude<R1, ServerRequest.ServerRequest | RouteContext>,
    E | E1
  >
}
```

Added in v1.0.0

## mount

**Signature**

```ts
export declare const mount: {
  <R1, E1>(path: string, that: Router<R1, E1>): <R, E>(self: Router<R, E>) => Router<R1 | R, E1 | E>
  <R, E, R1, E1>(self: Router<R, E>, path: string, that: Router<R1, E1>): Router<R | R1, E | E1>
}
```

Added in v1.0.0

## mountApp

**Signature**

```ts
export declare const mountApp: {
  <R1, E1>(path: string, that: App.Default<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<
    Exclude<R1, ServerRequest.ServerRequest | RouteContext> | Exclude<R, ServerRequest.ServerRequest | RouteContext>,
    E1 | E
  >
  <R, E, R1, E1>(self: Router<R, E>, path: string, that: App.Default<R1, E1>): Router<
    Exclude<R, ServerRequest.ServerRequest | RouteContext> | Exclude<R1, ServerRequest.ServerRequest | RouteContext>,
    E | E1
  >
}
```

Added in v1.0.0

## options

**Signature**

```ts
export declare const options: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<
    Exclude<R1, ServerRequest.ServerRequest | RouteContext> | Exclude<R, ServerRequest.ServerRequest | RouteContext>,
    E1 | E
  >
  <R, E, R1, E1>(self: Router<R, E>, path: string, handler: Route.Handler<R1, E1>): Router<
    Exclude<R, ServerRequest.ServerRequest | RouteContext> | Exclude<R1, ServerRequest.ServerRequest | RouteContext>,
    E | E1
  >
}
```

Added in v1.0.0

## patch

**Signature**

```ts
export declare const patch: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<
    Exclude<R1, ServerRequest.ServerRequest | RouteContext> | Exclude<R, ServerRequest.ServerRequest | RouteContext>,
    E1 | E
  >
  <R, E, R1, E1>(self: Router<R, E>, path: string, handler: Route.Handler<R1, E1>): Router<
    Exclude<R, ServerRequest.ServerRequest | RouteContext> | Exclude<R1, ServerRequest.ServerRequest | RouteContext>,
    E | E1
  >
}
```

Added in v1.0.0

## post

**Signature**

```ts
export declare const post: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<
    Exclude<R1, ServerRequest.ServerRequest | RouteContext> | Exclude<R, ServerRequest.ServerRequest | RouteContext>,
    E1 | E
  >
  <R, E, R1, E1>(self: Router<R, E>, path: string, handler: Route.Handler<R1, E1>): Router<
    Exclude<R, ServerRequest.ServerRequest | RouteContext> | Exclude<R1, ServerRequest.ServerRequest | RouteContext>,
    E | E1
  >
}
```

Added in v1.0.0

## put

**Signature**

```ts
export declare const put: {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<
    Exclude<R1, ServerRequest.ServerRequest | RouteContext> | Exclude<R, ServerRequest.ServerRequest | RouteContext>,
    E1 | E
  >
  <R, E, R1, E1>(self: Router<R, E>, path: string, handler: Route.Handler<R1, E1>): Router<
    Exclude<R, ServerRequest.ServerRequest | RouteContext> | Exclude<R1, ServerRequest.ServerRequest | RouteContext>,
    E | E1
  >
}
```

Added in v1.0.0

## route

**Signature**

```ts
export declare const route: (method: Method.Method | '*') => {
  <R1, E1>(path: string, handler: Route.Handler<R1, E1>): <R, E>(
    self: Router<R, E>
  ) => Router<
    Exclude<R1, ServerRequest.ServerRequest | RouteContext> | Exclude<R, ServerRequest.ServerRequest | RouteContext>,
    E1 | E
  >
  <R, E, R1, E1>(self: Router<R, E>, path: string, handler: Route.Handler<R1, E1>): Router<
    Exclude<R, ServerRequest.ServerRequest | RouteContext> | Exclude<R1, ServerRequest.ServerRequest | RouteContext>,
    E | E1
  >
}
```

Added in v1.0.0

# type ids

## RouteContextTypeId

**Signature**

```ts
export declare const RouteContextTypeId: typeof RouteContextTypeId
```

Added in v1.0.0

## RouteContextTypeId (type alias)

**Signature**

```ts
export type RouteContextTypeId = typeof RouteContextTypeId
```

Added in v1.0.0

## RouteTypeId

**Signature**

```ts
export declare const RouteTypeId: typeof RouteTypeId
```

Added in v1.0.0

## RouteTypeId (type alias)

**Signature**

```ts
export type RouteTypeId = typeof RouteTypeId
```

Added in v1.0.0

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

# utils

## Route (namespace)

Added in v1.0.0

### Handler (type alias)

**Signature**

```ts
export type Handler<R, E> = Effect.Effect<
  R | RouteContext | ServerRequest.ServerRequest,
  E,
  ServerResponse.ServerResponse
>
```

Added in v1.0.0

## Router (namespace)

Added in v1.0.0

### ExcludeProvided (type alias)

**Signature**

```ts
export type ExcludeProvided<A> = Exclude<A, RouteContext | ServerRequest.ServerRequest>
```

Added in v1.0.0
