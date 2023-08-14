import { flow } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import * as HttpC from "@effect/platform-node/HttpClient"
import * as Http from "@effect/platform-node/HttpServer"
import * as NodeContext from "@effect/platform-node/NodeContext"
import * as Schema from "@effect/schema/Schema"
import { createServer } from "http"
import { describe, it } from "vitest"

const ServerLive = Http.server.layer(createServer, { port: 0 })
const EnvLive = Layer.mergeAll(
  NodeContext.layer,
  ServerLive,
  Layer.provide(HttpC.nodeClient.makeAgentLayer({ keepAlive: false }), HttpC.nodeClient.layerWithoutAgent)
)
const runPromise = flow(Effect.provideLayer(EnvLive), Effect.runPromise)
const makeClient = Effect.map(
  Effect.all([Http.server.Server, HttpC.client.Client]),
  ([server, client]) =>
    HttpC.client.mapRequest(
      client,
      HttpC.request.prependUrl(`http://127.0.0.1:${(server.address as Http.server.TcpAddress).port}`)
    )
)
const Todo = Schema.struct({
  id: Schema.number,
  title: Schema.string
})
const IdParams = Schema.struct({
  id: Schema.NumberFromString
})
const todoResponse = Http.response.schemaJson(Todo)
const makeTodoClient = Effect.map(
  makeClient,
  HttpC.client.mapEffect(
    HttpC.response.schemaBodyJson(Todo)
  )
)

describe("HttpServer", () => {
  it("schema", () =>
    Effect.gen(function*(_) {
      yield* _(
        Http.router.empty,
        Http.router.get(
          "/todos/:id",
          Effect.map(
            Http.router.schemaParams(IdParams),
            ({ id }) => todoResponse({ id, title: "test" })
          )
        ),
        Http.router.toHttpApp,
        Http.server.respondServe,
        Effect.fork
      )
      const client = yield* _(makeTodoClient)
      const todo = yield* _(client(HttpC.request.get("/todos/1")))
      expect(todo).toEqual({ id: 1, title: "test" })
    }).pipe(runPromise))

  it("formData", () =>
    Effect.gen(function*(_) {
      yield* _(
        Http.router.empty,
        Http.router.post(
          "/upload",
          Effect.gen(function*(_) {
            const request = yield* _(Http.router.request)
            const formData = yield* _(request.formData)
            const file = formData.get("file") as globalThis.File
            expect(file.name.endsWith("/test.txt")).toEqual(true)
            expect(file.type).toEqual("text/plain")
            return Http.response.json({ ok: formData.has("file") })
          }).pipe(Effect.scoped)
        ),
        Http.router.toHttpApp,
        Http.server.respondServe,
        Effect.fork
      )
      const client = yield* _(makeClient)
      const formData = new FormData()
      formData.append("file", new Blob(["test"], { type: "text/plain" }), "test.txt")
      const result = yield* _(
        client(HttpC.request.post("/upload", { body: HttpC.body.formData(formData) })),
        Effect.flatMap((_) => _.json)
      )
      expect(result).toEqual({ ok: true })
    }).pipe(runPromise))
})
