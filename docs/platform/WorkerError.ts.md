---
title: WorkerError.ts
nav_order: 32
parent: "@effect/platform"
---

## WorkerError overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [errors](#errors)
  - [WorkerError](#workererror)
  - [WorkerError (interface)](#workererror-interface)
- [type ids](#type-ids)
  - [WorkerErrorTypeId](#workererrortypeid)
  - [WorkerErrorTypeId (type alias)](#workererrortypeid-type-alias)

---

# errors

## WorkerError

**Signature**

```ts
export declare const WorkerError: (reason: 'spawn' | 'decode' | 'unknown', error: unknown) => WorkerError
```

Added in v1.0.0

## WorkerError (interface)

**Signature**

```ts
export interface WorkerError extends Data.Case {
  readonly [WorkerErrorTypeId]: WorkerErrorTypeId
  readonly _tag: 'WorkerError'
  readonly reason: 'spawn' | 'decode' | 'unknown'
  readonly error: unknown
}
```

Added in v1.0.0

# type ids

## WorkerErrorTypeId

**Signature**

```ts
export declare const WorkerErrorTypeId: typeof WorkerErrorTypeId
```

Added in v1.0.0

## WorkerErrorTypeId (type alias)

**Signature**

```ts
export type WorkerErrorTypeId = typeof WorkerErrorTypeId
```

Added in v1.0.0
