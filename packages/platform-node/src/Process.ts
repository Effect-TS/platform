import * as internal from "@effect/platform-node/internal/process"
import type * as Process from "@effect/platform/Process"

/**
 * @since 1.0.0
 * @category execution
 */
export const executor: Process.ProcessExecutor = internal.executor
