---
title: WebSocket.ts
nav_order: 9
parent: "@effect/platform-browser"
---

## WebSocket overview

Added in v1.0.0

Also includes exports from [`@effect/platform/WebSocket`](https://effect-ts.github.io/platform/platform/WebSocket.ts.html).

---

<h2 class="text-delta">Table of contents</h2>

- [exports](#exports)
  - [From "@effect/platform/WebSocket"](#from-effectplatformwebsocket)
- [models](#models)
  - [layer](#layer)

---

# exports

## From "@effect/platform/WebSocket"

Re-exports all named exports from the "@effect/platform/WebSocket" module.

**Signature**

```ts
export * from "@effect/platform/WebSocket"
```

Added in v1.0.0

# models

## layer

Creates a WebSocket layer.

**Signature**

```ts
export declare const layer: (url: string | URL) => Layer.Layer<never, PlatformError, Socket.Socket>
```

Added in v1.0.0
