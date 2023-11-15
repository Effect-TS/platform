import * as path from "path"
import { defineProject } from "vitest/config"

export default defineProject({
  test: {
    include: ["./test/**/*.test.ts"]
  },
  resolve: {
    alias: {
      "@effect/platform/test": path.join(__dirname, "test"),
      "@effect/platform": path.join(__dirname, "src")
    }
  }
})
