/**
 * @since 1.0.0
 */

export type {
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
} from "@effect/platform/CommandExecutor"

export {
  CommandExecutor,
  /**
   * @since 1.0.0
   * @category layer
   */
  layer
} from "@effect/platform-node/CommandExecutor"
