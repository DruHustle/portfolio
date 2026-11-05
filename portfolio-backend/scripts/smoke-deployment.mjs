import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";
import { setTimeout as pause } from "node:timers/promises";

// Exercise the compiled production entrypoint with local, non-secret settings.
const reservation = createServer();
await new Promise(resolve => reservation.listen(0, "127.0.0.1", resolve));
const { port } = reservation.address();
await new Promise(resolve => reservation.close(resolve));
const revision = "b".repeat(40);
const child = spawn(process.execPath, ["dist/index.js"], {
  cwd: fileURLToPath(new URL("../", import.meta.url)),
  env: {
    ...process.env,
    NODE_ENV: "production",
    PORT: String(port),
    ALLOWED_ORIGIN: "https://andrewgotora.com",
    RENDER_GIT_COMMIT: revision,
  },
  stdio: ["ignore", "pipe", "pipe"],
});
let output = "";
child.stdout.on("data", chunk => {
  output = (output + chunk.toString()).slice(-4000);
});
child.stderr.on("data", chunk => {
  output = (output + chunk.toString()).slice(-4000);
});
const exited = new Promise((resolve, reject) => {
  child.once("error", reject);
  child.once("exit", (code, signal) => resolve({ code, signal }));
});
const base = `http://127.0.0.1:${port}`;
try {
  let ready = false;
  const deadline = Date.now() + 10_000;
  while (!ready && Date.now() < deadline && child.exitCode === null) {
    try {
      const response = await fetch(base + "/api/health", {
        signal: AbortSignal.timeout(1000),
      });
      const health = await response.json();
      ready =
        response.ok && health.status === "ok" && health.revision === revision;
    } catch {
      /* Listener has not started yet. */
    }
    if (!ready) await pause(50);
  }
  assert(ready, `Compiled backend did not become ready: ${output}`);
  const version = await fetch(base + "/api/version");
  assert.deepEqual(await version.json(), {
    service: "portfolio-backend",
    revision,
  });
  const projects = await fetch(base + "/api/trpc/projects", {
    headers: { Origin: "https://andrewgotora.com" },
  });
  assert.equal(
    projects.headers.get("access-control-allow-origin"),
    "https://andrewgotora.com"
  );
  const listed = (await projects.json()).result.data.json.projects;
  assert.deepEqual(
    listed.map(project => project.id),
    ["smart-logistics", "smart-farmer", "sap-btp-ai-hub", "smart-factory"]
  );
  child.kill("SIGTERM");
  const shutdown = await Promise.race([
    exited,
    pause(5000, null, { ref: false }).then(() => {
      throw new Error("SIGTERM did not stop the backend");
    }),
  ]);
  assert.deepEqual(shutdown, { code: 0, signal: null });
  console.log(
    "PASS compiled backend readiness, revision, project API, CORS and graceful SIGTERM"
  );
} finally {
  if (child.exitCode === null && child.signalCode === null) {
    child.kill("SIGKILL");
    await exited;
  }
}
