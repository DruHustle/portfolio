import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

function git(args, cwd) {
  try {
    return execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    // Git errors may include a credential-bearing remote URL.
    throw new Error(
      `Git ${args[0]} failed. Check repository access and retry.`
    );
  }
}

/** Publish built files through an isolated clone and a normal, non-forced push. */
export function publishDirectory({ sourceDir, remote, branch = "gh-pages" }) {
  if (
    !existsSync(path.join(sourceDir, "index.html")) ||
    !statSync(sourceDir).isDirectory()
  ) {
    throw new Error(
      "Build output is missing index.html. Run pnpm build first."
    );
  }
  if (existsSync(path.join(sourceDir, ".git")))
    throw new Error("Build output must not contain a Git repository.");
  const temporary = mkdtempSync(path.join(tmpdir(), "portfolio-publish-"));
  try {
    const existing = git(
      ["ls-remote", "--heads", remote, `refs/heads/${branch}`],
      sourceDir
    );
    if (existing) {
      git(
        [
          "clone",
          "--quiet",
          "--single-branch",
          "--branch",
          branch,
          "--depth",
          "1",
          remote,
          temporary,
        ],
        sourceDir
      );
    } else {
      git(["init", "--quiet", `--initial-branch=${branch}`], temporary);
      git(["remote", "add", "origin", remote], temporary);
    }
    for (const entry of readdirSync(temporary)) {
      if (entry !== ".git")
        rmSync(path.join(temporary, entry), { recursive: true, force: true });
    }
    cpSync(sourceDir, temporary, { recursive: true });
    writeFileSync(path.join(temporary, ".nojekyll"), "");
    git(["add", "--all"], temporary);
    if (!git(["status", "--porcelain"], temporary)) return false;
    git(
      [
        "-c",
        "user.name=Portfolio deployment",
        "-c",
        "user.email=deployment@localhost",
        "commit",
        "--quiet",
        "--message",
        "Deploy portfolio",
      ],
      temporary
    );
    // Concurrent publications fail safely instead of overwriting newer work.
    git(["push", "--quiet", "origin", `HEAD:refs/heads/${branch}`], temporary);
    return true;
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}

const invokedFile = process.argv[1] && path.resolve(process.argv[1]);
if (invokedFile === fileURLToPath(import.meta.url)) {
  const repository = fileURLToPath(new URL("..", import.meta.url));
  try {
    if (git(["status", "--porcelain"], repository))
      throw new Error(
        "Commit or preserve local changes before publishing a reviewed revision."
      );
    const remote = git(["remote", "get-url", "origin"], repository);
    const changed = publishDirectory({
      sourceDir: path.join(repository, "dist"),
      remote,
    });
    console.log(
      changed
        ? "GitHub Pages publication completed."
        : "Built files are already published."
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
