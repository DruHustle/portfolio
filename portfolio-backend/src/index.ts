import { createServer } from "node:http";
import { createApp } from "./app";
import { readConfiguration } from "./config";

try {
  const configuration = readConfiguration();
  let stopping = false;
  const server = createServer(createApp(configuration, () => !stopping));
  server.requestTimeout = 15_000;
  server.headersTimeout = 10_000;
  server.keepAliveTimeout = 5_000;
  server.on("error", error => {
    console.error("Failed to start portfolio backend:", error.message);
    process.exitCode = 1;
  });
  server.listen(configuration.port, "0.0.0.0", () => {
    console.log(`Portfolio backend listening on 0.0.0.0:${configuration.port}`);
  });

  const shutdown = () => {
    if (stopping) return;
    stopping = true;
    const deadline = setTimeout(() => {
      server.closeAllConnections();
      process.exitCode = 1;
    }, 10_000);
    deadline.unref();
    server.close(error => {
      clearTimeout(deadline);
      if (error) process.exitCode = 1;
    });
    server.closeIdleConnections();
  };
  process.once("SIGTERM", shutdown);
  process.once("SIGINT", shutdown);
} catch (error) {
  console.error(
    "Invalid portfolio backend configuration:",
    error instanceof Error ? error.message : "Unknown error"
  );
  process.exitCode = 1;
}
