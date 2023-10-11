import * as NodeStream from "@effect/platform-node/Stream"
import { Chunk, Stream } from "effect"
import * as Effect from "effect/Effect"
import { Readable, Transform } from "stream"
import { describe, it } from "vitest"

describe("Stream", () => {
  it("should read a stream", () =>
    Effect.gen(function*(_) {
      const stream = NodeStream.fromReadable<"error", string>(() => Readable.from(["a", "b", "c"]), () => "error")
      const items = yield* _(Stream.runCollect(stream))
      assert.deepEqual(
        Chunk.toReadonlyArray(items),
        ["a", "b", "c"]
      )
    }).pipe(Effect.runPromise))

  it("fromDuplex", () =>
    Effect.gen(function*(_) {
      const channel = NodeStream.fromDuplex<never, "error", string>(
        () =>
          new Transform({
            transform(chunk, _encoding, callback) {
              callback(null, chunk.toString().toUpperCase())
            }
          }),
        () => "error"
      )

      const items = yield* _(
        Stream.make("a", "b", "c"),
        Stream.pipeThroughChannelOrFail(channel),
        Stream.decodeText(),
        Stream.runCollect
      )

      assert.deepEqual(
        Chunk.toReadonlyArray(items),
        ["A", "B", "C"]
      )
    }).pipe(Effect.runPromise))

  it("fromDuplex failure", () =>
    Effect.gen(function*(_) {
      const channel = NodeStream.fromDuplex<never, "error", string>(
        () =>
          new Transform({
            transform(_chunk, _encoding, callback) {
              callback(new Error())
            }
          }),
        () => "error"
      )

      const result = yield* _(
        Stream.make("a", "b", "c"),
        Stream.pipeThroughChannelOrFail(channel),
        Stream.runDrain,
        Effect.flip
      )

      assert.strictEqual(result, "error")
    }).pipe(Effect.runPromise))

  it("pipeThroughDuplex", () =>
    Effect.gen(function*(_) {
      const result = yield* _(
        Stream.make("a", "b", "c"),
        NodeStream.pipeThroughDuplex(
          () =>
            new Transform({
              transform(chunk, _encoding, callback) {
                callback(null, chunk.toString().toUpperCase())
              }
            }),
          () => "error" as const
        ),
        Stream.decodeText(),
        Stream.runCollect
      )

      assert.deepEqual(
        Chunk.toReadonlyArray(result),
        ["A", "B", "C"]
      )
    }).pipe(Effect.runPromise))
})
