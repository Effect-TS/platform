---
title: Http/FormData.ts
nav_order: 7
parent: "@effect/platform-node"
---

## FormData overview

Added in v1.0.0

Also includes exports from [`@effect/platform/Http/FormData`](https://effect-ts.github.io/platform/platform/Http/FormData.ts.html).

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [formData](#formdata)
  - [stream](#stream)

---

# constructors

## formData

**Signature**

```ts
export declare const formData: (
  source: Readable,
  headers: IncomingHttpHeaders
) => Effect.Effect<Path.Path | FileSystem.FileSystem | Scope.Scope, FormData.FormDataError, FormData>
```

Added in v1.0.0

## stream

**Signature**

```ts
export declare const stream: (
  source: Readable,
  headers: IncomingHttpHeaders
) => Stream.Stream<never, FormData.FormDataError, FormData.Part>
```

Added in v1.0.0
