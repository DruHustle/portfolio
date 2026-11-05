# Portfolio hosting and legacy service retirement

The production frontend is the static Vite application served by Vercel at
`https://andrewgotora.com/`. The repository-root `vercel.json` builds
`portfolio-frontend` and publishes `portfolio-frontend/dist`. It has no backend
API proxy; the browser uses bundled project and content data.

The independent Express/tRPC API lives in `portfolio-backend` and owns its
dependencies, build and tests. The [Render Blueprint](../render.yaml) defines its
approved target as one free Node web service in Frankfurt. It needs no database,
persistent disk or secret credentials. The static frontend remains independent
of this API. The API's existing authentication procedures are anonymous placeholders.
See the [backend deployment guide](../portfolio-backend/README.md#render-deployment)
for service settings and live health, revision and API verification.

## Legacy Oracle inventory

Source configuration and a verified Render API do not establish whether an old
portfolio process still runs on an Oracle VM or has other consumers. Authenticated
host inventory remains necessary before retiring a legacy service. Check process
and container ownership, ingress mappings and incoming traffic. If an existing
consumer uses that backend, verify its behavior against the Render replacement
before changing its route or stopping the old process. Preserve unrelated services
and shared ingress.

No retirement of legacy Oracle resources is established by this source review.
