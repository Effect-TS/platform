---
title: Http/ServerResponse.ts
nav_order: 8
parent: "@effect/platform-bun"
---

## ServerResponse overview

Added in v1.0.0

Also includes exports from [`@effect/platform/Http/ServerResponse`](https://effect-ts.github.io/platform/platform/Http/ServerResponse.ts.html).

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [file](#file)
  - [fileWeb](#fileweb)

---

# constructors

## file

**Signature**

```ts
export declare const file: (
  path: string,
  options?: ServerResponse.Options.WithContentType & FileSystem.StreamOptions
) => Effect.Effect<FileSystem.FileSystem | Etag.Generator, PlatformError.PlatformError, ServerResponse.ServerResponse>
```

Added in v1.0.0

## fileWeb

**Signature**

```ts
export declare const fileWeb: (
  file: Body.Body.FileLike,
  options?: ServerResponse.Options.WithContent
) => Effect.Effect<Etag.Generator, never, ServerResponse.ServerResponse>
```

Added in v1.0.0
