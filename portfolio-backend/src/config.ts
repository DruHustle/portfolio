export type BackendConfiguration = {
  port: number;
  allowedOrigins: ReadonlySet<string>;
  revision: string;
};

/** Validate deployment settings before opening the HTTP listener. */
export function readConfiguration(
  environment: NodeJS.ProcessEnv = process.env
): BackendConfiguration {
  const portValue = environment.PORT ?? "3000";
  const port = Number(portValue);
  if (
    !/^\d+$/.test(portValue) ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535
  ) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }

  const production = environment.NODE_ENV === "production";
  const configuredOrigins = environment.ALLOWED_ORIGIN?.trim();
  if (production && !configuredOrigins) {
    throw new Error("ALLOWED_ORIGIN is required in production");
  }
  const allowedOrigins = new Set<string>();
  for (const candidate of (configuredOrigins || "http://localhost:3000").split(
    ","
  )) {
    let url: URL;
    try {
      url = new URL(candidate.trim());
    } catch {
      throw new Error(
        "ALLOWED_ORIGIN must contain comma-separated HTTP(S) origins"
      );
    }
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.hostname.includes("*") ||
      (production && url.protocol !== "https:") ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      throw new Error(
        "ALLOWED_ORIGIN must contain exact origins without credentials, paths, queries or fragments; production requires HTTPS"
      );
    }
    allowedOrigins.add(url.origin);
  }

  const revision =
    environment.RENDER_GIT_COMMIT || environment.SOURCE_REVISION || "";
  return {
    port,
    allowedOrigins,
    revision: /^[a-f0-9]{40}$/i.test(revision)
      ? revision.toLowerCase()
      : "unknown",
  };
}
