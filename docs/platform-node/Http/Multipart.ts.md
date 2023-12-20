---
title: Http/Multipart.ts
nav_order: 7
parent: "@effect/platform-node"
---

## Multipart overview

Added in v1.0.0

Also includes exports from [`@effect/platform/Http/Multipart`](https://effect-ts.github.io/platform/platform/Http/Multipart.ts.html).

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [persisted](#persisted)
  - [stream](#stream)
- [conversions](#conversions)
  - [fileToReadable](#filetoreadable)
- [exports](#exports)
  - [From "@effect/platform/Http/Multipart"](#from-effectplatformhttpmultipart)

---

# constructors

## persisted

**Signature**

```ts
export declare const persisted: (
  source: Readable,
  headers: IncomingHttpHeaders
) => Effect.Effect<FileSystem.FileSystem | Path.Path | Scope.Scope, Multipart.MultipartError, Multipart.Persisted>
```

Added in v1.0.0

## stream

**Signature**

```ts
export declare const stream: (
  source: Readable,
  headers: IncomingHttpHeaders
) => Stream.Stream<never, Multipart.MultipartError, Multipart.Part>
```

Added in v1.0.0

# conversions

## fileToReadable

**Signature**

```ts
export declare const fileToReadable: (file: Multipart.File) => Readable
```

Added in v1.0.0

# exports

## From "@effect/platform/Http/Multipart"

Re-exports all named exports from the "@effect/platform/Http/Multipart" module.

**Signature**

```ts
export * from "@effect/platform/Http/Multipart"
```

Added in v1.0.0
