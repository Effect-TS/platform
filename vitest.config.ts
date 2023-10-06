/// <reference types="vitest" />

import * as path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: ["packages/*/test/**/*.test.ts"],
    globals: true
  },
  resolve: {
    alias: {
      "@effect/platform/test": path.join(__dirname, "packages/platform/test"),
      "@effect/platform": path.join(__dirname, "packages/platform/src"),

      "@effect/platform-bun/test": path.join(__dirname, "packages/platform-bun/test"),
      "@effect/platform-bun": path.join(__dirname, "packages/platform-bun/src"),

      "@effect/platform-browser/test": path.join(__dirname, "packages/platform-browser/test"),
      "@effect/platform-browser": path.join(__dirname, "packages/platform-browser/src"),

      "@effect/platform-node/test": path.join(__dirname, "packages/platform-node/test"),
      "@effect/platform-node": path.join(__dirname, "packages/platform-node/src")
    }
  }
})
