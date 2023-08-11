import * as Effect from "@effect/io/Effect"
import * as Http from "@effect/platform-node/HttpServer"
import { createServer } from "node:http"

const ServerLive = Http.server.layer(() => createServer(), { port: 3000 })
const response = Http.response.text("hello world")

Http.app.makeDefault((_req) => Effect.as(Effect.log("request"), response)).pipe(
  Http.middleware.apply(Http.middleware.loggerTracer),
  Http.server.serveJoin(),
  Effect.provideLayer(ServerLive),
  Effect.runPromise
)
