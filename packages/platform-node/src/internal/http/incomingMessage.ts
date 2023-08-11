import * as Effect from "@effect/io/Effect"
import * as NodeStream from "@effect/platform-node/Stream"
import * as Headers from "@effect/platform/Http/Headers"
import * as IncomingMessage from "@effect/platform/Http/IncomingMessage"
import type * as Stream from "@effect/stream/Stream"
import type * as Http from "node:http"
import { Readable } from "node:stream"

/** @internal */
export class IncomingMessageImpl<E> implements IncomingMessage.IncomingMessage<E> {
  readonly [IncomingMessage.TypeId]: IncomingMessage.TypeId = IncomingMessage.TypeId

  constructor(
    readonly source: Http.IncomingMessage,
    readonly onError: (error: unknown) => E
  ) {}

  get headers() {
    return Headers.fromInput(this.source.headers as any)
  }

  get text(): Effect.Effect<never, E, string> {
    return NodeStream.toString(() => this.source, this.onError)
  }

  get json(): Effect.Effect<never, E, unknown> {
    return Effect.tryMap(this.text, {
      try: (_) => JSON.parse(_) as unknown,
      catch: this.onError
    })
  }

  get formData(): Effect.Effect<never, E, FormData> {
    return Effect.tryPromise({
      try: () =>
        new Response(Readable.toWeb(this.source) as any, {
          headers: new globalThis.Headers(this.source.headers as any),
          status: this.source.statusCode,
          statusText: this.source.statusMessage
        }).formData(),
      catch: this.onError
    })
  }

  get stream(): Stream.Stream<never, E, Uint8Array> {
    return NodeStream.fromReadable<E, Uint8Array>(
      () => this.source,
      this.onError
    )
  }

  get arrayBuffer(): Effect.Effect<never, E, ArrayBuffer> {
    return NodeStream.toUint8Array(() => this.source, this.onError)
  }
}
