import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/index";
import type { BackendConfiguration } from "./config";

export function createApp(
  configuration: BackendConfiguration,
  isReady: () => boolean = () => true
) {
  const app = express();
  app.disable("x-powered-by");
  app.use((_request, response, next) => {
    response.setHeader("X-Content-Type-Options", "nosniff");
    next();
  });
  app.use(
    cors({
      origin: (origin, callback) => {
        callback(
          null,
          origin === undefined || configuration.allowedOrigins.has(origin)
        );
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      maxAge: 600,
    })
  );
  app.get(["/api/health", "/healthz"], (_request, response) => {
    const ready = isReady();
    response.setHeader("Cache-Control", "no-store");
    response.status(ready ? 200 : 503).json({
      status: ready ? "ok" : "stopping",
      service: "portfolio-backend",
      revision: configuration.revision,
    });
  });
  app.get("/api/version", (_request, response) => {
    response.setHeader("Cache-Control", "no-store");
    response.json({
      service: "portfolio-backend",
      revision: configuration.revision,
    });
  });
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      // tRPC writes its own Vary header after Express CORS middleware runs.
      responseMeta: () => ({ headers: new Headers({ Vary: "Origin" }) }),
    })
  );
  app.use((_request, response) => {
    response.status(404).json({ error: "API route not found" });
  });
  return app;
}
