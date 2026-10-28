# Portfolio frontend

React, Vite, TypeScript, and Tailwind power the static portfolio. This folder owns all browser code, public assets, frontend environment files, UI tests, Playwright tests, design sources, and authoring scripts.

Install dependencies with `pnpm install --frozen-lockfile` from the repository root. Then run these commands from this folder:

```bash
pnpm dev         # Development server, normally port 3000
pnpm build       # Static output in dist/
pnpm preview     # Serve the production build
pnpm check       # UI, Vite configuration, and browser-test types
pnpm test        # UI unit tests with jsdom
pnpm test:e2e    # Build and run Playwright at mobile, tablet, and desktop sizes
pnpm docs:build  # Regenerate guides; requires pandoc and Playwright Chromium
pnpm icons:build # Export frontend/design/favicon-source.svg to public/
```

Install Chromium with `pnpm exec playwright install chromium` before running browser tests or authoring scripts. Test reports and performance measurements are written to `artifacts/browser/` inside this folder.

The site uses local content and runs without the optional backend. `src/lib/trpc.ts` preserves the optional typed API helper; its backend dependency is a type-only import. Browser-safe constants come from `@portfolio/shared/const`. Private credentials must never be placed in `VITE_*` variables.

Vercel builds from the repository root with `pnpm build:frontend` and publishes `frontend/dist/`; its configuration remains in the root `vercel.json`.
