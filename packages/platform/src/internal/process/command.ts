import * as Chunk from "@effect/data/Chunk"
import { dual } from "@effect/data/Function"
import * as HashMap from "@effect/data/HashMap"
import * as Option from "@effect/data/Option"
import ReadonlyArray from "@effect/data/ReadonlyArray"
import type * as Command from "@effect/platform/Process/Command"
import * as Stream from "@effect/stream/Stream"

/** @internal */
export const CommandTypeId: Command.CommandTypeId = Symbol.for("@effect/platform/Command") as Command.CommandTypeId

/** @internal */
export const flatten = (self: Command.Command): ReadonlyArray.NonEmptyReadonlyArray<Command.StandardCommand> =>
  ReadonlyArray.fromIterable(flattenLoop(self)) as unknown as ReadonlyArray.NonEmptyReadonlyArray<
    Command.StandardCommand
  >

/** @internal */
const flattenLoop = (self: Command.Command): Chunk.NonEmptyChunk<Command.StandardCommand> => {
  switch (self._tag) {
    case "StandardCommand": {
      return Chunk.of(self)
    }
    case "PipedCommand": {
      return Chunk.concat(
        flattenLoop(self.left),
        flattenLoop(self.right)
      ) as Chunk.NonEmptyChunk<Command.StandardCommand>
    }
  }
}

/** @internal */
export const make = (command: string, ...args: Array<string>): Command.Command => ({
  [CommandTypeId]: CommandTypeId,
  _tag: "StandardCommand",
  command,
  args,
  env: HashMap.empty(),
  cwd: Option.none(),
  // The initial process input here does not matter, we just want the child
  // process to default to `"pipe"` for the stdin stream.
  stdin: Option.some(Stream.empty),
  stdout: "pipe",
  stderr: "pipe",
  gid: Option.none(),
  uid: Option.none()
  // redirectErrorStream: false
})

/** @internal */
export const env: {
  (environment: HashMap.HashMap<string, string>): (self: Command.Command) => Command.Command
  (self: Command.Command, environment: HashMap.HashMap<string, string>): Command.Command
} = dual<
  (environment: HashMap.HashMap<string, string>) => (self: Command.Command) => Command.Command,
  (self: Command.Command, environment: HashMap.HashMap<string, string>) => Command.Command
>(2, (self, environment) => {
  switch (self._tag) {
    case "StandardCommand": {
      return { ...self, env: HashMap.union(self.env, environment) }
    }
    case "PipedCommand": {
      return pipeTo(env(self.left, environment), env(self.right, environment))
    }
  }
})

/** @internal */
export const pipeTo = dual<
  (into: Command.Command) => (self: Command.Command) => Command.Command,
  (self: Command.Command, into: Command.Command) => Command.Command
>(2, (self, into) => ({
  [CommandTypeId]: CommandTypeId,
  _tag: "PipedCommand",
  left: self,
  right: into
}))

/** @internal */
export const stderr: {
  (stderr: Command.Command.Output): (self: Command.Command) => Command.Command
  (self: Command.Command, stderr: Command.Command.Output): Command.Command
} = dual<
  (stderr: Command.Command.Output) => (self: Command.Command) => Command.Command,
  (self: Command.Command, stderr: Command.Command.Output) => Command.Command
>(2, (self, output) => {
  switch (self._tag) {
    case "StandardCommand": {
      return { ...self, stderr: output }
    }
    // For piped commands it only makes sense to provide `stderr` for the
    // right-most command as the rest will be piped in.
    case "PipedCommand": {
      return { ...self, right: stderr(self.right, output) }
    }
  }
})

/** @internal */
export const stdin: {
  (stdin: Command.Command.Input): (self: Command.Command) => Command.Command
  (self: Command.Command, stdin: Command.Command.Input): Command.Command
} = dual<
  (stdin: Command.Command.Input) => (self: Command.Command) => Command.Command,
  (self: Command.Command, stdin: Command.Command.Input) => Command.Command
>(2, (self, input) => {
  switch (self._tag) {
    case "StandardCommand": {
      return { ...self, stdin: Option.some(input) }
    }
    // For piped commands it only makes sense to provide `stdin` for the
    // left-most command as the rest will be piped in.
    case "PipedCommand": {
      return { ...self, left: stdin(self.left, input) }
    }
  }
})

/** @internal */
export const stdout: {
  (stdout: Command.Command.Output): (self: Command.Command) => Command.Command
  (self: Command.Command, stdout: Command.Command.Output): Command.Command
} = dual<
  (stdout: Command.Command.Output) => (self: Command.Command) => Command.Command,
  (self: Command.Command, stdout: Command.Command.Output) => Command.Command
>(2, (self, output) => {
  switch (self._tag) {
    case "StandardCommand": {
      return { ...self, stdout: output }
    }
    // For piped commands it only makes sense to provide `stderr` for the
    // right-most command as the rest will be piped in.
    case "PipedCommand": {
      return { ...self, right: stdout(self.right, output) }
    }
  }
})

/** @internal */
export const workingDirectory: {
  (cwd: string): (self: Command.Command) => Command.Command
  (self: Command.Command, cwd: string): Command.Command
} = dual<
  (cwd: string) => (self: Command.Command) => Command.Command,
  (self: Command.Command, cwd: string) => Command.Command
>(2, (self, cwd) => {
  switch (self._tag) {
    case "StandardCommand": {
      return { ...self, cwd: Option.some(cwd) }
    }
    case "PipedCommand": {
      return pipeTo(workingDirectory(self.left, cwd), workingDirectory(self.right, cwd))
    }
  }
})
