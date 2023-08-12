import * as Effect from "@effect/io/Effect"
import * as Http from "@effect/platform-node/HttpServer"
import { runMain } from "@effect/platform-node/Runtime"
import { createServer } from "node:http"

const ServerLive = Http.server.layer(() => createServer(), { port: 3000 })
const response = Http.response.text("hello world")

Http.router.empty.pipe(
  Http.router.get("/", Effect.succeed(response)),
  Http.router.mountApp("/app", Http.app.makeDefault(() => Effect.succeed(response))),
  Http.router.toHttpApp,
  Http.server.respond,
  // Http.middleware.logger,
  Http.server.serve,
  Effect.provideLayer(ServerLive),
  Effect.tapErrorCause(Effect.logError),
  runMain
)
