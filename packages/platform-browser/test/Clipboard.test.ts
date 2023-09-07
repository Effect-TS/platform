import * as Effect from "@effect/io/Effect"
import * as _ from "@effect/platform-browser/Clipboard"

describe("Clipboard", () => {
  const run = <E, A>(effect: Effect.Effect<_.Clipboard, E, A>) =>
    Effect.runPromise(Effect.provideLayer(effect, _.layerLive))

  it("writeString, readString", () =>
    run(Effect.gen(function*($) {
      const cb = yield* $(_.Clipboard)
      yield* $(cb.writeString("test"))
      const val = yield* $(cb.readString)

      expect(val).toBe("tes")
    })))
})
