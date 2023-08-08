---
title: Http/Error.ts
nav_order: 11
parent: "@effect/platform"
---

## Error overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [error](#error)
  - [HttpError (type alias)](#httperror-type-alias)
  - [StatusError](#statuserror)
  - [StatusError (interface)](#statuserror-interface)
  - [TransportError](#transporterror)
  - [TransportError (interface)](#transporterror-interface)
- [type id](#type-id)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# error

## HttpError (type alias)

**Signature**

```ts
export type HttpError = StatusError | TransportError
```

Added in v1.0.0

## StatusError

**Signature**

```ts
export declare const StatusError: (props: Omit<StatusError, HttpError.ProvidedFields>) => StatusError
```

Added in v1.0.0

## StatusError (interface)

**Signature**

```ts
export interface StatusError extends HttpError.Proto {
  readonly _tag: 'StatusError'
  readonly status: number
}
```

Added in v1.0.0

## TransportError

**Signature**

```ts
export declare const TransportError: (props: Omit<TransportError, HttpError.ProvidedFields>) => TransportError
```

Added in v1.0.0

## TransportError (interface)

**Signature**

```ts
export interface TransportError extends HttpError.Proto {
  readonly _tag: 'TransportError'
  readonly method: string
  readonly request?: ClientRequest.ClientRequest
  readonly response?: ClientResponse.ClientResponse
  readonly reason: 'RequestError' | 'Aborted' | 'Decode' | 'Encode' | 'EmptyBody' | 'Unknown'
  readonly error: unknown
}
```

Added in v1.0.0

# type id

## TypeId

**Signature**

```ts
export declare const TypeId: typeof TypeId
```

Added in v1.0.0

## TypeId (type alias)

**Signature**

```ts
export type TypeId = typeof TypeId
```

Added in v1.0.0
