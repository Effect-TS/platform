/**
 * @since 1.0.0
 */
import { pipe } from "effect/Function"
import * as Layer from "effect/Layer"
import * as CommandExecutor from "./CommandExecutor.js"
import * as FileSystem from "./FileSystem.js"
import * as Path from "./Path.js"
import * as Worker from "./Worker.js"

/**
 * @since 1.0.0
 * @category models
 */
export type BunContext =
  | CommandExecutor.CommandExecutor
  | FileSystem.FileSystem
  | Path.Path
  | Worker.WorkerManager

/**
 * @since 1.0.0
 * @category layer
 */
export const layer: Layer.Layer<never, never, BunContext> = pipe(
  FileSystem.layer,
  Layer.merge(Path.layer),
  Layer.merge(Layer.provideMerge(FileSystem.layer, CommandExecutor.layer)),
  Layer.merge(Worker.layerManager)
)
