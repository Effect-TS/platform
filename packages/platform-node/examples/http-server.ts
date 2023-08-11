import * as Effect from "@effect/io/Effect"
import * as Http from "@effect/platform-node/HttpServer"
import { createServer } from "node:http"

const ServerLive = Http.server.layer(() => createServer(), { port: 3000 })

Http.app.makeDefault((_req) => Effect.succeed(Http.response.text("hello world"))).pipe(
  Http.server.serveJoin(),
  Effect.provideLayer(ServerLive),
  Effect.runPromise
)
