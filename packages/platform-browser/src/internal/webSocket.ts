/**
 * @since 1.0.0
 */
import * as PlatformError from "@effect/platform/Error"
import * as Socket from "@effect/platform/WebSocket"
import * as Chunk from "effect/Chunk"
import * as Effect from "effect/Effect"
import * as Layer from "effect/Layer"
import * as Option from "effect/Option"
import * as Stream from "effect/Stream"

const make = (impl: Omit<Socket.Socket, Socket.TypeId>) =>
  Socket.Socket.of({
    [Socket.TypeId]: Socket.TypeId,
    ...impl
  })

const closedByHostError = PlatformError.SystemError({
  module: "WebSocket",
  reason: "BadResource",
  message: "Socket was closed by host",
  method: "",
  pathOrDescriptor: ""
})

/** @internal */
const createSocket = (url: string | URL) =>
  Effect.acquireRelease(
    Effect.flatMap(
      Effect.try({
        try: () => new WebSocket(url),
        catch: () =>
          PlatformError.SystemError({
            module: "WebSocket",
            reason: "InvalidData",
            message: "Unable to create WebSocket. Invalid host.",
            method: "",
            pathOrDescriptor: ""
          })
      }),
      (socket) =>
        Effect.async<never, PlatformError.PlatformError, WebSocket>((resume) => {
          socket.addEventListener("close", () => { 
            resume(Effect.fail(closedByHostError))
          })
          socket.addEventListener("open", () => {
            resume(Effect.succeed(socket))
          })
        })
    ),
    (s) => Effect.succeed(s.close(1000))
  )

/**
 * @since 1.0.0
 */
export const layer = (url: string | URL): Layer.Layer<never, PlatformError.PlatformError, Socket.Socket> =>
  Layer.scoped(
    Socket.Socket,
    Effect.gen(function*(_) {
      const socket = yield* _(createSocket(url))

      // Safe as long as the socket is fully connected.
      const send = (data: string | Blob) => Effect.sync(() => socket.send(data))

      const messages = Stream.async<never, never, string | Blob | ArrayBuffer>((emit) => {
        socket.addEventListener("message", (event) => {
          emit(Effect.succeed(Chunk.of(event.data as string | Blob | ArrayBuffer)))
        })
        socket.addEventListener("close", () => {
          emit(Effect.fail(Option.none()))
        })
      })

      const errors = Stream.async<never, never, Event>((emit) => {
        socket.addEventListener("error", (event) => {
          emit(Effect.succeed(Chunk.of(event)))
        })

        socket.addEventListener("close", () => {
          emit(Effect.fail(Option.none()))
        })
      })

      return make({ send, messages, errors })
    })
  )
