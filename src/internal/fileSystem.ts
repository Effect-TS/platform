import * as Data from "@effect/data/Data"
import type {
  FileSystemError as FileSystemError_,
  FileSystemErrorId as FileSystemErrorId_
} from "@effect/platform/FileSystem"

/** @internal */
export const FileSystemErrorId: FileSystemErrorId_ = Symbol.for(
  "@effect/platform/FileSystemError"
) as FileSystemErrorId_

const FileSystemErrorTagged = Data.tagged<FileSystemError_>("FileSystemError")

/** @internal */
export const FileSystemError: Data.Case.Constructor<FileSystemError_, "_tag" | FileSystemErrorId_> = (_props) =>
  FileSystemErrorTagged({
    [FileSystemErrorId]: FileSystemErrorId
  })
