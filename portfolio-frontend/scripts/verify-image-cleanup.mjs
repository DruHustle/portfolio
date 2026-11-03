import { test } from "node:test";
import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  writeFile,
  readdir,
  rm,
  symlink,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { cleanImages } from "./clean-images.mjs";

test("cleanup removes retired files, preserves current files and leaves other directories alone", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "portfolio-images-"));
  try {
    const images = path.join(root, "images");
    await mkdir(images);
    await writeFile(path.join(images, "current.svg"), "current");
    await writeFile(path.join(images, "old.png"), "retired");
    await writeFile(path.join(root, "source.png"), "source");
    await assert.rejects(
      cleanImages(images, ["current.svg"], { check: true }),
      /Obsolete images/
    );
    assert.deepEqual(await readdir(images), ["current.svg", "old.png"]);
    assert.deepEqual(await cleanImages(images, ["current.svg"]), ["old.png"]);
    assert.deepEqual(await readdir(images), ["current.svg"]);
    assert.deepEqual((await readdir(root)).sort(), ["images", "source.png"]);
    assert.deepEqual(await cleanImages(images, ["current.svg"]), []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("invalid or incomplete manifests and symlinks fail before deleting anything", async () => {
  const root = await mkdtemp(path.join(tmpdir(), "portfolio-images-"));
  try {
    await writeFile(path.join(root, "old.png"), "keep until manifest is valid");
    for (const manifest of [
      [],
      ["../source.png"],
      ["missing.svg"],
      ["old.png", "old.png"],
    ]) {
      await assert.rejects(cleanImages(root, manifest));
      assert.deepEqual(await readdir(root), ["old.png"]);
    }
    await symlink(path.join(root, "old.png"), path.join(root, "current.png"));
    await assert.rejects(cleanImages(root, ["current.png"]), /regular file/);
    await assert.rejects(cleanImages(root, ["old.png"]), /symlink/);
    assert.deepEqual((await readdir(root)).sort(), ["current.png", "old.png"]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
