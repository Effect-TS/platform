---
title: Sink.ts
nav_order: 7
parent: "@effect/platform-node"
---

## Sink overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructor](#constructor)
  - [fromWritable](#fromwritable)
- [model](#model)
  - [FromWritableOptions (interface)](#fromwritableoptions-interface)

---

# constructor

## fromWritable

**Signature**

```ts
export declare const fromWritable: <E, A>(
  evaluate: LazyArg<Writable>,
  onError: (error: unknown) => E,
  options?: FromWritableOptions
) => Sink<never, E, A, never, void>
```

Added in v1.0.0

# model

## FromWritableOptions (interface)

**Signature**

```ts
export interface FromWritableOptions {
  readonly endOnClose?: boolean
  readonly encoding?: BufferEncoding
}
```

Added in v1.0.0
