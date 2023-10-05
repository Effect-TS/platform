import * as Fs from "node:fs";
import * as Glob from "glob";

[".", ...Glob.sync("packages/*")].forEach((pkg) => {
  const pkgJson = JSON.parse(Fs.readFileSync(`${pkg}/package.json`, "utf8"));
  const files = pkgJson.files ?? [];

  [
    ".ultra.cache.json",
    "build",
    "tsconfig.tsbuildinfo",
    "coverage",
    ...(pkg === "." ? [] : ["docs"]),
    ...files,
  ]
    .filter((_) => _ !== "src")
    .forEach((file) => {
      Fs.rm(`${pkg}/${file}`, { recursive: true, force: true }, () => {});
    });
});
