import * as Effect from "@effect/io/Effect"
import * as Http from "@effect/platform/HttpClient"
import { describe, it } from "vitest"

describe("HttpClient", () => {
  it(".", () =>
    Effect.gen(function*(_) {
      const response = yield* _(
        Http.request.get("https://www.google.com/"),
        Http.client.fetchOk(),
        Effect.flatMap((_) => _.text)
      )
      console.log(response)
    }).pipe(Effect.runPromise))
})
