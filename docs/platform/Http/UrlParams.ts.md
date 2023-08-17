---
title: Http/UrlParams.ts
nav_order: 23
parent: "@effect/platform"
---

## UrlParams overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [append](#append)
  - [appendAll](#appendall)
  - [remove](#remove)
  - [set](#set)
  - [setAll](#setall)
  - [toString](#tostring)
- [constructors](#constructors)
  - [empty](#empty)
  - [fromInput](#frominput)
  - [makeUrl](#makeurl)
- [models](#models)
  - [Input (type alias)](#input-type-alias)
  - [UrlParams (interface)](#urlparams-interface)

---

# combinators

## append

**Signature**

```ts
export declare const append: {
  (key: string, value: string): (self: UrlParams) => UrlParams
  (self: UrlParams, key: string, value: string): UrlParams
}
```

Added in v1.0.0

## appendAll

**Signature**

```ts
export declare const appendAll: {
  (input: Input): (self: UrlParams) => UrlParams
  (self: UrlParams, input: Input): UrlParams
}
```

Added in v1.0.0

## remove

**Signature**

```ts
export declare const remove: {
  (key: string): (self: UrlParams) => UrlParams
  (self: UrlParams, key: string): UrlParams
}
```

Added in v1.0.0

## set

**Signature**

```ts
export declare const set: {
  (key: string, value: string): (self: UrlParams) => UrlParams
  (self: UrlParams, key: string, value: string): UrlParams
}
```

Added in v1.0.0

## setAll

**Signature**

```ts
export declare const setAll: {
  (input: Input): (self: UrlParams) => UrlParams
  (self: UrlParams, input: Input): UrlParams
}
```

Added in v1.0.0

## toString

**Signature**

```ts
export declare const toString: (self: UrlParams) => string
```

Added in v1.0.0

# constructors

## empty

**Signature**

```ts
export declare const empty: UrlParams
```

Added in v1.0.0

## fromInput

**Signature**

```ts
export declare const fromInput: (input: Input) => UrlParams
```

Added in v1.0.0

## makeUrl

**Signature**

```ts
export declare const makeUrl: <E>(
  url: string,
  params: UrlParams,
  onError: (e: unknown) => E
) => Effect.Effect<never, E, URL>
```

Added in v1.0.0

# models

## Input (type alias)

**Signature**

```ts
export type Input = UrlParams | Readonly<Record<string, string>> | Iterable<readonly [string, string]> | URLSearchParams
```

Added in v1.0.0

## UrlParams (interface)

**Signature**

```ts
export interface UrlParams extends Chunk.Chunk<[string, string]> {}
```

Added in v1.0.0
