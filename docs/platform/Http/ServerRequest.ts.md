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
  - [persistedMultipart](#persistedmultipart)
- [context](#context)
  - [ServerRequest](#serverrequest)
- [conversions](#conversions)
  - [fromWeb](#fromweb)
- [fiber refs](#fiber-refs)
  - [maxBodySize](#maxbodysize)
- [models](#models)
  - [ServerRequest (interface)](#serverrequest-interface)
- [schema](#schema)
  - [schemaBodyForm](#schemabodyform)
  - [schemaBodyJson](#schemabodyjson)
  - [schemaBodyMultipart](#schemabodymultipart)
  - [schemaBodyMultipartJson](#schemabodymultipartjson)
  - [schemaBodyUrlParams](#schemabodyurlparams)
  - [schemaHeaders](#schemaheaders)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)

---

# accessors

## persistedMultipart

**Signature**

```ts
export declare const persistedMultipart: Effect.Effect<
  Scope.Scope | Path.Path | FileSystem.FileSystem | ServerRequest,
  Multipart.MultipartError,
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
  readonly source: unknown
  readonly url: string
  readonly originalUrl: string
  readonly method: Method

  readonly multipart: Effect.Effect<
    Scope.Scope | FileSystem.FileSystem | Path.Path,
    Multipart.MultipartError,
    Multipart.Persisted
  >
  readonly multipartStream: Stream.Stream<never, Multipart.MultipartError, Multipart.Part>

  readonly modify: (options: {
    readonly url?: string
    readonly headers?: Headers.Headers
    readonly remoteAddress?: string
  }) => ServerRequest
}
```

Added in v1.0.0

# schema

## schemaBodyForm

**Signature**

```ts
export declare const schemaBodyForm: <I extends Multipart.Persisted, A>(
  schema: Schema.Schema<I, A>
) => Effect.Effect<
  Scope.Scope | Path.Path | FileSystem.FileSystem | ServerRequest,
  Multipart.MultipartError | ParseResult.ParseError | Error.RequestError,
  A
>
```

Added in v1.0.0

## schemaBodyJson

**Signature**

```ts
export declare const schemaBodyJson: <I, A>(
  schema: Schema.Schema<I, A>
) => Effect.Effect<ServerRequest, ParseResult.ParseError | Error.RequestError, A>
```

Added in v1.0.0

## schemaBodyMultipart

**Signature**

```ts
export declare const schemaBodyMultipart: <I extends Multipart.Persisted, A>(
  schema: Schema.Schema<I, A>
) => Effect.Effect<
  Scope.Scope | Path.Path | FileSystem.FileSystem | ServerRequest,
  Multipart.MultipartError | ParseResult.ParseError,
  A
>
```

Added in v1.0.0

## schemaBodyMultipartJson

**Signature**

```ts
export declare const schemaBodyMultipartJson: <I, A>(
  schema: Schema.Schema<I, A>
) => (
  field: string
) => Effect.Effect<
  Scope.Scope | Path.Path | FileSystem.FileSystem | ServerRequest,
  Multipart.MultipartError | ParseResult.ParseError | Error.RequestError,
  A
>
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
