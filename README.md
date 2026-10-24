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
├── client/                 # Frontend React application (Vite + TS + Tailwind)
│   ├── public/             # Static assets (images, resume)
│   └── src/                # Application source code
│       ├── data/           # Project and skill data definitions
│       ├── pages/          # Main pages and project detail views
│       └── components/     # Reusable UI components
├── server/                 # Optional backend for advanced features
└── .github/workflows/      # Pull-request and main-branch quality checks
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v22+)
- Corepack and PNPM (the repository pins pnpm 10.34.7)

### Installation
```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open the root URL printed by Vite (normally `http://localhost:3000/`). If that port is busy, Vite selects the next available port.

### Local verification

```bash
pnpm lint                    # TypeScript, React hooks, and JSX accessibility rules
pnpm check                   # Strict application and Vite configuration type checks
pnpm test                    # Rendered routes, navigation, recovery, exports, and local publication fixtures
pnpm audit --audit-level=moderate
pnpm build
pnpm preview --host 127.0.0.1 --port 4173
```

The browser suite covers all routes at 375, 768, and 1440 pixels, with overflow checks, real image loading, console and network failures, WCAG A/AA scans, keyboard and mobile-menu behavior, project/documentation navigation, downloads, full-size diagrams, and fault recovery.

```bash
pnpm exec playwright install chromium   # Once per browser version
pnpm test:e2e                           # Build and run isolated Chromium checks
pnpm exec playwright show-report artifacts/browser/report
```

Screenshots, accessibility results, traces for failures, and the HTML report are written to ignored `artifacts/browser/`. CI runs lint, type checks, unit tests, dependency audit, build, and browser tests on pull requests and pushes to `main`. Browser reports are retained for seven days.

For repeatable local performance measurements, serve the current production build on port 4173 and run `pnpm perf`. Optionally set `PERF_BASELINE_URL` to a separately served original build for alternating before-and-after samples. The collector records three cold samples at 375 and 1440 pixels with 150 ms latency, 1.6 Mbps download, 750 Kbps upload, and 4× CPU throttling. Results are in `artifacts/browser/performance.json`. These are synthetic LCP, CLS, and scripted-navigation interaction measurements, not production field Core Web Vitals.

`pnpm start` optionally serves the build and the existing tRPC router from Express on port 3000. Set `PORT` to choose another port, and `ALLOWED_ORIGIN` for an allowed cross-origin frontend. The portfolio itself is static and needs no API or login. The optional `auth.me` and `auth.logout` procedures remain anonymous placeholders, not an authentication system.

## 🌐 Deployment
The portfolio is hosted on **Vercel** at **https://andrewgotora.com/**, using hash-based routing and root-relative assets. The connected Vercel project publishes `main` with a frozen pnpm install, `pnpm build`, and `dist` as the output directory. `vercel.json` defines these settings and redirects legacy `/portfolio/` URLs to the equivalent root paths.

Create a branch and open a pull request against `main`. The required **Verify portfolio** check must pass before merging; `main` is protected against direct pushes, including administrator bypass. Vercel provides pull-request previews and publishes the merged revision to production. GitHub Actions performs verification only; GitHub Pages publishing and the old manual publication scripts have been retired.

The documentation generator derives absolute PDF links from `package.json`'s canonical `homepage`. Downloaded guides link to the production domain rather than a separate hosting service.

Favicon artwork is retained in `design/favicon-source.png`. Run `pnpm icons:build` with Playwright Chromium installed to export the compact, multi-size ICO, browser PNG, and Apple touch icon into `client/public/`.

Vite selects `NODE_ENV` automatically. The checked-in environment files contain example API settings; no credentials are needed to run the static portfolio. Never put private credentials in `VITE_*` variables because Vite exposes them to browsers.

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

IMSOP and Smart Factory IoT share the same five-guide structure and page component. Markdown under `client/public/docs/{imsop,smartfactoryiot}/` is the authoring source. After editing a guide, regenerate its static HTML, rendered SVG diagrams, and PDF editions:

```bash
# Requires pandoc on PATH and Playwright Chromium installed locally.
pnpm install --frozen-lockfile
pnpm docs:build
```

The renderer also refreshes the résumé PDF from its HTML source and writes `client/public/docs/manifest.json` with source/output hashes. Generated HTML uses local SVG files and requires no JavaScript, external renderer, or model call. Commit the generated editions with their sources; `pnpm build` only packages these assets. Preview both project documentation routes and their visual guides after regeneration.
