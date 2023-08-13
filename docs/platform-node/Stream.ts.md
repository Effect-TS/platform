---
title: Stream.ts
nav_order: 15
parent: "@effect/platform-node"
---

## Stream overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [fromReadable](#fromreadable)
- [conversions](#conversions)
  - [toString](#tostring)
  - [toUint8Array](#touint8array)
- [models](#models)
  - [FromReadableOptions (interface)](#fromreadableoptions-interface)

---

# constructors

## fromReadable

**Signature**

```ts
export declare const fromReadable: <E, A>(
  evaluate: LazyArg<Readable>,
  onError: (error: unknown) => E,
  options?: FromReadableOptions
) => Stream<never, E, A>
```

Added in v1.0.0

# conversions

## toString

**Signature**

```ts
export declare const toString: <E>(options: {
  readable: LazyArg<Readable>
  onFailure: (error: unknown) => E
  encoding?: BufferEncoding | undefined
  maxBytes?: Size | undefined
}) => Effect<never, E, string>
```

Added in v1.0.0

## toUint8Array

**Signature**

```ts
export declare const toUint8Array: <E>(options: {
  readable: LazyArg<Readable>
  onFailure: (error: unknown) => E
  maxBytes?: Size | undefined
}) => Effect<never, E, Uint8Array>
```

Added in v1.0.0

# models

## FromReadableOptions (interface)

**Signature**

```ts
export interface FromReadableOptions {
  /** Defaults to None, which lets Node.js decide the chunk size */
  readonly chunkSize?: Option<Size>
}
```

Added in v1.0.0
