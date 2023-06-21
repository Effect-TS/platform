---
title: Stream.ts
nav_order: 8
parent: "@effect/platform-node"
---

## Stream overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructor](#constructor)
  - [fromReadable](#fromreadable)
- [model](#model)
  - [FromReadableOptions (interface)](#fromreadableoptions-interface)

---

# constructor

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

# model

## FromReadableOptions (interface)

**Signature**

```ts
export interface FromReadableOptions {
  /** Defaults to None, which lets Node.js decide the chunk size */
  readonly chunkSize?: Option<Size>
}
```

Added in v1.0.0
