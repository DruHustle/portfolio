# Portfolio frontend

This folder contains the independently installable React portfolio. `client/` owns its source and public assets; the scripts, tests, configuration, package manifest, lockfile and dependency patches are local to this application. It does not import backend source or require a sibling application or root package.

Use Node.js 22 or newer and the pinned pnpm 10.34.7. Run these commands from this folder:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm check
pnpm test
pnpm audit --audit-level=moderate
pnpm build
pnpm preview
```

The portfolio uses local public content and needs no API or login. Builds preserve the existing image-cleanup step and generate `dist/`. Vercel continues to use the repository-root configuration to build this folder and publish that output.

For browser verification, install Chromium with `pnpm exec playwright install chromium`, then run `pnpm test:e2e`. The repository's main README documents guide generation, images, routes and deployment behavior.
