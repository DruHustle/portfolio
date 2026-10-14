import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import type {} from "vitest/config";

const plugins = [react(), tailwindcss()];

export default defineConfig(({ mode }) => ({
  define: {
    "import.meta.env.VITE_ENABLE_ANALYTICS": JSON.stringify(
      loadEnv(mode, import.meta.dirname).VITE_ENABLE_ANALYTICS ??
        (process.env.VERCEL === "1" ? "true" : "false")
    ),
  },
  plugins,
  base: "/portfolio/", // CRITICAL: Fix for GitHub Pages asset loading
  test: {
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    // This tells Vite to put the final files in /dist at the project root
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    // Ensures assets are generated with relative paths
    assetsDir: "assets",
  },

  server: {
    port: 3000,
    strictPort: false,
    host: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
}));
