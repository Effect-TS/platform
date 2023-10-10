/// <reference types="vitest" />
import * as path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: ["./test/**/*.test.ts"],
    globals: true
  },
  resolve: {
    alias: {
      "@effect/platform/test": path.join(__dirname, "../platform", "test"),
      "@effect/platform": path.join(__dirname, "../platform", "src"),
      "@effect/platform-node/test": path.join(__dirname, "test"),
      "@effect/platform-node": path.join(__dirname, "src")
    }
  }
})
