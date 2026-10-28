# Portfolio backend

This optional Express service exposes the existing tRPC API at `/api/trpc`. API implementation and Node contract tests belong in this folder. The static portfolio can run independently.

Install dependencies with `pnpm install --frozen-lockfile` from the repository root. Then run these commands from this folder:

```bash
PORT=3001 pnpm dev # Watch the API while Vite uses port 3000
pnpm check        # Backend TypeScript checks
pnpm test         # API contract tests in Node
pnpm build        # Compile the server to dist/index.js
pnpm start        # Run the compiled server; defaults to port 3000
```

`PORT` controls the listening port. `ALLOWED_ORIGIN` controls the permitted frontend origin and defaults to `http://localhost:3000`. Export these variables in the shell or set them in the hosting environment.

For combined hosting, run `pnpm build` at the repository root and then `pnpm start`. The service resolves the sibling `frontend/dist/` from its own location, serves browser assets and SPA routes, preserves legacy `/portfolio/` redirects, and keeps unknown `/api` routes as JSON 404 responses. API routes can run without a frontend build; serving portfolio pages requires that build.

The `@portfolio/backend/router` export is a type-only contract for `AppRouter`. The frontend must not import backend runtime modules. The anonymous `auth.me` and `auth.logout` procedures are existing placeholders and do not implement authentication.
