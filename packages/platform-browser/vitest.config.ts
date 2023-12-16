/// <reference types="vitest" />
import path from "path"
import { defineProject } from "vitest/config"

export default defineProject({
  test: {
    include: ["./test/**/*.test.ts"],
    environment: "happy-dom",
    sequence: {
      concurrent: true
    }
  },
  resolve: {
    alias: {
      "@effect/platform/test": path.join(__dirname, "../platform", "test"),
      "@effect/platform": path.join(__dirname, "../platform", "src"),
      "@effect/platform-browser/test": path.join(__dirname, "test"),
      "@effect/platform-browser": path.join(__dirname, "src")
    }
  }
})
