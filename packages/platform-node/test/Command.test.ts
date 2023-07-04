import * as Chunk from "@effect/data/Chunk"
import { pipe } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import * as Exit from "@effect/io/Exit"
import * as Layer from "@effect/io/Layer"
import * as Command from "@effect/platform-node/Command"
import * as CommandExecutor from "@effect/platform-node/CommandExecutor"
import { SystemError } from "@effect/platform-node/Error"
import * as FileSystem from "@effect/platform-node/FileSystem"
import * as Stream from "@effect/stream/Stream"
import * as Path from "node:path"
import { describe, expect } from "vitest"

const TEST_BASH_SCRIPTS_DIRECTORY = Path.join(__dirname, "fixtures", "bash")

const runPromise = <E, A>(self: Effect.Effect<FileSystem.FileSystem | CommandExecutor.CommandExecutor, E, A>) =>
  Effect.runPromise(
    Effect.provideLayer(self, Layer.provideMerge(FileSystem.layer, CommandExecutor.layer))
  )

describe("Command", () => {
  it("should convert stdout to a string", () =>
    runPromise(Effect.gen(function*($) {
      const command = Command.make("echo", "-n", "test")
      const result = yield* $(Command.string(command))
      expect(result).toEqual("test")
    })))

  it("should convert stdout to a list of lines", () =>
    runPromise(Effect.gen(function*($) {
      const command = Command.make("echo", "-n", "1\n2\n3")
      const result = yield* $(Command.lines(command))
      expect(result).toEqual(["1", "2", "3"])
    })))

  it("should stream lines of output", () =>
    runPromise(Effect.gen(function*($) {
      const command = Command.make("echo", "-n", "1\n2\n3")
      const result = yield* $(Stream.runCollect(Command.streamLines(command)))
      expect(Array.from(result)).toEqual(["1", "2", "3"])
    })))

  it("should work with a Stream directly", () =>
    runPromise(Effect.gen(function*($) {
      const decoder = new TextDecoder("utf-8")
      const command = Command.make("echo", "-n", "1\n2\n3")
      const result = yield* $(
        Command.stream(command),
        Stream.mapChunks(Chunk.map((bytes) => decoder.decode(bytes))),
        Stream.splitLines,
        Stream.runCollect
      )
      expect(Array.from(result)).toEqual(["1", "2", "3"])
    })))

  it("should fail when trying to run a command that does not exist", () =>
    runPromise(Effect.gen(function*($) {
      const command = Command.make("some-invalid-command", "test")
      const result = yield* $(Effect.exit(Command.string(command)))
      expect(Exit.unannotate(result)).toEqual(Exit.fail(SystemError({
        reason: "NotFound",
        module: "Command",
        method: "spawn",
        pathOrDescriptor: "some-invalid-command test",
        syscall: "spawn some-invalid-command",
        message: "spawn some-invalid-command ENOENT"
      })))
    })))

  // TODO: cleanup this test
  it("should capture stderr and stdout separately", () =>
    runPromise(Effect.gen(function*($) {
      const command = pipe(
        Command.make("./duplex.sh"),
        Command.workingDirectory(TEST_BASH_SCRIPTS_DIRECTORY)
      )
      const process = yield* $(Command.start(command))
      const result = yield* $(pipe(
        process.stdout,
        Stream.zip(process.stderr),
        Stream.runCollect,
        Effect.map((bytes) => {
          const decoder = new TextDecoder("utf-8")
          return Array.from(bytes).flatMap(([left, right]) =>
            [
              decoder.decode(left),
              decoder.decode(right)
            ] as const
          )
        })
      ))
      expect(result).toEqual([
        "stdout1\nstdout2\n",
        "stderr1\nstderr2\n"
      ])
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

  it("should be able to kill a running process", () =>
    runPromise(Effect.gen(function*($) {
      const command = pipe(
        Command.make("./repeat.sh"),
        Command.workingDirectory(TEST_BASH_SCRIPTS_DIRECTORY)
      )
      const process = yield* $(Command.start(command))
      const isRunningBeforeKill = yield* $(process.isRunning)
      yield* $(process.kill())
      const isRunningAfterKill = yield* $(process.isRunning)
      expect(isRunningBeforeKill).toBe(true)
      expect(isRunningAfterKill).toBe(false)
    })))
})
