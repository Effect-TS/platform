---
title: Effectify.ts
nav_order: 1
parent: "@effect/platform-browser"
---

## Effectify overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructor](#constructor)
  - [effectify](#effectify)
- [utils](#utils)
  - [Effectify](#effectify-1)
  - [EffectifyError](#effectifyerror)

---

# constructor

## effectify

**Signature**

```ts
export declare const effectify: {
  <F extends (...args: any[]) => any>(fn: F): Effectify<F, EffectifyError<F>>
  <F extends (...args: any[]) => any, E>(
    fn: F,
    onError: (error: EffectifyError<F>, args: Parameters<F>) => E
  ): Effectify<F, E>
  <F extends (...args: any[]) => any, E, E2>(
    fn: F,
    onError: (error: EffectifyError<F>, args: Parameters<F>) => E,
    onSyncError: (error: unknown, args: Parameters<F>) => E2
  ): Effectify<F, E | E2>
}
```

Added in v1.0.0

# utils

## Effectify

**Signature**

```ts
export declare const Effectify: Effectify<T, E>
```

Added in v1.0.0

## EffectifyError

**Signature**

```ts
export declare const EffectifyError: EffectifyError<T>
```

Added in v1.0.0
