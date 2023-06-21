import * as Brand from "@effect/data/Brand"
import { Tag } from "@effect/data/Context"
import type * as Process from "@effect/platform/Process"

/** @internal */
export const ProcessTypeId: Process.ProcessTypeId = Symbol.for("@effect/platform/Process") as Process.ProcessTypeId

/** @internal */
export const ExitCode = Brand.nominal<Process.ExitCode>()

/** @internal */
export const ProcessExecutor = Tag<Process.ProcessExecutor>()

/** @internal */
export const makeExecutor = (start: Process.ProcessExecutor["start"]): Process.ProcessExecutor => ({
  start
})
