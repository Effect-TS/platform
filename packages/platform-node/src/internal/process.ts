import { constUndefined, pipe } from "@effect/data/Function"
import * as Option from "@effect/data/Option"
import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import { fromWritable } from "@effect/platform-node/internal/sink"
import { fromReadable } from "@effect/platform-node/internal/stream"
import * as Command from "@effect/platform/Command"
import type { PlatformError } from "@effect/platform/Error"
import * as FileSystem from "@effect/platform/FileSystem"
import * as Process from "@effect/platform/Process"
import * as Sink from "@effect/stream/Sink"
import * as Stream from "@effect/stream/Stream"
import * as ChildProcess from "node:child_process"

const toStdioOption = (stdin: Option.Option<Command.Command.Input>): "pipe" | "inherit" =>
  Option.match(stdin, () => "inherit", () => "pipe")

// TODO: Handle errors properly
const runCommand = (fileSystem: FileSystem.FileSystem) =>
  (command: Command.Command): Effect.Effect<never, PlatformError, Process.Process> => {
    switch (command._tag) {
      case "StandardCommand": {
        return pipe(
          // Validate that the directory is accessible
          Effect.forEachOption(command.cwd, (dir) => fileSystem.access(dir)),
          Effect.zipRight(Effect.sync(() => globalThis.process.env)),
          Effect.flatMap((env) =>
            Effect.asyncInterrupt<never, PlatformError, Process.Process>((resume) => {
              const handle = ChildProcess.spawn(command.command, command.args, {
                stdio: [toStdioOption(command.stdin), command.stdout, command.stderr],
                cwd: Option.getOrElse(command.cwd, constUndefined),
                env: { ...env, ...Object.fromEntries(command.env) }
              })

              // If starting the process throws an error, make sure to capture it
              handle.on("error", (err) => {
                handle.kill("SIGKILL")
                resume(Effect.fail(err as unknown as PlatformError))
              })

              // If the process is assigned a process identifier, then we know it
              // was spawned successfully
              if (handle.pid) {
                let stdin: Sink.Sink<never, PlatformError, unknown, never, void> = Sink.drain()

                if (handle.stdin !== null) {
                  stdin = fromWritable(() => handle.stdin!, (e) => e as PlatformError)
                }

                const pid = Process.ProcessId(handle.pid)
                const stderr = fromReadable<PlatformError, Buffer>(() => handle.stderr!, (e) => e as any)
                const stdout = fromReadable<PlatformError, Buffer>(() => handle.stdout!, (e) => e as any)

                const exitCode: Process.Process["exitCode"] = Effect.asyncInterrupt((resume) => {
                  handle.on("exit", (code, signal) => {
                    if (code !== null) {
                      resume(Effect.succeed(Process.ExitCode(code)))
                    } else {
                      // If code is `null`, then `signal` must be defined. See the NodeJS
                      // documentation for the `"exit"` event on a `child_process`.
                      // https://nodejs.org/api/child_process.html#child_process_event_exit
                      // TODO: fixme
                      resume(
                        Effect.fail(
                          new Error(
                            `Process interrupted due to receipt of signal: ${signal}`
                          ) as unknown as PlatformError
                        )
                      )
                    }
                  })
                  // Make sure to terminate the running process if the fiber is
                  // terminated
                  return Effect.sync(() => {
                    handle.kill("SIGKILL")
                  })
                })

                const isRunning = Effect.sync(() =>
                  handle.exitCode === null &&
                  handle.signalCode === null &&
                  !handle.killed
                )

                const kill: Process.Process["kill"] = (signal = "SIGTERM") =>
                  // TODO: refine or die?
                  Effect.asyncInterrupt((resume) => {
                    handle.kill(signal)
                    handle.on("exit", () => {
                      resume(Effect.unit())
                    })
                    // Make sure to terminate the running process if the fiber
                    // is terminated
                    return Effect.sync(() => {
                      handle.kill("SIGKILL")
                    })
                  })

                resume(Effect.succeed<Process.Process>({
                  [Process.ProcessTypeId]: Process.ProcessTypeId,
                  pid,
                  exitCode,
                  isRunning,
                  kill,
                  stdin,
                  stderr,
                  stdout
                }))
              }
              return Effect.async<never, never, void>((resume) => {
                if (handle.pid) {
                  handle.kill("SIGTERM")
                }
                handle.on("exit", () => {
                  resume(Effect.unit())
                })
              })
            })
          ),
          Effect.tap((process) =>
            Option.match(
              command.stdin,
              () => Effect.unit(),
              (stdin) => Effect.forkDaemon(Stream.run(stdin, process.stdin))
            )
          )
        )
      }
      case "PipedCommand": {
        const flattened = Command.flatten(command)
        if (flattened.length === 1) {
          return pipe(flattened[0], runCommand(fileSystem))
        }
        const head = flattened[0]
        const tail = flattened.slice(1)
        const initial = tail.slice(0, tail.length - 1)
        const last = tail[tail.length - 1]
        const stream = initial.reduce(
          (stdin, command) =>
            pipe(
              Command.stdin(command, stdin),
              runCommand(fileSystem),
              Stream.flatMap((process) => process.stdout)
            ),
          pipe(
            runCommand(fileSystem)(head),
            Stream.flatMap((process) => process.stdout)
          )
        )
        return pipe(Command.stdin(last, stream), runCommand(fileSystem))
      }
    }
  }

/** @internal */
export const layer: Layer.Layer<FileSystem.FileSystem, never, Process.ProcessExecutor> = Layer.effect(
  Process.ProcessExecutor,
  pipe(
    FileSystem.FileSystem,
    Effect.map((fileSystem) => Process.makeExecutor(runCommand(fileSystem)))
  )
)
