import { readdir, readFile, lstat, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Only this dedicated directory is managed; models, guides and design sources
// have separate lifecycles and must never be removed by image cleanup.
export async function cleanImages(
  directory,
  currentImages,
  { check = false } = {}
) {
  if (
    !Array.isArray(currentImages) ||
    currentImages.length === 0 ||
    currentImages.some(
      name =>
        typeof name !== "string" ||
        !/^[a-zA-Z0-9_-]+\.(svg|png|webp|jpe?g|gif|avif)$/.test(name)
    ) ||
    new Set(currentImages).size !== currentImages.length
  ) {
    throw new Error(
      "Image manifest must contain unique image filenames, without paths."
    );
  }
  if (
    !(await lstat(directory)).isDirectory() ||
    (await lstat(directory)).isSymbolicLink()
  ) {
    throw new Error("Image directory must be a real directory.");
  }
  // Validate all current assets before any deletion, so a typo fails safely.
  for (const name of currentImages) {
    if (!(await lstat(path.join(directory, name))).isFile()) {
      throw new Error(`Current image is not a regular file: ${name}`);
    }
  }
  const entries = await readdir(directory, { withFileTypes: true });
  const obsolete = entries.filter(entry => !currentImages.includes(entry.name));
  if (obsolete.some(entry => !entry.isFile())) {
    throw new Error(
      "Unexpected directory or symlink in managed images; inspect manually."
    );
  }
  if (check && obsolete.length) {
    throw new Error(
      `Obsolete images: ${obsolete.map(entry => entry.name).join(", ")}`
    );
  }
  for (const entry of obsolete) await unlink(path.join(directory, entry.name));
  return obsolete.map(entry => entry.name);
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const root = fileURLToPath(new URL("../", import.meta.url));
  const manifest = JSON.parse(
    await readFile(new URL("./current-images.json", import.meta.url), "utf8")
  );
  const removed = await cleanImages(
    path.join(root, "client/public/images"),
    manifest,
    {
      check: process.argv.includes("--check"),
    }
  );
  console.log(
    removed.length
      ? `Removed obsolete images: ${removed.join(", ")}`
      : "Current images verified; no obsolete files."
  );
}
