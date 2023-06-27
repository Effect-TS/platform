import * as Effect from "@effect/io/Effect"
import * as FileSystem from "@effect/platform-node/FileSystem"
import * as Process from "@effect/platform-node/Process"
import * as Command from "@effect/platform/Process/Command"
import * as Stream from "@effect/stream/Stream"
import { describe, expect } from "vitest"

const runPromise = <E, A>(self: Effect.Effect<FileSystem.FileSystem, E, A>) =>
  Effect.runPromise(
    Effect.provideLayer(self, FileSystem.layer)
  )

describe("Process", () => {
  it("execute", () =>
    runPromise(Effect.gen(function*(_) {
      const command = Command.make("echo", "-n", "test")
      const result = yield* _(
        Process.executor.start(command),
        Effect.flatMap((process) => Stream.runCollect(process.stdout)),
        Effect.map((chunk) => Array.from(chunk).map((bytes) => Buffer.from(bytes).toString("utf-8")))
      )
      expect(result).toEqual(["test"])
    })))
})
