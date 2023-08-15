import * as Effect from "@effect/io/Effect"
import * as Http from "@effect/platform-node/HttpServer"
import { runMain } from "@effect/platform-node/Runtime"
import { createServer } from "node:http"

const ServerLive = Http.server.layer(() => createServer(), { port: 3000 })

Http.router.empty.pipe(
  Http.router.get(
    "/",
    Effect.map(
      Http.request.ServerRequest,
      (req) => Http.response.text(req.url)
    )
  ),
  Http.server.serve(),
  Effect.scoped,
  Effect.provideLayer(ServerLive),
  Effect.tapErrorCause(Effect.logError),
  runMain
)
