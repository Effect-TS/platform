---
title: Http/ServerRequest.ts
nav_order: 22
parent: "@effect/platform"
---

## ServerRequest overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [accessors](#accessors)
  - [persistedFormData](#persistedformdata)
- [context](#context)
  - [ServerRequest](#serverrequest)
- [conversions](#conversions)
  - [fromWeb](#fromweb)
- [fiber refs](#fiber-refs)
  - [maxBodySize](#maxbodysize)
- [models](#models)
  - [ServerRequest (interface)](#serverrequest-interface)
- [schema](#schema)
  - [schemaBodyJson](#schemabodyjson)
  - [schemaBodyUrlParams](#schemabodyurlparams)
  - [schemaFormData](#schemaformdata)
  - [schemaFormDataJson](#schemaformdatajson)
  - [schemaHeaders](#schemaheaders)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# accessors

## persistedFormData

**Signature**

```ts
export declare const persistedFormData: Effect.Effect<
  Scope.Scope | Path.Path | FileSystem.FileSystem | ServerRequest,
  FormData.FormDataError,
  unknown
>
```

Added in v1.0.0

# context

## ServerRequest

**Signature**

```ts
export declare const ServerRequest: Context.Tag<ServerRequest, ServerRequest>
```

Added in v1.0.0

# conversions

## fromWeb

**Signature**

```ts
export declare const fromWeb: (request: Request) => ServerRequest
```

Added in v1.0.0

# fiber refs

## maxBodySize

**Signature**

```ts
export declare const maxBodySize: FiberRef<Option<FileSystem.Size>>
```

Added in v1.0.0

# models

## ServerRequest (interface)

**Signature**

```ts
export interface ServerRequest extends IncomingMessage.IncomingMessage<Error.RequestError> {
  readonly [TypeId]: TypeId
  readonly url: string
  readonly originalUrl: string
  readonly method: Method

  readonly formData: Effect.Effect<
    Scope.Scope | FileSystem.FileSystem | Path.Path,
    FormData.FormDataError,
    FormData.PersistedFormData
  >
  readonly formDataStream: Stream.Stream<never, FormData.FormDataError, FormData.Part>

  readonly modify: (options: {
    readonly url?: string
    readonly headers?: Headers.Headers
    readonly remoteAddress?: string
  }) => ServerRequest
}
```

Added in v1.0.0

# schema

## schemaBodyJson

**Signature**

```ts
export declare const schemaBodyJson: <I, A>(
  schema: Schema.Schema<I, A>
) => Effect.Effect<ServerRequest, ParseResult.ParseError | Error.RequestError, A>
```

Added in v1.0.0

## schemaBodyUrlParams

**Signature**

```ts
export declare const schemaBodyUrlParams: <I extends Readonly<Record<string, string>>, A>(
  schema: Schema.Schema<I, A>
) => Effect.Effect<ServerRequest, ParseResult.ParseError | Error.RequestError, A>
```

Added in v1.0.0

## schemaFormData

**Signature**

```ts
export declare const schemaFormData: <I extends FormData.PersistedFormData, A>(
  schema: Schema.Schema<I, A>
) => Effect.Effect<
  Scope.Scope | Path.Path | FileSystem.FileSystem | ServerRequest,
  FormData.FormDataError | ParseResult.ParseError,
  A
>
```

Added in v1.0.0

## schemaFormDataJson

**Signature**

```ts
export declare const schemaFormDataJson: <I, A>(
  schema: Schema.Schema<I, A>
) => (
  field: string
) => Effect.Effect<
  Scope.Scope | Path.Path | FileSystem.FileSystem | ServerRequest,
  FormData.FormDataError | ParseResult.ParseError | Error.RequestError,
  A
>
```

Added in v1.0.0

## schemaHeaders

**Signature**

```ts
export declare const schemaHeaders: <I extends Readonly<Record<string, string>>, A>(
  schema: Schema.Schema<I, A>
) => Effect.Effect<ServerRequest, ParseResult.ParseError, A>
```

Added in v1.0.0

# type ids

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
