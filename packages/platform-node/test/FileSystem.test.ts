import * as Effect from "@effect/io/Effect"
import * as Fs from "@effect/platform-node/FileSystem"

const runPromise = <E, A>(self: Effect.Effect<Fs.FileSystem, E, A>) =>
  Effect.runPromise(
    Effect.provideLayer(self, Fs.layer)
  )

describe("FileSystem", () => {
  it("readFile", () =>
    runPromise(Effect.gen(function*(_) {
      const fs = yield* _(Fs.FileSystem)
      const data = yield* _(fs.readFile(`${__dirname}/fixtures/text.txt`))
      const text = new TextDecoder().decode(data)
      expect(text.trim()).toEqual("lorem ipsum dolar sit amet")
    })))

  it("makeTempDirectory", () =>
    runPromise(Effect.gen(function*(_) {
      const fs = yield* _(Fs.FileSystem)
      let dir = ""
      yield* _(
        Effect.gen(function*(_) {
          dir = yield* _(fs.makeTempDirectory())
          const stat = yield* _(fs.stat(dir))
          expect(stat.type).toEqual("Directory")
        }),
        Effect.scoped
      )
      const stat = yield* _(fs.stat(dir))
      expect(stat.type).toEqual("Directory")
    })))

  it("makeTempDirectoryScoped", () =>
    runPromise(Effect.gen(function*(_) {
      const fs = yield* _(Fs.FileSystem)
      let dir = ""
      yield* _(
        Effect.gen(function*(_) {
          dir = yield* _(fs.makeTempDirectoryScoped())
          const stat = yield* _(fs.stat(dir))
          expect(stat.type).toEqual("Directory")
        }),
        Effect.scoped
      )
      const error = yield* _(Effect.flip(fs.stat(dir)))
      assert(error._tag === "SystemError" && error.reason === "NotFound")
    })))

  it("truncate", () =>
    runPromise(Effect.gen(function*(_) {
      const fs = yield* _(Fs.FileSystem)
      const file = yield* _(fs.makeTempFile())

      const text = "hello world"
      yield* _(fs.writeFile(file, new TextEncoder().encode(text)))

      const before = yield* _(fs.readFile(file), Effect.map((_) => new TextDecoder().decode(_)))
      expect(before).toEqual(text)

      yield* _(fs.truncate(file))

      const after = yield* _(fs.readFile(file), Effect.map((_) => new TextDecoder().decode(_)))
      expect(after).toEqual("")
    })))

  it("truncate", () =>
    runPromise(Effect.gen(function*(_) {
      const fs = yield* _(Fs.FileSystem)
      const file = yield* _(fs.makeTempFile())

      const text = "hello world"
      yield* _(fs.writeFile(file, new TextEncoder().encode(text)))

      const before = yield* _(fs.readFile(file), Effect.map((_) => new TextDecoder().decode(_)))
      expect(before).toEqual(text)

      yield* _(fs.truncate(file))

      const after = yield* _(fs.readFile(file), Effect.map((_) => new TextDecoder().decode(_)))
      expect(after).toEqual("")
    })))

  it("should track the cursor position when reading", () =>
    runPromise(Effect.gen(function*(_) {
      const fs = yield* _(Fs.FileSystem)

      yield* _(
        Effect.gen(function*(_) {
          let text: string
          const file = yield* _(fs.open(`${__dirname}/fixtures/text.txt`))

          // Read the first 5 bytes ("lorem").
          text = yield* _(Effect.some(file.readAlloc(Fs.Size(5))), Effect.map((_) => new TextDecoder().decode(_)))
          expect(text).toBe("lorem")

          // Jump to the 12th byte (5 + 7).
          yield* _(file.seek(Fs.Size(7), Fs.SeekMode.Current))

          // Read the following 5 bytes.
          text = yield* _(Effect.some(file.readAlloc(Fs.Size(5))), Effect.map((_) => new TextDecoder().decode(_)))
          expect(text).toBe("dolar")

          // Jump past the whitespace (+1).
          yield* _(file.seek(Fs.Size(1), Fs.SeekMode.Current))

          // Read the following 8 bytes.
          text = yield* _(Effect.some(file.readAlloc(Fs.Size(8))), Effect.map((_) => new TextDecoder().decode(_)))
          expect(text).toBe("sit amet")

          // Jump back to the start.
          yield* _(file.seek(Fs.Size(0), Fs.SeekMode.Start))
          text = yield* _(Effect.some(file.readAlloc(Fs.Size(11))), Effect.map((_) => new TextDecoder().decode(_)))
          expect(text).toBe("lorem ipsum")
        }),
        Effect.scoped
      )
    })))

  it("should track the cursor position when writing", () =>
    runPromise(Effect.gen(function*(_) {
      const fs = yield* _(Fs.FileSystem)

      yield* _(
        Effect.gen(function*(_) {
          let text: string

          const path = yield* _(fs.makeTempFileScoped())
          const file = yield* _(fs.open(path, { flag: "w+" }))

          yield* _(file.write(new TextEncoder().encode("lorem ipsum")))
          yield* _(file.write(new TextEncoder().encode(" ")))
          yield* _(file.write(new TextEncoder().encode("dolor sit amet")))

          text = yield* _(fs.readFile(path), Effect.map((_) => new TextDecoder().decode(_)))
          expect(text).toBe("lorem ipsum dolor sit amet")

          yield* _(file.seek(Fs.Size(-4), Fs.SeekMode.Current))
          yield* _(file.write(new TextEncoder().encode("hello world")))

          text = yield* _(fs.readFile(path), Effect.map((_) => new TextDecoder().decode(_)))
          expect(text).toBe("lorem ipsum dolor sit hello world")

          yield* _(file.seek(Fs.Size(6), Fs.SeekMode.Start))
          yield* _(file.write(new TextEncoder().encode("blabl")))

          text = yield* _(fs.readFile(path), Effect.map((_) => new TextDecoder().decode(_)))
          expect(text).toBe("lorem blabl dolor sit hello world")
        }),
        Effect.scoped
      )
    })))
})
