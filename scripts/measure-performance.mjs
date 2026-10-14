import { chromium } from "@playwright/test";
import { build } from "esbuild";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const currentURL =
  process.env.PERF_CURRENT_URL || "http://127.0.0.1:4173/portfolio/";
const baselineURL = process.env.PERF_BASELINE_URL;
const output = path.resolve("artifacts/browser/performance.json");
const collector = await build({
  stdin: {
    contents: `import {onLCP, onCLS, onINP} from "web-vitals";
      window.__portfolioVitals = {};
      const report = metric => { window.__portfolioVitals[metric.name] = { value: metric.value, rating: metric.rating }; };
      onLCP(report, {reportAllChanges:true});
      onCLS(report, {reportAllChanges:true});
      onINP(report, {reportAllChanges:true, durationThreshold: 16});`,
    resolveDir: process.cwd(),
  },
  bundle: true,
  format: "iife",
  platform: "browser",
  write: false,
});
const conditions = {
  latencyMs: 150,
  downloadBitsPerSecond: 1_600_000,
  uploadBitsPerSecond: 750_000,
  cpuSlowdown: 4,
  samplesPerViewport: 3,
  cache: "disabled",
  externalFonts: "normal network",
  observationAfterLoadMs: 1500,
};
const browser = await chromium.launch();
const samples = [];
try {
  for (const width of [375, 1440]) {
    for (let run = 1; run <= conditions.samplesPerViewport; run++) {
      for (const [version, url] of [
        ["baseline", baselineURL],
        ["current", currentURL],
      ]) {
        if (!url) continue;
        const context = await browser.newContext({
          viewport: { width, height: width === 375 ? 812 : 1000 },
          reducedMotion: "reduce",
        });
        try {
          await context.addInitScript({
            content: collector.outputFiles[0].text,
          });
          const page = await context.newPage();
          const session = await context.newCDPSession(page);
          await session.send("Network.enable");
          await session.send("Network.setCacheDisabled", {
            cacheDisabled: true,
          });
          await session.send("Network.emulateNetworkConditions", {
            offline: false,
            latency: conditions.latencyMs,
            downloadThroughput: conditions.downloadBitsPerSecond / 8,
            uploadThroughput: conditions.uploadBitsPerSecond / 8,
          });
          await session.send("Emulation.setCPUThrottlingRate", {
            rate: conditions.cpuSlowdown,
          });
          await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
          await page.evaluate(() => document.fonts.ready);
          // A fixed observation window lets late paints and layout shifts settle consistently.
          await page.waitForTimeout(conditions.observationAfterLoadMs);
          const load = await page.evaluate(() => ({
            navigation: performance
              .getEntriesByType("navigation")
              .map(entry => ({
                duration: entry.duration,
                transferSize: entry.transferSize,
              })),
            resources: performance
              .getEntriesByType("resource")
              .map(entry => ({
                name: entry.name,
                duration: entry.duration,
                transferSize: entry.transferSize,
                encodedBodySize: entry.encodedBodySize,
              })),
          }));
          await page
            .getByRole("link", { name: "View Projects", exact: true })
            .click();
          await page.waitForTimeout(500);
          await page
            .getByRole("link", { name: /View IMSOP project details|IMSOP/ })
            .first()
            .click();
          await page
            .getByRole("heading", { level: 1, name: "IMSOP", exact: true })
            .waitFor();
          await page.waitForTimeout(500);
          const vitals = await page.evaluate(() => window.__portfolioVitals);
          const sample = { version, width, run, vitals, load };
          samples.push(sample);
          console.log(JSON.stringify({ version, width, run, vitals }));
        } finally {
          await context.close();
        }
      }
    }
  }
} finally {
  await browser.close();
}
const median = values =>
  [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
const summary = [];
for (const width of [375, 1440]) {
  for (const version of ["baseline", "current"]) {
    const selected = samples.filter(
      sample => sample.width === width && sample.version === version
    );
    if (!selected.length) continue;
    const values = name =>
      selected
        .map(sample => sample.vitals[name]?.value)
        .filter(value => typeof value === "number");
    summary.push({
      version,
      width,
      samples: selected.length,
      LCPms: values("LCP").length ? median(values("LCP")) : null,
      CLS: values("CLS").length ? median(values("CLS")) : null,
      INPms: values("INP").length ? median(values("INP")) : null,
    });
  }
}
mkdirSync(path.dirname(output), { recursive: true });
writeFileSync(
  output,
  JSON.stringify(
    {
      measuredAt: new Date().toISOString(),
      browser: browser.version(),
      conditions,
      note: "Local synthetic measurements, including the scripted project navigation interaction; these are not production field Core Web Vitals. Baseline is optional and must be served separately.",
      summary,
      samples,
    },
    null,
    2
  )
);
console.log(JSON.stringify({ output, summary }, null, 2));
