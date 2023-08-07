import { pipe } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import * as Http from "@effect/platform/HttpClient"
import * as Schema from "@effect/schema/Schema"
import { describe, it } from "vitest"

describe("HttpClient", () => {
  it("google", () =>
    Effect.gen(function*(_) {
      const response = yield* _(
        Http.request.get("https://www.google.com/"),
        Http.client.fetchOk(),
        Effect.flatMap((_) => _.text)
      )
      expect(response).toContain("Google")
    }).pipe(Effect.runPromise))

  it("jsonplaceholder", () =>
    Effect.gen(function*(_) {
      const Todo = Schema.struct({
        userId: Schema.number,
        id: Schema.number,
        title: Schema.string,
        completed: Schema.boolean
      })
      const client = pipe(
        Http.client.fetchOk(),
        Http.client.mapRequest(Http.request.prependUrl("https://jsonplaceholder.typicode.com")),
        Http.client.mapEffect(Http.response.parse(Todo))
      )

      const response = yield* _(Http.request.get("/todos/1"), client)
      expect(response.id).toBe(1)
    }).pipe(Effect.runPromise))
})
