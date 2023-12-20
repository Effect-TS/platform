---
title: Http/Method.ts
nav_order: 15
parent: "@effect/platform"
---

## Method overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [models](#models)
  - [Method (type alias)](#method-type-alias)
- [utils](#utils)
  - [hasBody](#hasbody)

---

# models

## Method (type alias)

**Signature**

```ts
export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS"
```

Added in v1.0.0

# utils

## hasBody

**Signature**

```ts
export declare const hasBody: (method: Method) => boolean
```

Added in v1.0.0
