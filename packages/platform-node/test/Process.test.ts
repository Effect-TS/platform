import { pipe } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import * as Command from "@effect/platform-node/Command"
import * as FileSystem from "@effect/platform-node/FileSystem"
import * as Process from "@effect/platform-node/Process"
import * as Stream from "@effect/stream/Stream"
import { describe, expect } from "vitest"

const runPromise = <E, A>(self: Effect.Effect<FileSystem.FileSystem | Process.ProcessExecutor, E, A>) =>
  Effect.runPromise(
    Effect.provideLayer(self, Layer.provideMerge(FileSystem.layer, Process.layer))
  )

describe("Process", () => {
  it("start", () =>
    runPromise(Effect.gen(function*(_) {
      const command = Command.make("echo", "-n", "test")
      const result = yield* _(
        Command.start(command),
        Effect.flatMap((process) => Stream.runCollect(process.stdout)),
        Effect.map((chunk) => Array.from(chunk).map((bytes) => Buffer.from(bytes).toString("utf-8")))
      )
      expect(result).toEqual(["test"])
    })))

  it("should accept streaming stdin", () =>
    runPromise(Effect.gen(function*(_) {
      const stdin = Stream.make(Buffer.from("a b c", "utf-8"))
      const command = pipe(Command.make("cat"), Command.stdin(stdin))
      const result = yield* _(
        Command.start(command),
        Effect.flatMap((process) => Stream.runCollect(process.stdout)),
        Effect.map((chunk) => Array.from(chunk).map((bytes) => Buffer.from(bytes).toString("utf-8")))
      )
      expect(result).toEqual(["a b c"])
    })))

  it("should support piping commands together", () =>
    runPromise(Effect.gen(function*(_) {
      const command = pipe(
        Command.make("echo", "2\n1\n3"),
        Command.pipeTo(Command.make("cat")),
        Command.pipeTo(Command.make("sort"))
      )
      const result = yield* _(
        Command.start(command),
        Effect.flatMap((process) => Stream.runCollect(process.stdout)),
        Effect.map((chunk) => Array.from(chunk).map((bytes) => Buffer.from(bytes).toString("utf-8")))
      )
      // TODO: command.lines
      expect(result).toEqual(["1\n2\n3\n"])
    })))
})
