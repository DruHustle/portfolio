import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createServer, type Server } from "node:http";
import { createApp } from "../src/app";
import { readConfiguration } from "../src/config";

const revision = "a".repeat(40);
const configuration = readConfiguration({
  NODE_ENV: "production",
  ALLOWED_ORIGIN: "https://andrewgotora.com,https://www.andrewgotora.com/",
  RENDER_GIT_COMMIT: revision,
});
let server: Server;
let base: string;
let ready = true;

beforeAll(async () => {
  server = createServer(createApp(configuration, () => ready));
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("Missing test port");
  base = `http://127.0.0.1:${address.port}`;
});
afterAll(async () => {
  server.closeAllConnections();
  await new Promise<void>((resolve, reject) =>
    server.close(error => (error ? reject(error) : resolve()))
  );
});

describe("Deployment HTTP contracts", () => {
  it.each(["/api/health", "/healthz"])("serves readiness at %s", async path => {
    const response = await fetch(base + path);
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-powered-by")).toBeNull();
    expect(await response.json()).toEqual({
      status: "ok",
      service: "portfolio-backend",
      revision,
    });
  });
  it("identifies the deployed revision without exposing configuration", async () => {
    const response = await fetch(base + "/api/version");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({
      service: "portfolio-backend",
      revision,
    });
  });
  it("reports unavailable readiness while shutting down", async () => {
    ready = false;
    try {
      const response = await fetch(base + "/api/health");
      expect(response.status).toBe(503);
      expect(await response.json()).toMatchObject({ status: "stopping" });
    } finally {
      ready = true;
    }
  });
  it("retains the existing tRPC project API over HTTP", async () => {
    const response = await fetch(base + "/api/trpc/projects");
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      result: {
        data: {
          json: {
            projects: [
              { id: "smart-logistics" },
              { id: "smart-farmer" },
              { id: "sap-btp-ai-hub" },
              { id: "smart-factory" },
            ],
          },
        },
      },
    });
  });
  it.each(["https://andrewgotora.com", "https://www.andrewgotora.com"])(
    "permits the exact configured origin %s",
    async origin => {
      const response = await fetch(base + "/api/trpc/projects", {
        headers: { Origin: origin },
      });
      expect(response.headers.get("access-control-allow-origin")).toBe(origin);
      expect(response.headers.get("vary")).toContain("Origin");
    }
  );
  it.each([
    "https://andrewgotora.com.attacker.test",
    "null",
    "http://localhost:3000",
  ])("does not grant browser access to %s", async origin => {
    const response = await fetch(base + "/api/trpc/projects", {
      headers: { Origin: origin },
    });
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
  });
  it("answers allowed preflights", async () => {
    const response = await fetch(base + "/api/trpc/auth.logout", {
      method: "OPTIONS",
      headers: {
        Origin: "https://andrewgotora.com",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type",
      },
    });
    expect(response.status).toBe(204);
    expect(response.headers.get("access-control-allow-methods")).toContain(
      "POST"
    );
  });
  it.each(["/api/unknown", "/index.html", "/"])(
    "returns JSON instead of frontend content for %s",
    async path => {
      const response = await fetch(base + path);
      expect(response.status).toBe(404);
      expect(await response.json()).toEqual({ error: "API route not found" });
    }
  );
});
