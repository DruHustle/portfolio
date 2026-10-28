# Professional Portfolio - Andrew Gotora

A responsive portfolio for Andrew Gotora, Senior Industrial Software & Digitalization Engineer and Founder of Onesa UG. It showcases active work in Industrial AI and cybersecurity alongside Industrial IoT and automation, AI platforms, cloud-native systems, and enterprise integration.

Onesa AI provides a Next.js/FastAPI workspace for Chat, Knowledge, Agents, and Travel, backed by PostgreSQL/pgvector and configurable model adapters. Hosted generation and embeddings currently use Cloudflare Workers AI, with local Ollama support and a vLLM adapter. Industrial AI is in active development for evidence-backed operational investigation and human-reviewed drafts. Cybersecurity is another active work area, building on secure software delivery, identity and access management, secrets protection, and cloud infrastructure. Fine-tuned Onesa weights, multimodal adapters, and live industrial integrations are not established capabilities.

## 🚀 Quick Links

- [Live Portfolio](https://andrewgotora.com/) - View the production site
- [GitHub Repository](https://github.com/DruHustle/portfolio) - View source code
- [Issues](https://github.com/DruHustle/portfolio/issues) - Report bugs or request features

## 🚀 Project Structure

```text
portfolio/
├── frontend/               # Independent React application
│   ├── src/                # Pages, components, local data, and UI unit tests
│   ├── public/             # Images, résumé, and published engineering guides
│   ├── e2e/                # Playwright browser tests
│   ├── scripts/            # Documentation, favicon, and performance tools
│   ├── design/             # Editable artwork and design sources
│   ├── package.json        # Frontend dependencies and commands
│   ├── pnpm-lock.yaml      # Frontend dependency lockfile
│   ├── tsconfig.json       # Self-contained frontend TypeScript settings
│   └── eslint.config.mjs   # Frontend lint rules
├── backend/                # Independent Express/tRPC API
│   ├── src/                # HTTP server, API routers, and tRPC setup
│   ├── tests/              # API contract tests in a Node environment
│   ├── package.json        # Backend dependencies and commands
│   ├── pnpm-lock.yaml      # Backend dependency lockfile
│   ├── tsconfig.json       # Self-contained backend TypeScript settings
│   └── eslint.config.mjs   # Backend lint rules
├── .github/workflows/      # Runs each application's checks independently
└── vercel.json             # Builds and publishes the frontend
```

The two applications have no imports, local package links, workspace dependencies, or configuration dependencies on each other. Each folder can be copied elsewhere and installed, checked, tested, built, and run on its own. There is no root package or shared-code folder. The frontend uses local content; the backend serves only its API.

See [frontend/README.md](frontend/README.md) and [backend/README.md](backend/README.md) for each application's commands.

## 🛠️ Getting Started

Use Node.js 22 or newer and pnpm 10.34.7, pinned in each application's `package.json`.

### Frontend

```bash
cd frontend
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open the root URL printed by Vite, normally `http://localhost:3000/`. If that port is busy, Vite selects the next available port. The frontend works without the backend.

Run frontend verification from `frontend/`:

```bash
pnpm lint
pnpm check
pnpm test
pnpm audit --audit-level=moderate
pnpm build
pnpm preview --host 127.0.0.1 --port 4173
pnpm exec playwright install chromium
pnpm test:e2e
pnpm exec playwright show-report artifacts/browser/report
```

The browser suite covers all routes at 375, 768, and 1440 pixels, with overflow checks, real image loading, console and network failures, WCAG A/AA scans, keyboard and mobile-menu behavior, documentation navigation, downloads, diagrams, and fault recovery. Reports are written to `frontend/artifacts/browser/`.

For repeatable performance measurements, serve the production build on port 4173 and run `pnpm perf` from `frontend/`. Optionally set `PERF_BASELINE_URL` to a separately served original build. Results are written to `frontend/artifacts/browser/performance.json`; these are synthetic measurements rather than production field Core Web Vitals.

### Backend

In a separate terminal:

```bash
cd backend
pnpm install --frozen-lockfile
pnpm lint
pnpm check
pnpm test
pnpm audit --audit-level=moderate
pnpm build
PORT=3001 pnpm start
```

The API listens at `http://localhost:3001/api/trpc` with this example port; its default port is 3000. `PORT` selects the port and `ALLOWED_ORIGIN` sets the permitted browser origin, defaulting to `http://localhost:3000`. For development with automatic restarts, use `PORT=3001 pnpm dev`.

The backend does not read or serve frontend build files. Its existing `auth.me` and `auth.logout` procedures remain anonymous placeholders rather than an authentication system.

## 🌐 Deployment

The portfolio is hosted on **Vercel** at **https://andrewgotora.com/**, using hash-based routing and root-relative assets. The connected Vercel project keeps the repository root as its project root. Root `vercel.json` installs and builds inside `frontend/`, using pinned pnpm 10.34.7, and publishes `frontend/dist/`. No backend installation or build is required for this deployment. Legacy `/portfolio/` URLs redirect to the equivalent root paths.

Create a branch and open a pull request against `main`. The required **Verify portfolio** check verifies each application using its own install, audit, lint, type checks, tests, and build, then runs the frontend browser suite. Browser reports are retained for seven days. Vercel supplies pull-request previews and publishes the merged revision to production.

The backend can be deployed separately by installing and building from `backend/` and starting `dist/index.js` with Node. It has no dependency on frontend source or assets.

The documentation generator uses the canonical `homepage` in `frontend/package.json`. Downloaded guides link to the production domain. The editable favicon source is `frontend/design/favicon-source.svg`; run `pnpm icons:build` from `frontend/` with Playwright Chromium installed to export icons into `frontend/public/`.

Frontend environment files live in `frontend/`. Private credentials must never be placed in `VITE_*` variables because Vite exposes them to browsers.

## ✨ Key Features
- **Dynamic Project Details**: Deep-dive views for major projects like IMSOP and SAP BTP AI Hub.
- **Responsive Design**: Optimized for all devices with a focus on high-efficiency layouts.
- **Documentation Hub**: Integrated viewing and downloading of project documentation.
- **Analytics Status**: The public analytics route explains configuration; visitor reports require the owner's Vercel dashboard. The tracking script is included once on Vercel builds, or when `VITE_ENABLE_ANALYTICS=true` is explicitly set. Local builds leave it disabled by default. Enabling the Vercel integration and verifying collection remain deployment-side steps; this page does not claim live collection or display mock metrics.
- **Accessible Navigation**: Skip link, visible keyboard focus, section focus management, reduced-motion support, and consistently available return navigation.
- **Deferred Assets**: Project routes load on demand; compact avatars and dimensioned, lazy-loaded architecture images reduce the initial transfer. Original full-resolution images remain available.
- **Modern Tech Stack**: Built with React, TypeScript, Tailwind CSS, and Wouter.

## 🛠️ Technology Stack
- **Frontend Framework**: React 19
- **Styling**: Tailwind CSS 4 & shadcn/ui
- **Animations**: Framer Motion
- **Routing**: Wouter
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Language**: TypeScript

## 👨‍💻 Author
Developed by **Andrew Gotora**
**Last Updated**: October 2026

### Engineering guide editions

IMSOP and Smart Factory IoT share the same five-guide structure and page component. Markdown under `frontend/public/docs/{imsop,smartfactoryiot}/` is the authoring source. After editing a guide, regenerate its static HTML, rendered SVG diagrams, and PDF editions:

```bash
# Requires pandoc on PATH and Playwright Chromium installed locally.
cd frontend
pnpm install --frozen-lockfile
pnpm docs:build
```

The renderer also refreshes the résumé PDF from its HTML source and writes `frontend/public/docs/manifest.json` with source/output hashes. Generated HTML uses local SVG files and requires no JavaScript, external renderer, or model call. Commit the generated editions with their sources; `pnpm build` only packages these assets. Preview both project documentation routes and their visual guides after regeneration.
