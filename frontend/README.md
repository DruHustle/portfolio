# Portfolio frontend

This is a self-contained React, Vite, TypeScript, and Tailwind application. Its source, public assets, tests, build tools, dependency lockfile, TypeScript settings, lint rules, and formatting settings all live in this folder. It can be installed and built without any other repository folder.

Run these commands from this folder:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev         # Development server, normally port 3000
pnpm lint        # Frontend lint and accessibility rules
pnpm check       # UI, Vite configuration, and browser-test types
pnpm test        # UI unit tests with jsdom
pnpm build       # Static output in dist/
pnpm preview     # Serve the production build
pnpm test:e2e    # Build and run Playwright at mobile, tablet, and desktop sizes
pnpm docs:build  # Regenerate guides; requires pandoc and Playwright Chromium
pnpm icons:build # Export design/favicon-source.svg to public/
```

Node.js 22 or newer is required. The package pins pnpm 10.34.7. Install Chromium with `pnpm exec playwright install chromium` before browser tests or authoring scripts. Reports and performance measurements are written to `artifacts/browser/`.

The site uses local content and runs independently. There are no imports from the backend or any shared package. Frontend constants live in `src/const.ts`. Private credentials must never be placed in `VITE_*` variables.

Root `vercel.json` installs and builds only this folder and publishes `frontend/dist/`. If deploying this folder elsewhere on its own, use `pnpm install --frozen-lockfile`, `pnpm build`, and `dist/` as the output directory.
