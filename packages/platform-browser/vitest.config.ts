/// <reference types="vitest" />
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: ["./test/**/*.test.ts"],
    globals: true,
    environment: "happy-dom"
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
