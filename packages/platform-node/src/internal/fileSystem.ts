import { pipe } from "@effect/data/Function"
import * as Option from "@effect/data/Option"
import * as Effect from "@effect/io/Effect"
import * as Layer from "@effect/io/Layer"
import { effectify } from "@effect/platform/Effectify"
import * as Error from "@effect/platform/Error"
import * as FileSystem from "@effect/platform/FileSystem"
import * as File from "@effect/platform/FileSystem/File"
import * as Crypto from "node:crypto"
import * as NFS from "node:fs"
import * as OS from "node:os"
import * as Path from "node:path"

// == errors

const handleErrnoException = (method: string) =>
  (
    err: NodeJS.ErrnoException,
    [path]: [path: NFS.PathLike | number, ...args: Array<any>]
  ) => {
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

// == access

const access = (() => {
  const nodeAccess = effectify(
    NFS.access,
    handleErrnoException("access"),
    handleBadArgument("access")
  )
  return (path: string, options?: FileSystem.AccessFileOptions) => {
    let mode = NFS.constants.F_OK
    if (options?.readable) {
      mode |= NFS.constants.R_OK
    }
    if (options?.writable) {
      mode |= NFS.constants.W_OK
    }
    return nodeAccess(path, mode)
  }
})()

// == copyFile

const copyFile = (() => {
  const nodeCopyFile = effectify(
    NFS.copyFile,
    handleErrnoException("copyFile"),
    handleBadArgument("copyFile")
  )
  return (fromPath: string, toPath: string) => nodeCopyFile(fromPath, toPath)
})()

// == chmod

const chmod = (() => {
  const nodeChmod = effectify(
    NFS.chmod,
    handleErrnoException("chmod"),
    handleBadArgument("chmod")
  )
  return (path: string, mode: number) => nodeChmod(path, mode)
})()

// == chown

const chown = (() => {
  const nodeChown = effectify(
    NFS.chown,
    handleErrnoException("chown"),
    handleBadArgument("chown")
  )
  return (path: string, uid: number, gid: number) => nodeChown(path, uid, gid)
})()

// == link

const link = (() => {
  const nodeLink = effectify(
    NFS.link,
    handleErrnoException("link"),
    handleBadArgument("link")
  )
  return (existingPath: string, newPath: string) => nodeLink(existingPath, newPath)
})()

// == makeDirectory

const makeDirectory = (() => {
  const nodeMkdir = effectify(
    NFS.mkdir,
    handleErrnoException("makeDirectory"),
    handleBadArgument("makeDirectory")
  )
  return (path: string, options?: FileSystem.MakeDirectoryOptions) =>
    nodeMkdir(path, {
      recursive: options?.recursive ?? false,
      mode: options?.mode
    })
})()

// == makeTempDirectory

const makeTempDirectoryFactory = (method: string) => {
  const nodeMkdtemp = effectify(
    NFS.mkdtemp,
    handleErrnoException(method),
    handleBadArgument(method)
  )
  return (options?: FileSystem.MakeTempDirectoryOptions) =>
    Effect.suspend(() => {
      const prefix = options?.prefix ?? ""
      const directory = typeof options?.directory === "string"
        ? Path.join(options.directory, ".")
        : OS.tmpdir()

      return nodeMkdtemp(prefix ? Path.join(directory, prefix) : directory)
    })
}
const makeTempDirectory = makeTempDirectoryFactory("makeTempDirectory")

// == remove

const removeFactory = (method: string) => {
  const nodeRm = effectify(
    NFS.rm,
    handleErrnoException(method),
    handleBadArgument(method)
  )
  return (path: string, options?: FileSystem.RemoveOptions) => nodeRm(path, { recursive: options?.recursive ?? false })
}
const remove = removeFactory("remove")

// == makeTempDirectoryScoped

const makeTempDirectoryScoped = (() => {
  const makeDirectory = makeTempDirectoryFactory("makeTempDirectoryScoped")
  const removeDirectory = removeFactory("makeTempDirectoryScoped")
  return (
    options?: FileSystem.MakeTempDirectoryOptions
  ) =>
    Effect.acquireRelease(
      makeDirectory(options),
      (directory) => Effect.orDie(removeDirectory(directory, { recursive: true }))
    )
})()

// == makeTempFile

const makeTempFile = (() => {
  const makeDirectory = makeTempDirectoryFactory("makeTempFile")
  const randomHexString = (bytes: number) => Effect.sync(() => Crypto.randomBytes(bytes).toString("hex"))
  return (options?: FileSystem.MakeTempFileOptions) =>
    pipe(
      Effect.zip(makeDirectory(options), randomHexString(6)),
      Effect.map(([directory, random]) => Path.join(directory, random)),
      Effect.flatMap((path) => open(path, { flag: "w+" }))
    )
})()

// == open

const open = (() => {
  const nodeOpen = effectify(
    NFS.open,
    handleErrnoException("open"),
    handleBadArgument("open")
  )
  const nodeClose = effectify(
    NFS.close,
    handleErrnoException("open"),
    handleBadArgument("open")
  )

  return (path: string, options?: FileSystem.OpenFileOptions) =>
    pipe(
      Effect.acquireRelease(
        nodeOpen(path, options?.flag ?? "r", options?.mode),
        (fd) => Effect.orDie(nodeClose(fd))
      ),
      Effect.map((fd) => makeFile(File.Descriptor(fd)))
    )
})()

const makeFile = (() => {
  const nodeReadFactory = (method: string) =>
    effectify(
      NFS.read,
      handleErrnoException(method),
      handleBadArgument(method)
    )
  const nodeRead = nodeReadFactory("read")
  const nodeReadAlloc = nodeReadFactory("readAlloc")
  const nodeStat = effectify(
    NFS.fstat,
    handleErrnoException("stat"),
    handleBadArgument("stat")
  )
  const nodeTruncate = effectify(
    NFS.ftruncate,
    handleErrnoException("truncate"),
    handleBadArgument("truncate")
  )

  const nodeWriteFactory = (method: string) =>
    effectify(
      NFS.write,
      handleErrnoException(method),
      handleBadArgument(method)
    )
  const nodeWrite = nodeWriteFactory("write")
  const nodeWriteAll = nodeWriteFactory("writeAll")

  class FileImpl {
    readonly [File.FileTypeId] = File.FileTypeId

    constructor(
      readonly fd: File.File.Descriptor
    ) {}

    get stat() {
      return Effect.map(nodeStat(this.fd), makeFileInfo)
    }

    read(
      buffer: Uint8Array,
      options?: File.FileReadOptions
    ) {
      return Effect.map(
        nodeRead(this.fd, {
          buffer,
          length: options?.length ? Number(options.length) : undefined,
          offset: options?.offset ? Number(options.offset) : undefined
        }),
        FileSystem.Size
      )
    }

    readAlloc(size: FileSystem.Size, options?: File.FileReadOptions | undefined) {
      return Effect.flatMap(
        Effect.sync(() => Buffer.allocUnsafeSlow(Number(size))),
        (buffer) =>
          Effect.map(
            nodeReadAlloc(this.fd, {
              buffer,
              length: options?.length ? Number(options.length) : undefined,
              offset: options?.offset ? Number(options.offset) : undefined
            }),
            (bytesRead) => {
              if (bytesRead === 0) {
                return Option.none()
              }

              if (bytesRead === Number(size)) {
                return Option.some(buffer)
              }

              const dst = Buffer.allocUnsafeSlow(bytesRead)
              buffer.copy(dst, 0, 0, bytesRead)
              return Option.some(dst)
            }
          )
      )
    }

    truncate(length?: FileSystem.Size) {
      return nodeTruncate(this.fd, Number(length))
    }

    write(buffer: Uint8Array) {
      return Effect.map(nodeWrite(this.fd, buffer), FileSystem.Size)
    }

    writeAll(buffer: Uint8Array): Effect.Effect<never, Error.PlatformError, void> {
      return Effect.flatMap(
        nodeWriteAll(this.fd, buffer),
        (bytesWritten) => {
          if (bytesWritten === buffer.length) {
            return Effect.unit()
          }
          return this.writeAll(buffer.subarray(bytesWritten))
        }
      )
    }
  }

  return (fd: File.File.Descriptor) => new FileImpl(fd) as File.File
})()

// == readDirectory

const readDirectory = (() => {
  const nodeReadDirectory = effectify(
    NFS.readdir,
    handleErrnoException("readDirectory"),
    handleBadArgument("readDirectory")
  )

  return (path: string, options?: FileSystem.ReadDirectoryOptions) =>
    nodeReadDirectory(path, options) as Effect.Effect<never, Error.PlatformError, ReadonlyArray<string>>
})()

// == readFile

const readFile = (path: string) =>
  Effect.asyncInterrupt<never, Error.PlatformError, Uint8Array>((resume) => {
    const controller = new AbortController()

    try {
      NFS.readFile(path, { signal: controller.signal }, (err, data) => {
        if (err) {
          resume(Effect.fail(handleErrnoException("readFile")(err, [path])))
        } else {
          resume(Effect.succeed(data))
        }
      })
    } catch (err) {
      resume(Effect.fail(handleBadArgument("readFile")(err)))
    }

    return Effect.sync(() => controller.abort())
  })

// == readLink

const readLink = (() => {
  const nodeReadLink = effectify(
    NFS.readlink,
    handleErrnoException("readLink"),
    handleBadArgument("readLink")
  )
  return (path: string) => nodeReadLink(path)
})()

// == realPath

const realPath = (() => {
  const nodeRealPath = effectify(
    NFS.realpath,
    handleErrnoException("realPath"),
    handleBadArgument("realPath")
  )
  return (path: string) => nodeRealPath(path)
})()

// == rename

const rename = (() => {
  const nodeRename = effectify(
    NFS.rename,
    handleErrnoException("rename"),
    handleBadArgument("rename")
  )
  return (oldPath: string, newPath: string) => nodeRename(oldPath, newPath)
})()

// == stat

const makeFileInfo = (stat: NFS.Stats): File.File.Info => ({
  isFile: stat.isFile(),
  isDirectory: stat.isDirectory(),
  isSymbolicLink: stat.isSymbolicLink(),
  isBlockDevice: stat.isBlockDevice(),
  isCharacterDevice: stat.isCharacterDevice(),
  isFIFO: stat.isFIFO(),
  isSocket: stat.isSocket(),
  mtime: Option.fromNullable(stat.mtime),
  atime: Option.fromNullable(stat.atime),
  birthtime: Option.fromNullable(stat.birthtime),
  dev: stat.dev,
  rdev: Option.fromNullable(stat.rdev),
  ino: Option.fromNullable(stat.ino),
  mode: stat.mode,
  nlink: Option.fromNullable(stat.nlink),
  uid: Option.fromNullable(stat.uid),
  gid: Option.fromNullable(stat.gid),
  size: FileSystem.Size(stat.size),
  blksize: Option.fromNullable(FileSystem.Size(stat.blksize)),
  blocks: Option.fromNullable(stat.blocks)
})
const stat = (() => {
  const nodeStat = effectify(
    NFS.stat,
    handleErrnoException("stat"),
    handleBadArgument("stat")
  )
  return (path: string) => Effect.map(nodeStat(path), makeFileInfo)
})()

// == symlink

const symlink = (() => {
  const nodeSymlink = effectify(
    NFS.symlink,
    handleErrnoException("symlink"),
    handleBadArgument("symlink")
  )
  return (target: string, path: string) => nodeSymlink(target, path)
})()

// == truncate

const truncate = (() => {
  const nodeTruncate = effectify(
    NFS.truncate,
    handleErrnoException("truncate"),
    handleBadArgument("truncate")
  )
  return (path: string, length?: FileSystem.Size) => nodeTruncate(path, Number(length))
})()

// == utime

const utime = (() => {
  const nodeUtime = effectify(
    NFS.utimes,
    handleErrnoException("utime"),
    handleBadArgument("utime")
  )
  return (path: string, atime: number | Date, mtime: number | Date) => nodeUtime(path, atime, mtime)
})()

// == writeFile

const writeFile = (path: string, data: Uint8Array, options?: FileSystem.WriteFileOptions) =>
  Effect.asyncInterrupt<never, Error.PlatformError, void>((resume) => {
    const controller = new AbortController()
    try {
      NFS.writeFile(path, data, {
        signal: controller.signal,
        flag: options?.flag,
        mode: options?.mode
      }, (err) => {
        if (err) {
          resume(Effect.fail(handleErrnoException("writeFile")(err, [path])))
        } else {
          resume(Effect.unit())
        }
      })
    } catch (err) {
      resume(Effect.fail(handleBadArgument("writeFile")(err)))
    }
    return Effect.sync(() => controller.abort())
  })

const fileSystemImpl = FileSystem.make({
  access,
  copyFile,
  chmod,
  chown,
  link,
  makeDirectory,
  makeTempDirectory,
  makeTempDirectoryScoped,
  makeTempFile,
  open,
  readDirectory,
  readFile,
  readLink,
  realPath,
  remove,
  rename,
  stat,
  symlink,
  truncate,
  utime,
  writeFile
})

/** @internal */
export const layer = Layer.succeed(FileSystem.FileSystem, fileSystemImpl)
