import express from "express";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/index";

const directory = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.disable("x-powered-by");
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/api/trpc", createExpressMiddleware({ router: appRouter }));
app.use("/api", (_request, response) => {
  response.status(404).json({ error: "API route not found" });
});

// Vite writes directly into dist, with a /portfolio/ public asset base.
const staticPath = path.resolve(directory, "..", "dist");
app.use("/portfolio", express.static(staticPath));
app.use(express.static(staticPath));
app.get("*", (request, response) => {
  if (path.extname(request.path)) {
    response.status(404).send("File not found");
    return;
  }
  response.sendFile(path.join(staticPath, "index.html"));
});

const server = createServer(app);
const port = Number(process.env.PORT || 3000);
server.on("error", error => {
  console.error("Failed to start server:", error.message);
  process.exitCode = 1;
});
server.listen(port, () =>
  console.log(`Server running on http://localhost:${port}/portfolio/`)
);
