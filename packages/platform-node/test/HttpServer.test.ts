import { flow } from "@effect/data/Function"
import * as Option from "@effect/data/Option"
import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import { FileSystem } from "@effect/platform-node/FileSystem"
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

const Todo = Schema.struct({
  id: Schema.number,
  title: Schema.string
})
const IdParams = Schema.struct({
  id: Schema.NumberFromString
})
const todoResponse = Http.response.schemaJson(Todo)

const makeClient = Effect.map(
  Effect.all([Http.server.Server, HttpC.client.Client]),
  ([server, client]) =>
    HttpC.client.mapRequest(
      client,
      HttpC.request.prependUrl(`http://127.0.0.1:${(server.address as Http.server.TcpAddress).port}`)
    )
)
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
          Effect.flatMap(
            Http.router.schemaParams(IdParams),
            ({ id }) => todoResponse({ id, title: "test" })
          )
        ),
        Http.server.serve(),
        Effect.scoped,
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
            const request = yield* _(Http.request.ServerRequest)
            const formData = yield* _(request.formData)
            const file = formData.get("file") as globalThis.File
            expect(file.name.endsWith("/test.txt")).toEqual(true)
            expect(file.type).toEqual("text/plain")
            return yield* _(Http.response.json({ ok: formData.has("file") }))
          }).pipe(Effect.scoped)
        ),
        Http.server.serve(),
        Effect.scoped,
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

  it("schemaFormData", () =>
    Effect.gen(function*(_) {
      yield* _(
        Http.router.empty,
        Http.router.post(
          "/upload",
          Effect.gen(function*(_) {
            const files = yield* _(Http.request.schemaFormData(Schema.struct({
              file: Http.formData.filesSchema,
              test: Schema.string
            })))
            expect(files).toHaveProperty("file")
            expect(files).toHaveProperty("test")
            return Http.response.empty()
          }).pipe(Effect.scoped)
        ),
        Effect.tapErrorCause(Effect.logError),
        Http.server.serve(),
        Effect.scoped,
        Effect.fork
      )
      const client = yield* _(makeClient)
      const formData = new FormData()
      formData.append("file", new Blob(["test"], { type: "text/plain" }), "test.txt")
      formData.append("test", "test")
      const response = yield* _(
        client(HttpC.request.post("/upload", { body: HttpC.body.formData(formData) }))
      )
      expect(response.status).toEqual(204)
    }).pipe(runPromise))

  it("formData withMaxFileSize", () =>
    Effect.gen(function*(_) {
      yield* _(
        Http.router.empty,
        Http.router.post(
          "/upload",
          Effect.gen(function*(_) {
            const request = yield* _(Http.request.ServerRequest)
            yield* _(request.formData)
            return Http.response.empty()
          }).pipe(Effect.scoped)
        ),
        Effect.catchTag("FormDataError", (error) =>
          error.reason === "FileTooLarge" ?
            Effect.succeed(Http.response.empty({ status: 413 })) :
            Effect.fail(error)),
        Http.server.serve(),
        Http.formData.withMaxFileSize(Option.some(100)),
        Effect.scoped,
        Effect.fork
      )
      const client = yield* _(makeClient)
      const formData = new FormData()
      const data = new Uint8Array(1000)
      formData.append("file", new Blob([data], { type: "text/plain" }), "test.txt")
      const response = yield* _(
        client(HttpC.request.post("/upload", { body: HttpC.body.formData(formData) }))
      )
      expect(response.status).toEqual(413)
    }).pipe(runPromise))

  it("formData withMaxFieldSize", () =>
    Effect.gen(function*(_) {
      yield* _(
        Http.router.empty,
        Http.router.post(
          "/upload",
          Effect.gen(function*(_) {
            const request = yield* _(Http.request.ServerRequest)
            yield* _(request.formData)
            return Http.response.empty()
          }).pipe(Effect.scoped)
        ),
        Effect.catchTag("FormDataError", (error) =>
          error.reason === "FieldTooLarge" ?
            Effect.succeed(Http.response.empty({ status: 413 })) :
            Effect.fail(error)),
        Http.server.serve(),
        Http.formData.withMaxFieldSize(100),
        Effect.scoped,
        Effect.fork
      )
      const client = yield* _(makeClient)
      const formData = new FormData()
      const data = new Uint8Array(1000).fill(1)
      formData.append("file", new TextDecoder().decode(data))
      const response = yield* _(
        client(HttpC.request.post("/upload", { body: HttpC.body.formData(formData) }))
      )
      expect(response.status).toEqual(413)
    }).pipe(runPromise))

  it("mount", () =>
    Effect.gen(function*(_) {
      const child = Http.router.empty.pipe(
        Http.router.get("/", Effect.map(Http.request.ServerRequest, (_) => Http.response.text(_.url))),
        Http.router.get("/:id", Effect.map(Http.request.ServerRequest, (_) => Http.response.text(_.url)))
      )
      yield* _(
        Http.router.empty,
        Http.router.mount("/child", child),
        Http.server.serve(),
        Effect.scoped,
        Effect.fork
      )
      const client = yield* _(makeClient)
      const todo = yield* _(client(HttpC.request.get("/child/1")), Effect.flatMap((_) => _.text))
      expect(todo).toEqual("/1")
      const root = yield* _(client(HttpC.request.get("/child")), Effect.flatMap((_) => _.text))
      expect(root).toEqual("/")
    }).pipe(runPromise))

  it("mountApp", () =>
    Effect.gen(function*(_) {
      const child = Http.router.empty.pipe(
        Http.router.get("/", Effect.map(Http.request.ServerRequest, (_) => Http.response.text(_.url))),
        Http.router.get("/:id", Effect.map(Http.request.ServerRequest, (_) => Http.response.text(_.url)))
      )
      yield* _(
        Http.router.empty,
        Http.router.mountApp("/child", child),
        Http.server.serve(),
        Effect.scoped,
        Effect.fork
      )
      const client = yield* _(makeClient)
      const todo = yield* _(client(HttpC.request.get("/child/1")), Effect.flatMap((_) => _.text))
      expect(todo).toEqual("/1")
      const root = yield* _(client(HttpC.request.get("/child")), Effect.flatMap((_) => _.text))
      expect(root).toEqual("/")
    }).pipe(runPromise))

  it("file", () =>
    Effect.gen(function*(_) {
      const mtime = new Date(123456789)
      yield* _(
        Effect.succeed(
          yield* _(
            Http.response.file(`${__dirname}/fixtures/text.txt`),
            Effect.updateService(
              FileSystem,
              (fs) => ({
                ...fs,
                stat: (_) =>
                  Effect.map(
                    fs.stat(_),
                    (stat) => ({ ...stat, mtime: Option.some(mtime) })
                  )
              })
            )
          )
        ),
        Http.server.serve(),
        Effect.scoped,
        Effect.fork
      )
      const client = yield* _(makeClient)
      const res = yield* _(client(HttpC.request.get("/")))
      expect(res.status).toEqual(200)
      expect(res.headers["content-type"]).toEqual("text/plain")
      expect(res.headers["content-length"]).toEqual("27")
      expect(res.headers.etag).toEqual("\"1b-75bcd15\"")
      const text = yield* _(res.text)
      expect(text.trim()).toEqual("lorem ipsum dolar sit amet")
    }).pipe(runPromise))

  it("schemaBodyUrlParams", () =>
    Effect.gen(function*(_) {
      yield* _(
        Http.router.empty,
        Http.router.post(
          "/todos",
          Effect.flatMap(
            Http.request.schemaBodyUrlParams(Schema.struct({
              id: Schema.NumberFromString,
              title: Schema.string
            })),
            ({ id, title }) => todoResponse({ id, title })
          )
        ),
        Http.server.serve(),
        Effect.scoped,
        Effect.fork
      )
      const client = yield* _(makeTodoClient)
      const todo = yield* _(
        HttpC.request.post("/todos"),
        HttpC.request.urlParamsBody({ id: "1", title: "test" }),
        client
      )
      expect(todo).toEqual({ id: 1, title: "test" })
    }).pipe(runPromise))

  it("schemaBodyUrlParams error", () =>
    Effect.gen(function*(_) {
      yield* _(
        Http.router.empty,
        Http.router.get(
          "/todos",
          Effect.flatMap(
            Http.request.schemaBodyUrlParams(Schema.struct({
              id: Schema.NumberFromString,
              title: Schema.string
            })),
            ({ id, title }) => todoResponse({ id, title })
          )
        ),
        Http.router.catchTag("ParseError", (error) =>
          Effect.succeed(Http.response.unsafeJson({ error }, { status: 400 }))),
        Http.server.serve(),
        Effect.scoped,
        Effect.fork
      )
      const client = yield* _(makeClient)
      const response = yield* _(
        HttpC.request.get("/todos"),
        client
      )
      expect(response.status).toEqual(400)
    }).pipe(runPromise))
})
