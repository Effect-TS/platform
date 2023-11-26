---
title: Http/ServerResponse.ts
nav_order: 23
parent: "@effect/platform"
---

## ServerResponse overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [setBody](#setbody)
  - [setHeader](#setheader)
  - [setHeaders](#setheaders)
  - [setStatus](#setstatus)
- [constructors](#constructors)
  - [empty](#empty)
  - [file](#file)
  - [fileWeb](#fileweb)
  - [formData](#formdata)
  - [json](#json)
  - [raw](#raw)
  - [schemaJson](#schemajson)
  - [stream](#stream)
  - [text](#text)
  - [uint8Array](#uint8array)
  - [unsafeJson](#unsafejson)
  - [urlParams](#urlparams)
- [conversions](#conversions)
  - [toWeb](#toweb)
- [models](#models)
  - [Options (interface)](#options-interface)
  - [ServerResponse (interface)](#serverresponse-interface)
- [type ids](#type-ids)
  - [TypeId](#typeid)
  - [TypeId (type alias)](#typeid-type-alias)
- [utils](#utils)
  - [Options (namespace)](#options-namespace)
    - [WithContent (interface)](#withcontent-interface)
    - [WithContentType (interface)](#withcontenttype-interface)
  - [isServerResponse](#isserverresponse)

---

# combinators

## setBody

**Signature**

```ts
export declare const setBody: {
  (body: Body.Body): (self: ServerResponse) => ServerResponse
  (self: ServerResponse, body: Body.Body): ServerResponse
}
```

Added in v1.0.0

## setHeader

**Signature**

```ts
export declare const setHeader: {
  (key: string, value: string): (self: ServerResponse) => ServerResponse
  (self: ServerResponse, key: string, value: string): ServerResponse
}
```

Added in v1.0.0

## setHeaders

**Signature**

```ts
export declare const setHeaders: {
  (input: Headers.Input): (self: ServerResponse) => ServerResponse
  (self: ServerResponse, input: Headers.Input): ServerResponse
}
```

Added in v1.0.0

## setStatus

**Signature**

```ts
export declare const setStatus: {
  (status: number, statusText?: string | undefined): (self: ServerResponse) => ServerResponse
  (self: ServerResponse, status: number, statusText?: string | undefined): ServerResponse
}
```

Added in v1.0.0

# constructors

## empty

**Signature**

```ts
export declare const empty: (options?: Options.WithContent) => ServerResponse
```

Added in v1.0.0

## file

**Signature**

```ts
export declare const file: (
  path: string,
  options?: Options & FileSystem.StreamOptions
) => Effect.Effect<Platform.Platform, PlatformError.PlatformError, ServerResponse>
```

Added in v1.0.0

## fileWeb

**Signature**

```ts
export declare const fileWeb: (
  file: Body.Body.FileLike,
  options?: Options.WithContent & FileSystem.StreamOptions
) => Effect.Effect<Platform.Platform, never, ServerResponse>
```

Added in v1.0.0

## formData

**Signature**

```ts
export declare const formData: (body: FormData, options?: Options.WithContent) => ServerResponse
```

Added in v1.0.0

## json

**Signature**

```ts
export declare const json: (
  body: unknown,
  options?: Options.WithContent
) => Effect.Effect<never, Body.BodyError, ServerResponse>
```

Added in v1.0.0

## raw

**Signature**

```ts
export declare const raw: (body: unknown, options?: Options) => ServerResponse
```

Added in v1.0.0

## schemaJson

**Signature**

```ts
export declare const schemaJson: <I, A>(
  schema: Schema.Schema<I, A>
) => (body: A, options?: Options.WithContent) => Effect.Effect<never, Body.BodyError, ServerResponse>
```

Added in v1.0.0

## stream

**Signature**

```ts
export declare const stream: (body: Stream.Stream<never, unknown, Uint8Array>, options?: Options) => ServerResponse
```

Added in v1.0.0

## text

**Signature**

```ts
export declare const text: (body: string, options?: Options.WithContentType) => ServerResponse
```

Added in v1.0.0

## uint8Array

**Signature**

```ts
export declare const uint8Array: (body: Uint8Array, options?: Options.WithContentType) => ServerResponse
```

Added in v1.0.0

## unsafeJson

**Signature**

```ts
export declare const unsafeJson: (body: unknown, options?: Options.WithContent) => ServerResponse
```

Added in v1.0.0

## urlParams

**Signature**

```ts
export declare const urlParams: (body: UrlParams.Input, options?: Options.WithContent) => ServerResponse
```

Added in v1.0.0

# conversions

## toWeb

**Signature**

```ts
export declare const toWeb: (response: ServerResponse, withoutBody?: boolean) => Response
```

Added in v1.0.0

# models

## Options (interface)

**Signature**

```ts
export interface Options {
  readonly status?: number
  readonly statusText?: string
  readonly headers?: Headers.Headers
  readonly contentType?: string
  readonly contentLength?: number
}
```

Added in v1.0.0

## ServerResponse (interface)

**Signature**

```ts
export interface ServerResponse extends Effect.Effect<never, never, ServerResponse> {
  readonly [TypeId]: TypeId
  readonly status: number
  readonly statusText?: string
  readonly headers: Headers.Headers
  readonly body: Body.Body
}
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

# utils

## Options (namespace)

Added in v1.0.0

### WithContent (interface)

**Signature**

```ts
export interface WithContent extends Omit<Options, "contentType" | "contentLength"> {}
```

Added in v1.0.0

### WithContentType (interface)

**Signature**

```ts
export interface WithContentType extends Omit<Options, "contentLength"> {}
```

Added in v1.0.0

## isServerResponse

**Signature**

```ts
export declare const isServerResponse: (u: unknown) => u is ServerResponse
```

Added in v1.0.0
