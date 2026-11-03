# Portfolio backend

This is a self-contained Express service exposing the existing tRPC API at `/api/trpc`. Its source, tests, dependency lockfile, TypeScript settings, lint rules, and formatting settings all live in this folder. It can be installed, built, and run without any other repository folder.

Run these commands from this folder:

```bash
corepack enable
pnpm install --frozen-lockfile
PORT=3001 pnpm dev # Watch the API while another app uses port 3000
pnpm lint         # Backend lint rules
pnpm check        # Backend TypeScript checks
pnpm test         # API contract tests in Node
pnpm build        # Compile the server to dist/index.js
pnpm start        # Run the compiled server; defaults to port 3000
```

Node.js 22 or newer is required. The package pins pnpm 10.34.7. `PORT` controls the listening port. `ALLOWED_ORIGIN` controls the permitted browser origin and defaults to `http://localhost:3000`. Export these variables in the shell or set them in the hosting environment.

The service serves only the API. It does not import frontend code, access frontend files, or serve frontend build output. Unknown `/api` routes return JSON 404 responses.

The anonymous `auth.me` and `auth.logout` procedures are existing placeholders and do not implement authentication.
