/**
 * @since 1.0.0
 */
import type { Layer } from "@effect/io/Layer"
import * as internal from "@effect/platform-node/internal/process"
import type { FileSystem } from "@effect/platform/FileSystem"
import type { ProcessExecutor } from "@effect/platform/Process"

export type {
  /**
   * @since 1.0.0
   * @category models
   */
  ExitCode,
  /**
   * @since 1.0.0
   * @category models
   */
  Process,
  /**
   * @since 1.0.0
   * @category models
   */
  ProcessId,
  /**
   * @since 1.0.0
   * @category symbols
   */
  ProcessTypeId,
  /**
   * @since 1.0.0
   * @category models
   */
  Signal
} from "@effect/platform/Process"

export {
  /**
   * @since 1.0.0
   * @category tag
   */
  ProcessExecutor
} from "@effect/platform/Process"

/**
 * @since 1.0.0
 * @category layer
 */
export const layer: Layer<FileSystem, never, ProcessExecutor> = internal.layer
