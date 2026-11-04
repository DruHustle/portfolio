import { describe, expect, it } from "vitest";
import { readConfiguration } from "../src/config";

describe("Deployment configuration", () => {
  it("keeps development defaults local", () => {
    expect(readConfiguration({})).toEqual({
      port: 3000,
      allowedOrigins: new Set(["http://localhost:3000"]),
      revision: "unknown",
    });
  });
  it("rejects an unset production origin", () => {
    expect(() => readConfiguration({ NODE_ENV: "production" })).toThrow(
      "ALLOWED_ORIGIN is required"
    );
  });
  it.each([
    "*",
    "https://*.example.com",
    "null",
    "https://example.com/path",
    "https://user:password@example.com",
    "https://example.com?token=secret",
    "https://example.com/#fragment",
    "http://example.com",
    "https://example.com,",
  ])("rejects invalid production origin %s", origin => {
    expect(() =>
      readConfiguration({ NODE_ENV: "production", ALLOWED_ORIGIN: origin })
    ).toThrow("ALLOWED_ORIGIN");
  });
  it.each(["0", "-1", "65536", "1.5", "invalid", "", " 10000"])(
    "rejects invalid PORT %s",
    port => {
      expect(() => readConfiguration({ PORT: port })).toThrow("PORT");
    }
  );
  it("uses the supplied Render port and commit", () => {
    const configuration = readConfiguration({
      PORT: "10000",
      RENDER_GIT_COMMIT: "A".repeat(40),
    });
    expect(configuration.port).toBe(10000);
    expect(configuration.revision).toBe("a".repeat(40));
  });
  it("does not expose an invalid revision as version data", () => {
    expect(
      readConfiguration({ SOURCE_REVISION: "not-a-git-revision" }).revision
    ).toBe("unknown");
  });
});
