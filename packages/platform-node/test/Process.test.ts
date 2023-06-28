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
    runPromise(Effect.gen(function*($) {
      const command = Command.make("echo", "-n", "test")
      const result = yield* $(Command.string(command))
      expect(result).toEqual("test")
    })))

  it("should accept streaming stdin", () =>
    runPromise(Effect.gen(function*($) {
      const stdin = Stream.make(Buffer.from("a b c", "utf-8"))
      const command = pipe(Command.make("cat"), Command.stdin(stdin))
      const result = yield* $(Command.string(command))
      expect(result).toEqual("a b c")
    })))

  it("should accept string stdin", () =>
    runPromise(Effect.gen(function*($) {
      const stdin = "piped in"
      const command = pipe(Command.make("cat"), Command.feed(stdin))
      const result = yield* $(Command.string(command))
      expect(result).toEqual("piped in")
    })))

  it("should support piping commands together", () =>
    runPromise(Effect.gen(function*($) {
      const command = pipe(
        Command.make("echo", "2\n1\n3"),
        Command.pipeTo(Command.make("cat")),
        Command.pipeTo(Command.make("sort"))
      )
      const result = yield* $(Command.string(command))
      // TODO: command.lines
      expect(result).toEqual("1\n2\n3\n")
    })))
})
