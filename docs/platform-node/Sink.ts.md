---
title: Sink.ts
nav_order: 18
parent: "@effect/platform-node"
---

## Sink overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructor](#constructor)
  - [fromWritable](#fromwritable)

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
