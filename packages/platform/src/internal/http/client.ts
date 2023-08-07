import * as Chunk from "@effect/data/Chunk"
import * as Context from "@effect/data/Context"
import { dual } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import type * as Body from "@effect/platform/Http/Body"
import type * as Client from "@effect/platform/Http/Client"
import * as ClientRequest from "@effect/platform/Http/ClientRequest"
import type * as Error from "@effect/platform/Http/Error"
import * as internalResponse from "@effect/platform/internal/http/clientResponse"
import * as internalError from "@effect/platform/internal/http/error"
import * as Stream from "@effect/stream/Stream"

/** @internal */
export const tag = Context.Tag<Client.Client.Default>("@effect/platform/Http/Client")

/** @internal */
export const fetch = (
  options: RequestInit = {}
): Client.Client.Default =>
  Effect.flatMap(ClientRequest.ClientRequest, (request) =>
    Effect.flatMap(
      Effect.try({
        try: () => new URL(request.url),
        catch: (_) =>
          internalError.transportError({
            method: "fetch",
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
                    reason: "RequestError",
                    error: _
                  })
              }),
              (_) => internalResponse.fromWeb(request, _)
            )

          return request.body._tag === "BytesEffect" ?
            Effect.flatMap(
              request.body.body,
              (body) => send(body)
            ) :
            send(convertBody(request.body))
        })
    ))

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
  (self, f) =>
    Effect.filterOrFail(
      self,
      (request) => f(request.status),
      () => internalError.statusError({ status: 404 })
    )
)

/** @internal */
export const filterStatusOk: <R, E>(
  self: Client.Client.WithResponse<R, E>
) => Client.Client.WithResponse<R, E | Error.StatusError> = filterStatus((status) => status >= 200 && status < 300)

/** @internal */
export const fetchLayer = Layer.succeed(tag, fetch())
