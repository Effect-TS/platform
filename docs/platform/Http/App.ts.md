---
title: Http/App.ts
nav_order: 6
parent: "@effect/platform"
---

## App overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [models](#models)
  - [Default (type alias)](#default-type-alias)
  - [HttpApp (interface)](#httpapp-interface)

---

# models

## Default (type alias)

**Signature**

```ts
export type Default<R, E> = HttpApp<R, E, ServerResponse.ServerResponse>
```

Added in v1.0.0

## HttpApp (interface)

**Signature**

```ts
export interface HttpApp<R, E, A> extends Effect.Effect<R | ServerRequest.ServerRequest, E, A> {}
```

Added in v1.0.0
