// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  rmSync,
  existsSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { publishDirectory } from "../../../scripts/publish.mjs";

let directory: string;
let sourceDir: string;
let remote: string;
const git = (...args: string[]) =>
  execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
beforeEach(() => {
  directory = mkdtempSync(path.join(tmpdir(), "portfolio-publish-test-"));
  sourceDir = path.join(directory, "dist");
  remote = path.join(directory, "remote.git");
  mkdirSync(sourceDir);
  writeFileSync(path.join(sourceDir, "index.html"), "First build");
  git("init", "--bare", "--quiet", remote);
});
afterEach(() => rmSync(directory, { recursive: true, force: true }));

describe("Isolated GitHub Pages publication", () => {
  it("publishes an initial branch and preserves history on subsequent builds", () => {
    expect(publishDirectory({ sourceDir, remote })).toBe(true);
    const first = git("--git-dir", remote, "rev-parse", "refs/heads/gh-pages");
    writeFileSync(path.join(sourceDir, "index.html"), "Second build");
    expect(publishDirectory({ sourceDir, remote })).toBe(true);
    expect(git("--git-dir", remote, "rev-parse", "refs/heads/gh-pages^")).toBe(
      first
    );
    expect(git("--git-dir", remote, "show", "gh-pages:index.html")).toBe(
      "Second build"
    );
    expect(git("--git-dir", remote, "show", "gh-pages:.nojekyll")).toBe("");
    expect(readFileSync(path.join(sourceDir, "index.html"), "utf8")).toBe(
      "Second build"
    );
    expect(existsSync(path.join(sourceDir, ".git"))).toBe(false);
  });
  it("does not create an empty commit when files have not changed", () => {
    publishDirectory({ sourceDir, remote });
    const first = git("--git-dir", remote, "rev-parse", "refs/heads/gh-pages");
    expect(publishDirectory({ sourceDir, remote })).toBe(false);
    expect(git("--git-dir", remote, "rev-parse", "refs/heads/gh-pages")).toBe(
      first
    );
  });
  it("rejects missing output before touching the remote", () => {
    rmSync(path.join(sourceDir, "index.html"));
    expect(() => publishDirectory({ sourceDir, remote })).toThrow(
      "missing index.html"
    );
    expect(git("--git-dir", remote, "for-each-ref")).toBe("");
  });
  it("fails safely for an unavailable remote without changing build files", () => {
    expect(() =>
      publishDirectory({
        sourceDir,
        remote: path.join(directory, "missing.git"),
      })
    ).toThrow("Git ls-remote failed");
    expect(readFileSync(path.join(sourceDir, "index.html"), "utf8")).toBe(
      "First build"
    );
  });
});
