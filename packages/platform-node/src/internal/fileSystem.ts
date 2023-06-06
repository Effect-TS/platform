import { pipe } from "@effect/data/Function"
import * as Effect from "@effect/io/Effect"
import { effectify } from "@effect/platform/Effectify"
import * as Error from "@effect/platform/Error"
import * as FileSystem from "@effect/platform/FileSystem"
import * as File from "@effect/platform/FileSystem/File"
import * as Crypto from "node:crypto"
import * as NFS from "node:fs"
import * as OS from "node:os"
import * as Path from "node:path"

const handleErrnoException = (method: string) =>
  (err: NodeJS.ErrnoException, [path]: [path: NFS.PathLike, ...args: Array<any>]) => {
    let reason: Error.SystemErrorReason = "Unknown"

    switch (err.code) {
      case "ENOENT":
        reason = "NotFound"
        break

      case "EACCES":
        reason = "PermissionDenied"
        break

      case "EEXIST":
        reason = "AlreadyExists"
        break

      case "EISDIR":
        reason = "BadResource"
        break

      case "ENOTDIR":
        reason = "BadResource"
        break

      case "EBUSY":
        reason = "Busy"
        break

      case "ELOOP":
        reason = "BadResource"
        break
    }

    return Error.SystemError({
      reason,
      module: "FileSystem",
      method,
      pathOrDescriptor: path.toString(),
      syscall: err.syscall,
      message: err.message
    })
  }

const handleBadArgument = (method: string) =>
  (err: unknown) =>
    Error.BadArgument({
      module: "FileSystem",
      method,
      message: (err as Error).message ?? String(err)
    })

const nodeAccess = effectify(NFS.access, handleErrnoException("access"), handleBadArgument("access"))
const nodeCopyFile = effectify(NFS.copyFile, handleErrnoException("copyFile"), handleBadArgument("copyFile"))
const nodeChmod = effectify(NFS.chmod, handleErrnoException("chmod"), handleBadArgument("chmod"))
const nodeChown = effectify(NFS.chown, handleErrnoException("chown"), handleBadArgument("chown"))
const nodeLink = effectify(NFS.link, handleErrnoException("link"), handleBadArgument("link"))
const nodeMkdir = effectify(NFS.mkdir, handleErrnoException("makeDirectory"), handleBadArgument("makeDirectory"))
const nodeMkdtemp = (method: string) =>
  effectify(
    NFS.mkdtemp,
    handleErrnoException(method),
    handleBadArgument(method)
  )

const remove = (method: string) => {
  const nodeRm = effectify(NFS.rm, handleErrnoException(method), handleBadArgument(method))
  return (path: string, options?: FileSystem.RemoveOptions) => nodeRm(path, { recursive: options?.recursive ?? false })
}

const makeTempDirectory = (method: string) => {
  const mkdtemp = nodeMkdtemp(method)
  return (options?: FileSystem.MakeTempDirectoryOptions) =>
    Effect.suspend(() => {
      const prefix = options?.prefix ?? ""
      const directory = typeof options?.directory === "string" ? Path.join(options.directory, ".") : OS.tmpdir()

      return mkdtemp(prefix ? Path.join(directory, prefix) : directory)
    })
}

const makeTempDirectoryScoped_ = makeTempDirectory("makeTempDirectoryScoped")
const removeTempDirectoryScoped = remove("makeTempDirectoryScoped")
const makeTempDirectoryScoped = (options?: FileSystem.MakeTempDirectoryOptions) =>
  Effect.acquireRelease(
    makeTempDirectoryScoped_(options),
    (directory) => Effect.orDie(removeTempDirectoryScoped(directory))
  )

const makeTempDirectoryFile = makeTempDirectory("makeTempFile")
const randomHexString = (bytes: number) => Effect.sync(() => Crypto.randomBytes(bytes).toString("hex"))
const makeTempFile = (options?: FileSystem.MakeTempFileOptions) =>
  pipe(
    Effect.zip(
      makeTempDirectoryFile(options),
      randomHexString(6)
    )
    // TODO: open file
  )

const fileSystemImpl = FileSystem.make({
  access(path, options) {
    let mode = NFS.constants.F_OK
    if (options?.readable) {
      mode |= NFS.constants.R_OK
    }
    if (options?.writable) {
      mode |= NFS.constants.W_OK
    }
    return nodeAccess(path, mode)
  },
  copyFile(fromPath, toPath) {
    return nodeCopyFile(fromPath, toPath)
  },
  chmod(path, mode) {
    return nodeChmod(path, mode)
  },
  chown(path, uid, gid) {
    return nodeChown(path, uid, gid)
  },
  link(fromPath, toPath) {
    return nodeLink(fromPath, toPath)
  },
  makeDirectory(path, options) {
    return nodeMkdir(path, {
      recursive: options?.recursive ?? false,
      mode: options?.mode
    })
  },
  makeTempDirectory: makeTempDirectory("makeTempDirectory"),
  makeTempDirectoryScoped,
  makeTempFile(options) {
  },
  remove: remove("remove")
})
