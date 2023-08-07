import * as Chunk from "@effect/data/Chunk"
import * as Context from "@effect/data/Context"
import { dual } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import type * as Body from "@effect/platform/Http/Body"
import type * as Client from "@effect/platform/Http/Client"
import type * as Error from "@effect/platform/Http/ClientError"
import type * as ClientRequest from "@effect/platform/Http/ClientRequest"
import * as internalResponse from "@effect/platform/internal/http/clientResponse"
import * as internalError from "@effect/platform/internal/http/error"
import * as Stream from "@effect/stream/Stream"

/** @internal */
export const tag = Context.Tag<Client.Client.Default>("@effect/platform/Http/Client")

/** @internal */
export const fetch = (
  options: RequestInit = {}
): Client.Client.Default =>
(request) =>
  Effect.flatMap(
    Effect.try({
      try: () => new URL(request.url),
      catch: (_) =>
        internalError.transportError({
          method: "fetch",
          request,
          reason: "Encode",
          error: _
        })
    }),
    (url) =>
      Effect.suspend(() => {
        Chunk.forEach(request.urlParams, ([key, value]) => {
          if (value === undefined) return
          url.searchParams.append(key, value)
        })

        const headers = new Headers([...request.headers] as any)
        const send = (body: BodyInit | undefined) =>
          Effect.map(
            Effect.tryPromise({
              try: (signal) =>
                globalThis.fetch(url, {
                  ...options,
                  method: request.method,
                  headers,
                  body,
                  signal
                }),
              catch: (_) =>
                internalError.transportError({
                  method: "fetch",
                  request,
                  reason: "RequestError",
                  error: _
                })
            }),
            (_) => internalResponse.fromWeb(request, _)
          )

        return request.body._tag === "BytesEffect" ?
          Effect.flatMap(
            Effect.mapError(request.body.body, (error) =>
              internalError.transportError({
                method: "fetch",
                reason: "Encode",
                request,
                error
              })),
            (body) => send(body)
          ) :
          send(convertBody(request.body))
      })
  )

const convertBody = (body: Exclude<Body.Body, Body.BytesEffect>): BodyInit | undefined => {
  switch (body._tag) {
    case "Empty":
      return undefined
    case "Raw":
      return body.body as any
    case "Bytes":
      return body.body
    case "FormData":
      return body.formData
    case "Stream":
      return Stream.toReadableStream(body.stream)
  }
}

export const fetchOk = (
  options: RequestInit = {}
): Client.Client.Default => filterStatusOk(fetch(options))

/** @internal */
export const fetchLayer = Layer.succeed(tag, fetch())

/** @internal */
export const filterStatus = dual<
  (f: (status: number) => boolean) => <R, E>(
    self: Client.Client.WithResponse<R, E>
  ) => Client.Client.WithResponse<R, E | Error.StatusError>,
  <R, E>(
    self: Client.Client.WithResponse<R, E>,
    f: (status: number) => boolean
  ) => Client.Client.WithResponse<R, E | Error.StatusError>
>(
  2,
  (self, f) => (request) =>
    Effect.filterOrFail(
      self(request),
      (response) => f(response.status),
      () => internalError.statusError({ status: 404 })
    )
)

/** @internal */
export const filterStatusOk: <R, E>(
  self: Client.Client.WithResponse<R, E>
) => Client.Client.WithResponse<R, E | Error.StatusError> = filterStatus((status) => status >= 200 && status < 300)

/** @internal */
export const map = dual<
  <A, B>(f: (a: A) => B) => <R, E>(
    self: Client.Client<R, E, A>
  ) => Client.Client<R, E, B>,
  <R, E, A, B>(
    self: Client.Client<R, E, A>,
    f: (a: A) => B
  ) => Client.Client<R, E, B>
>(2, (self, f) => (request) => Effect.map(self(request), f))

/** @internal */
export const mapEffect = dual<
  <A, R2, E2, B>(f: (a: A) => Effect.Effect<R2, E2, B>) => <R, E>(
    self: Client.Client<R, E, A>
  ) => Client.Client<R | R2, E | E2, B>,
  <R, E, A, R2, E2, B>(
    self: Client.Client<R, E, A>,
    f: (a: A) => Effect.Effect<R2, E2, B>
  ) => Client.Client<R | R2, E | E2, B>
>(2, (self, f) => (request) => Effect.flatMap(self(request), f))

/** @internal */
export const mapRequest = dual<
  (f: (a: ClientRequest.ClientRequest) => ClientRequest.ClientRequest) => <R, E, A>(
    self: Client.Client<R, E, A>
  ) => Client.Client<R, E, A>,
  <R, E, A>(
    self: Client.Client<R, E, A>,
    f: (a: ClientRequest.ClientRequest) => ClientRequest.ClientRequest
  ) => Client.Client<R, E, A>
>(2, (self, f) => (request) => self(f(request)))

/** @internal */
export const mapRequestEffect = dual<
  <R2, E2>(f: (a: ClientRequest.ClientRequest) => Effect.Effect<R2, E2, ClientRequest.ClientRequest>) => <R, E, A>(
    self: Client.Client<R, E, A>
  ) => Client.Client<R | R2, E | E2, A>,
  <R, E, A, R2, E2>(
    self: Client.Client<R, E, A>,
    f: (a: ClientRequest.ClientRequest) => Effect.Effect<R2, E2, ClientRequest.ClientRequest>
  ) => Client.Client<R | R2, E | E2, A>
>(2, (self, f) => (request) => Effect.flatMap(f(request), self))

/** @internal */
export const tap = dual<
  <A, R2, E2, _>(f: (a: A) => Effect.Effect<R2, E2, _>) => <R, E>(
    self: Client.Client<R, E, A>
  ) => Client.Client<R | R2, E | E2, A>,
  <R, E, A, R2, E2, _>(
    self: Client.Client<R, E, A>,
    f: (a: A) => Effect.Effect<R2, E2, _>
  ) => Client.Client<R | R2, E | E2, A>
>(2, (self, f) => (request) => Effect.tap(self(request), f))

/** @internal */
export const tapRequest = dual<
  <R2, E2, _>(f: (a: ClientRequest.ClientRequest) => Effect.Effect<R2, E2, _>) => <R, E, A>(
    self: Client.Client<R, E, A>
  ) => Client.Client<R | R2, E | E2, A>,
  <R, E, A, R2, E2, _>(
    self: Client.Client<R, E, A>,
    f: (a: ClientRequest.ClientRequest) => Effect.Effect<R2, E2, _>
  ) => Client.Client<R | R2, E | E2, A>
>(2, (self, f) => (request) => Effect.zipRight(f(request), self(request)))
