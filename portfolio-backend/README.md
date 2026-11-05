# Portfolio backend

This self-contained Express service exposes the existing public tRPC API at `/api/trpc`. Its source, tests, dependency lockfile, TypeScript settings, lint rules, and formatting settings all live in this folder. It can be installed, built, and run without any other repository folder.

The portfolio frontend uses local project content and does not call this optional API. The frontend remains independently hosted on Vercel at <https://andrewgotora.com/>. The backend does not import frontend code, access frontend files, or serve frontend build output. It requires no database, persistent disk, authentication provider, or secret credentials. The anonymous `auth.me` and `auth.logout` procedures are existing placeholders and do not implement authentication.

## Local development and verification

Use Node.js 22 or 24; production and CI use Node 22. The package pins pnpm 10.34.7. Run these commands from this folder:

```bash
corepack pnpm install --frozen-lockfile --prod=false
PORT=3001 corepack pnpm dev # Watch the API while the frontend uses port 3000
corepack pnpm lint
corepack pnpm check
corepack pnpm test
corepack pnpm build
corepack pnpm test:deployment
corepack pnpm start
```

The deployment smoke test starts the compiled server on a temporary port, verifies health, release identity, the project API and CORS, then checks graceful shutdown on `SIGTERM`. CI runs it after the backend build.

## Configuration

Set environment variables in the shell or hosting service. `.env.example` documents local values; the server does not load environment files automatically.

| Variable            | Behavior                                                                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NODE_ENV`          | Set to `production` on Render.                                                                                                                                                                                      |
| `PORT`              | Render supplies this value. Locally defaults to `3000`; must be an integer from 1 through 65535. The server binds to `0.0.0.0`.                                                                                     |
| `ALLOWED_ORIGIN`    | Comma-separated exact browser origins. Required in production, where every origin must use HTTPS. The local default is `http://localhost:3000`. Wildcards, credentials, paths, queries, and fragments are rejected. |
| `RENDER_GIT_COMMIT` | Render supplies the deployed commit SHA; returned by health and version endpoints.                                                                                                                                  |
| `SOURCE_REVISION`   | Optional 40-character Git SHA for other hosts. Used only when `RENDER_GIT_COMMIT` is absent. Invalid or missing revisions are reported as `unknown`.                                                                |

CORS grants browser access only to configured origins. Requests without an `Origin` header, including health probes and server-to-server clients, remain supported. CORS is not authentication; this API exposes public portfolio content.

## Render deployment

The repository-root [`render.yaml`](../render.yaml) defines one free Node web service in Frankfurt. Before applying it, confirm the intended workspace and whether a `portfolio-backend` service already exists. Reuse the existing service instead of creating a duplicate.

| Setting                 | Value                                                                         |
| ----------------------- | ----------------------------------------------------------------------------- |
| Repository              | `https://github.com/DruHustle/portfolio.git`                                  |
| Branch                  | `main`                                                                        |
| Service name            | `portfolio-backend`                                                           |
| Runtime / plan / region | Node / Free / Frankfurt                                                       |
| Root directory          | `portfolio-backend`                                                           |
| Build command           | `corepack pnpm install --frozen-lockfile --prod=false && corepack pnpm build` |
| Start command           | `node dist/index.js`                                                          |
| HTTP health check path  | `/api/health`                                                                 |
| Shutdown delay          | 30 seconds; application drain limit is 10 seconds                             |
| Auto-deploy             | After CI Checks Pass, when the repository is connected through a Git provider |
| `NODE_ENV`              | `production`                                                                  |
| `NODE_VERSION`          | `22`                                                                          |
| `ALLOWED_ORIGIN`        | `https://andrewgotora.com,https://www.andrewgotora.com`                       |

The build explicitly installs development dependencies because TypeScript bundling uses esbuild even when `NODE_ENV=production`. Node runs the compiled entrypoint directly so it receives shutdown signals. No secret variables or additional Render resources are required.

For creation tools without a root-directory setting, use these equivalent commands from the repository root:

```bash
# Build
cd portfolio-backend && corepack pnpm install --frozen-lockfile --prod=false && corepack pnpm build
# Start
cd portfolio-backend && exec node dist/index.js
```

Such tools may also omit HTTP health-check and CI-gated auto-deploy fields. Set `/api/health` and **After CI Checks Pass** in the service settings, or manage the service with the Blueprint. Confirm the effective settings after creation. Services linked only through a public repository URL require manual deployment; automatic deployment requires a connected Git provider. Free instances can spin down while idle and have a cold start on the next request.

Publish changes through a pull request. The required **Verify portfolio** check must pass before merging into protected `main`. Keep frontend hosting and configuration unchanged when deploying this API.

### Verify a deployment

Wait for the Render deploy to become `live`, then request these URLs on its assigned HTTPS origin:

| Path                            | Expected result                                                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `/api/health` (also `/healthz`) | HTTP 200, `status: "ok"`, `service: "portfolio-backend"`, and the deployed commit SHA. During shutdown, health reports HTTP 503. |
| `/api/version`                  | `service: "portfolio-backend"` and the same commit SHA.                                                                          |
| `/api/trpc/projects`            | Existing tRPC response with Smart Logistics, Learning Hub, and Smart Factory records.                                                      |
| `/api/trpc/health`              | Existing tRPC response with an `ok` status and timestamp.                                                                        |
| Unknown routes                  | JSON 404; no frontend HTML.                                                                                                      |

Compare the revision with the intended merged Git commit, check that requests from `https://andrewgotora.com` receive the matching `Access-Control-Allow-Origin` header, and inspect runtime logs for startup errors. A created service or accepted deploy request alone does not establish a successful deployment.

If a release needs rollback, select a previously verified deploy in Render, then repeat health, revision, and API checks. This service has no stored data to migrate or restore. Check the auto-deploy setting after rollback before re-enabling automatic releases.

Render references: [web services](https://render.com/docs/web-services), [Blueprint specification](https://render.com/docs/blueprint-spec), [deploy lifecycle](https://render.com/docs/deploys), [health checks](https://render.com/docs/health-checks), [free services](https://render.com/docs/free), and [rollback behavior](https://render.com/docs/rollbacks).
