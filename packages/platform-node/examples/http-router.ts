import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import * as Http from "@effect/platform-node/HttpServer"
import * as NodeContext from "@effect/platform-node/NodeContext"
import { runMain } from "@effect/platform-node/Runtime"
import * as Schema from "@effect/schema/Schema"
import { createServer } from "node:http"

const ServerLive = Http.server.layer(() => createServer(), { port: 3000 })

const serve = Http.router.empty.pipe(
  Http.router.get(
    "/",
    Effect.map(
      Http.request.ServerRequest,
      (req) => Http.response.text(req.url)
    )
  ),
  Http.router.post(
    "/upload",
    Effect.gen(function*(_) {
      const data = yield* _(Http.request.schemaFormData(Schema.struct({
        files: Http.request.filesSchema
      })))
      console.log("got files", data.files)
      return Http.response.empty()
    })
  ),
  Http.server.serve(Http.middleware.logger)
)

const HttpLive = Layer.scopedDiscard(serve).pipe(
  Layer.use(ServerLive),
  Layer.use(NodeContext.layer)
)

Layer.launch(HttpLive).pipe(
  Effect.tapErrorCause(Effect.logError),
  runMain
)
