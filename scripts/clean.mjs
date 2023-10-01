import * as Fs from "node:fs";

const packages = Fs.readdirSync("packages");

packages.forEach((pkg) => {
  const pkgJson = JSON.parse(
    Fs.readFileSync(`packages/${pkg}/package.json`, "utf8")
  );
  const files = pkgJson.files ?? [];

  [".ultra.cache.json", "build", "docs", ...files]
    .filter((_) => _ !== "src")
    .forEach((file) => {
      Fs.rmSync(`packages/${pkg}/${file}`, { recursive: true, force: true });
    });
});
