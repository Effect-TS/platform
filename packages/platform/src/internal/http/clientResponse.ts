import * as Effect from "@effect/io/Effect"
import type * as ClientRequest from "@effect/platform/Http/ClientRequest"
import type * as ClientResponse from "@effect/platform/Http/ClientResponse"
import type * as Error from "@effect/platform/Http/Error"
import type * as FormData from "@effect/platform/Http/FormData"
import * as Headers from "@effect/platform/Http/Headers"
import * as IncomingMessage from "@effect/platform/Http/IncomingMessage"
import * as internalError from "@effect/platform/internal/http/error"
import * as Stream from "@effect/stream/Stream"

/** @internal */
export const TypeId: ClientResponse.TypeId = Symbol.for("@effect/platform/Http/ClientResponse") as ClientResponse.TypeId

/** @internal */
export const fromWeb = (
  request: ClientRequest.ClientRequest,
  source: globalThis.Response
): ClientResponse.ClientResponse => new ClientResponseImpl(request, source)

class ClientResponseImpl implements ClientResponse.ClientResponse {
  readonly [IncomingMessage.TypeId]: IncomingMessage.TypeId = IncomingMessage.TypeId
  readonly [TypeId]: ClientResponse.TypeId = TypeId

  constructor(
    private readonly request: ClientRequest.ClientRequest,
    private readonly source: globalThis.Response
  ) {}

  get status(): number {
    return this.source.status
  }

  get headers(): Headers.Headers {
    return Headers.fromInput(this.source.headers)
  }

  get stream(): Stream.Stream<never, Error.TransportError, Uint8Array> {
    return this.source.body
      ? Stream.fromReadableStream(() => this.source.body!, (_) =>
        internalError.transportError({
          method: "ClientResponse.stream",
          request: this.request,
          response: this,
          reason: "Unknown",
          error: _
        }))
      : Stream.fail(internalError.transportError({
        method: "ClientResponse.stream",
        request: this.request,
        response: this,
        reason: "EmptyBody",
        error: "can not create stream from empty body"
      }))
  }

  get json(): Effect.Effect<never, Error.TransportError, unknown> {
    return Effect.tryPromise({
      try: () => this.source.json(),
      catch: (_) =>
        internalError.transportError({
          method: "ClientResponse.json",
          request: this.request,
          response: this,
          reason: "Decode",
          error: _
        })
    })
  }

  get text(): Effect.Effect<never, Error.TransportError, string> {
    return Effect.tryPromise({
      try: () => this.source.text(),
      catch: (_) =>
        internalError.transportError({
          method: "ClientResponse.text",
          request: this.request,
          response: this,
          reason: "Decode",
          error: _
        })
    })
  }

  get formData(): Effect.Effect<never, Error.TransportError, FormData> {
    return Effect.tryPromise({
      try: () => this.source.formData(),
      catch: (_) =>
        internalError.transportError({
          method: "ClientResponse.formData",
          request: this.request,
          response: this,
          reason: "Decode",
          error: _
        })
    })
  }

  get formDataStream(): Stream.Stream<never, Error.TransportError, FormData.Part> {
    return Stream.fail(internalError.transportError({
      method: "ClientResponse.formDataStream",
      request: this.request,
      response: this,
      reason: "Unknown",
      error: "not implemented"
    }))
  }

  get blob(): Effect.Effect<never, Error.TransportError, Blob> {
    return Effect.tryPromise({
      try: () => this.source.blob(),
      catch: (_) =>
        internalError.transportError({
          method: "ClientResponse.blob",
          request: this.request,
          response: this,
          reason: "Decode",
          error: _
        })
    })
  }
}
