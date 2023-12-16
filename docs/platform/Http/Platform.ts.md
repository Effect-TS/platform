---
title: Http/Platform.ts
nav_order: 18
parent: "@effect/platform"
---

## Platform overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [make](#make)
- [models](#models)
  - [Platform (interface)](#platform-interface)
- [tags](#tags)
  - [Platform](#platform)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# constructors

## make

**Signature**

```ts
export declare const make: (impl: {
  readonly fileResponse: (
    path: string,
    status: number,
    statusText: string | undefined,
    headers: Headers.Headers,
    start: number,
    end: number | undefined,
    contentLength: number
  ) => ServerResponse.ServerResponse
  readonly fileWebResponse: (
    file: Body.Body.FileLike,
    status: number,
    statusText: string | undefined,
    headers: Headers.Headers,
    options?: FileSystem.StreamOptions | undefined
  ) => ServerResponse.ServerResponse
}) => Effect.Effect<FileSystem.FileSystem | Etag.Generator, never, Platform>
```

Added in v1.0.0

# models

## Platform (interface)

**Signature**

```ts
export interface Platform {
  readonly [TypeId]: TypeId
  readonly fileResponse: (
    path: string,
    options?: ServerResponse.Options.WithContent & FileSystem.StreamOptions
  ) => Effect.Effect<never, Error.PlatformError, ServerResponse.ServerResponse>
  readonly fileWebResponse: (
    file: Body.Body.FileLike,
    options?: ServerResponse.Options.WithContent & FileSystem.StreamOptions
  ) => Effect.Effect<never, never, ServerResponse.ServerResponse>
}
```

Added in v1.0.0

# tags

## Platform

**Signature**

```ts
export declare const Platform: Context.Tag<Platform, Platform>
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
