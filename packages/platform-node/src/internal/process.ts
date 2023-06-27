import { constUndefined, pipe } from "@effect/data/Function"
import * as Option from "@effect/data/Option"
import * as Effect from "@effect/io/Effect"
import { fromWritable } from "@effect/platform-node/internal/sink"
import { fromReadable } from "@effect/platform-node/internal/stream"
import type { PlatformError } from "@effect/platform/Error"
import * as FileSystem from "@effect/platform/FileSystem"
import * as Process from "@effect/platform/Process"
// import * as Command from "@effect/platform/Process/Command"
import * as Sink from "@effect/stream/Sink"
import * as ChildProcess from "node:child_process"

/** @internal */
export const executor: Process.ProcessExecutor = Process.makeExecutor((command) =>
  Effect.flatMap(FileSystem.FileSystem, (fileSystem) => {
    switch (command._tag) {
      case "StandardCommand": {
        return pipe(
          // Validate that the directory is accessible
          Effect.forEachOption(command.cwd, (dir) => fileSystem.access(dir)),
          Effect.zipRight(Effect.sync(() => globalThis.process.env)),
          Effect.flatMap((env) =>
            Effect.asyncInterrupt<never, Error, Process.Process>((resume) => {
              const handle = ChildProcess.spawn(command.command, command.args, {
                // TODO: handle Command.stdin
                stdio: ["pipe", command.stdout, command.stderr],
                cwd: Option.getOrElse(command.cwd, constUndefined),
                env: { ...env, ...Object.fromEntries(command.env) }
              })

              // If starting the process throws an error, make sure to capture it
              handle.on("error", (err) => {
                handle.kill("SIGKILL")
                resume(Effect.fail(err))
              })

              // If the process is assigned a process identifier, then we know it
              // was spawned successfully
              if (handle.pid) {
                let stdin: Sink.Sink<never, PlatformError, unknown, never, void> = Sink.drain()

                if (handle.stdin !== null) {
                  stdin = fromWritable(() => handle.stdin!, (e) => e as PlatformError)
                }
                // if (handle.stderr !== null) {
                //   proc.stderr.pipe(passThroughStderr)
                // }
                // if (handle.stdout !== null) {
                //   if (command.redirectErrorStream) {
                //     proc.stdout.pipe(passThroughStdout, { end: false })
                //     passThroughStderr.pipe(passThroughStdout)
                //   } else {
                //     proc.stdout.pipe(passThroughStdout)
                //   }
                // }

                const stderr = fromReadable<PlatformError, Buffer>(() => handle.stderr!, (e) => e as any)
                const stdout = fromReadable<PlatformError, Buffer>(() => handle.stdout!, (e) => e as any)

                resume(Effect.succeed<Process.Process>({
                  [Process.ProcessTypeId]: Process.ProcessTypeId,
                  pid: handle.pid! as Process.Process.Id,
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
          )
          // TODO: handle stdin
          //           T.tap((proc) =>
          //             O.fold_(
          //               c.stdin.source,
          //               () => T.unit,
          //               (input) => T.forkDaemon(S.run_(input, proc.stdin))
          //             )
          //           )
        )
      }
      case "PipedCommand": {
        return {} as any
        // TODO: handle stdin
        // const flattened = Command.flatten(command)
        // if (flattened.length === 1) {
        //   return executor.start(flattened[0])
        // }
        // const head = flattened[0]
        // const tail = flattened.slice(1)
        // const flushChunksEagerly = false

        // c.flatten match {
        //   case chunk if chunk.length == 1 => chunk.head.run
        //   case chunk                      =>
        //     val flushChunksEagerly = chunk.head.stdin match {
        //       case ProcessInput.FromStream(_, eager)        => eager
        //       case ProcessInput.Inherit | ProcessInput.Pipe => false
        //     }

        //     val stream = chunk.tail.init.foldLeft(chunk.head.stream) { case (s, command) =>
        //       command.stdin(ProcessInput.fromStream(s, flushChunksEagerly)).stream
        //     }

        //     chunk.last.stdin(ProcessInput.fromStream(stream, flushChunksEagerly)).run
        // }
      }
    }
  })
)
