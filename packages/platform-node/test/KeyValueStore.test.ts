import { pipe } from "@effect/data/Function"
import * as Option from "@effect/data/Option"
import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import * as Fs from "@effect/platform-node/FileSystem"
import * as Path from "@effect/platform-node/Path"
import * as Kv from "@effect/platform/KeyValueStore"

export const run = <E, A>(self: Effect.Effect<Kv.KeyValueStore, E, A>) =>
  Effect.runPromise(pipe(
    Effect.provideLayer(self, Kv.layerFileSystem(`${__dirname}/fixtures/kv`)),
    Effect.provideLayer(Layer.merge(Fs.layer, Path.layer))
  ))

describe("KeyValueStore / layerFileSystem", () => {
  it("set", () =>
    run(Effect.gen(function*(_) {
      const kv = yield* _(Kv.KeyValueStore)
      yield* _(kv.set("foo", "bar"))

      const value = yield* _(kv.get("foo"))
      const length = yield* _(kv.size)

      expect(value).toEqual(Option.some("bar"))
      expect(length).toEqual(1)
    })))

  it("get/ missing", () =>
    run(Effect.gen(function*(_) {
      const kv = yield* _(Kv.KeyValueStore)
      yield* _(kv.clear)
      const value = yield* _(kv.get("foo"))

      expect(value).toEqual(Option.none())
    })))

  it("remove", () =>
    run(Effect.gen(function*(_) {
      const kv = yield* _(Kv.KeyValueStore)
      yield* _(kv.clear)

      yield* _(kv.set("foo", "bar"))
      yield* _(kv.remove("foo"))

      const value = yield* _(kv.get("foo"))
      const length = yield* _(kv.size)

      expect(value).toEqual(Option.none())
      expect(length).toEqual(0)
    })))

  it("clear", () =>
    run(Effect.gen(function*(_) {
      const kv = yield* _(Kv.KeyValueStore)
      yield* _(kv.set("foo", "bar"))
      yield* _(kv.clear)

      const value = yield* _(kv.get("foo"))
      const length = yield* _(kv.size)

      expect(value).toEqual(Option.none())
      expect(length).toEqual(0)
    })))

  it("modify", () =>
    run(Effect.gen(function*(_) {
      const kv = yield* _(Kv.KeyValueStore)
      yield* _(kv.clear)
      yield* _(kv.set("foo", "bar"))

      const value = yield* _(kv.modify("foo", (v) => v + "bar"))
      const length = yield* _(kv.size)

      expect(value).toEqual(Option.some("barbar"))
      expect(length).toEqual(1)
    })))

  it("modify - none", () =>
    run(Effect.gen(function*(_) {
      const kv = yield* _(Kv.KeyValueStore)
      yield* _(kv.clear)

      const value = yield* _(kv.modify("foo", (v) => v + "bar"))
      const length = yield* _(kv.size)

      expect(value).toEqual(Option.none())
      expect(length).toEqual(0)
    })))
})
