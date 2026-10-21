import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const routes = [
  ["home", "/", "Senior Industrial"],
  ["imsop", "/projects/imsop", "IMSOP"],
  ["smart-factory", "/projects/smart-factory-iot", "Smart Factory IoT"],
  ["learning", "/projects/sap-btp-ai-hub", "Learning Hub"],
  ["imsop-docs", "/projects/imsop/documentation", "IMSOP Documentation"],
  [
    "factory-docs",
    "/projects/smart-factory-iot/documentation",
    "Smart Factory IoT Documentation",
  ],
  ["analytics", "/analytics", "Analytics"],
  ["not-found", "/missing-page", "404"],
] as const;
const screenshots = path.resolve("artifacts/browser/screenshots");
mkdirSync(screenshots, { recursive: true });

for (const [name, route, heading] of routes) {
  test(`${name}: responsive layout, assets, console, network, and accessibility`, async ({
    page,
  }, info) => {
    const errors: string[] = [];
    const failures: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("requestfailed", request =>
      failures.push(`${request.url()}: ${request.failure()?.errorText}`)
    );
    page.on("response", response => {
      if (response.status() >= 400)
        failures.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(`#${route}`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      heading
    );
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(node => (node as HTMLImageElement).naturalWidth)
        )
        .toBeGreaterThan(0);
      await image.evaluate(node => (node as HTMLImageElement).decode());
    }
    if (await page.locator("figure").count()) {
      await page.locator("figure").screenshot({
        path: path.join(
          screenshots,
          `${info.project.name}-${name}-diagram.png`
        ),
      });
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth)
    ).toBeLessThanOrEqual(info.project.use.viewport!.width);
    const overflow = await page
      .locator("main a, main button, main h1, main h2, main h3, main p")
      .evaluateAll(elements =>
        elements
          .filter(element => {
            const rect = element.getBoundingClientRect();
            return (
              rect.width > 0 && (rect.right > innerWidth + 1 || rect.left < -1)
            );
          })
          .map(element => element.textContent?.slice(0, 100))
      );
    expect(overflow).toEqual([]);
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    await info.attach("accessibility", {
      body: JSON.stringify(accessibility),
      contentType: "application/json",
    });
    await page.screenshot({
      path: path.join(screenshots, `${info.project.name}-${name}-full.png`),
      fullPage: true,
    });
    await page.screenshot({
      path: path.join(screenshots, `${info.project.name}-${name}-top.png`),
    });
    expect(
      accessibility.violations.map(violation => ({
        id: violation.id,
        nodes: violation.nodes.map(node => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      }))
    ).toEqual([]);
    expect(errors).toEqual([]);
    expect(failures).toEqual([]);
  });
}

test("keyboard navigation, menu, section links, and disclosure", async ({
  page,
}, info) => {
  await page.goto("#/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to main content" })
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  const menu = page.getByRole("button", { name: "Open navigation menu" });
  if (info.project.use.viewport!.width < 768) {
    await menu.click();
    const dialog = page.getByRole("dialog", { name: "Navigation Menu" });
    await expect(dialog).toBeVisible();
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
    await page.screenshot({
      path: path.join(screenshots, `${info.project.name}-menu.png`),
    });
    for (let index = 0; index < 8; index++) {
      await page.keyboard.press("Tab");
      expect(
        await dialog.evaluate(element =>
          element.contains(document.activeElement)
        )
      ).toBe(true);
    }
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(menu).toBeFocused();
    await menu.click();
    await dialog.getByRole("link", { name: "Experience" }).click();
    await expect(dialog).toBeHidden();
  } else {
    await expect(menu).toBeHidden();
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Experience" })
      .click();
  }
  await expect(page.locator("#experience")).toBeFocused();
  await expect
    .poll(() =>
      page
        .locator("#experience")
        .evaluate(element => element.getBoundingClientRect().top)
    )
    .toBeGreaterThanOrEqual(64);
  await page.getByText("Role details", { exact: true }).first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
});

test("project/documentation return journey and rendered guide PDF access", async ({
  page,
}) => {
  await page.goto("#/");
  await page.getByRole("link", { name: "View IMSOP project details" }).click();
  await expect(page).toHaveTitle("IMSOP | Andrew Gotora");
  await expect(page.getByRole("link", { name: "Live Demo" })).toHaveAttribute(
    "href",
    "https://imsop-app.vercel.app/"
  );
  const projectImage = page.getByRole("img", {
    name: /IMSOP system architecture with Vercel/,
  });
  await expect(projectImage).toHaveAttribute(
    "src",
    /images\/imsop_system_architecture_v2\.webp$/
  );
  const architecturePopup = page.waitForEvent("popup");
  await page
    .getByRole("link", {
      name: /Open full-size IMSOP system architecture with Vercel/,
    })
    .click();
  const architectureImage = await architecturePopup;
  await expect(architectureImage).toHaveURL(
    /images\/imsop_system_architecture_v2\.webp$/
  );
  await architectureImage.close();
  await page.getByRole("link", { name: "Documentation", exact: true }).click();
  await expect(page).toHaveTitle("IMSOP Documentation | Andrew Gotora");
  const opened = page.waitForEvent("popup");
  await page.getByRole("link", { name: "View", exact: true }).first().click();
  const guide = await opened;
  await expect(guide).toHaveURL(/docs\/imsop\/architecture\.html$/);
  const pdfLink = guide.getByRole("link", { name: "PDF edition" });
  await expect(pdfLink).toHaveAttribute("href", "architecture.pdf");
  const pdf = await guide.request.get(
    await pdfLink.evaluate(link => (link as HTMLAnchorElement).href)
  );
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 4).toString()).toBe("%PDF");
  await guide.close();
  const fullSize = page.waitForEvent("popup");
  await page
    .getByRole("link", { name: /Open full-size IMSOP Architecture/ })
    .click();
  const diagram = await fullSize;
  await expect(diagram).toHaveURL(/docs\/imsop\/architecture-1\.svg$/);
  await diagram.close();
  await page.getByRole("link", { name: "Back to Project" }).click();
  await page.getByRole("link", { name: "Back to Projects" }).click();
  await expect(page.locator("#projects")).toBeFocused();
  const response = await page.request.get("resume/resume_download.pdf");
  expect(response.status()).toBe(200);
  expect((await response.body()).subarray(0, 4).toString()).toBe("%PDF");
});

test("works when external font services are unavailable", async ({ page }) => {
  await page.route(/fonts\.(googleapis|gstatic)\.com/, route => route.abort());
  await page.goto("#/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Senior Industrial"
  );
  await page
    .getByRole("link", { name: "View Learning Hub project details" })
    .click();
  await expect(page).toHaveTitle("Learning Hub | Andrew Gotora");
});

test("recovers after a project chunk fails to load", async ({ page }) => {
  await page.route("**/assets/IMSOPDetail-*.js", route => route.abort());
  await page.goto("#/");
  await page.getByRole("link", { name: "View IMSOP project details" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "This page couldn’t load"
  );
  await expect(
    page.getByRole("button", { name: "Retry", exact: true })
  ).toBeVisible();
  await page.unroute("**/assets/IMSOPDetail-*.js");
  await page.getByRole("button", { name: "Reload page", exact: true }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "IMSOP", exact: true })
  ).toBeVisible();
});

test("navigation works when browser storage is restricted", async ({
  page,
}) => {
  await page.addInitScript(() => {
    for (const storage of ["localStorage", "sessionStorage"]) {
      Object.defineProperty(window, storage, {
        get() {
          throw new DOMException("Storage unavailable", "SecurityError");
        },
      });
    }
  });
  await page.goto("#/");
  await page
    .getByRole("link", { name: "View Smart Factory IoT project details" })
    .click();
  await expect(page).toHaveTitle("Smart Factory IoT | Andrew Gotora");
  await page.getByRole("link", { name: "Back to Projects" }).click();
  await expect(page.locator("#projects")).toBeFocused();
});

for (const [slug, directory] of [
  ["imsop", "imsop"],
  ["smart-factory-iot", "smartfactoryiot"],
]) {
  test(`${slug}: visual guides render and return to documentation`, async ({
    page,
  }, info) => {
    test.setTimeout(60_000);
    await page.goto(`#/projects/${slug}/documentation`);
    await expect(
      page.getByRole("heading", { name: "Operational Guides", exact: true })
    ).toBeVisible();
    await expect(
      page.getByText("Production Readiness Review", { exact: true })
    ).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: "View", exact: true })
    ).toHaveCount(5);
    await expect(
      page.getByRole("link", { name: "PDF", exact: true })
    ).toHaveCount(5);
    await expect(page.locator('a[href$=".md"], .lucide-eye')).toHaveCount(0);
    for (const card of await page.locator("article").all()) {
      const heading = card.getByRole("heading");
      const icon = await heading.locator("svg").boundingBox();
      const title = await heading.locator("span").boundingBox();
      if (!icon || !title)
        throw new Error("Guide icon and title must be visible");
      expect(icon.x + icon.width).toBeLessThan(title.x);
      expect(icon.y).toBeLessThan(title.y + title.height);
      expect(icon.y + icon.height).toBeGreaterThan(title.y);
    }
    const visualLinks = page
      .locator("article")
      .filter({ has: page.getByRole("heading", { level: 3 }) })
      .getByRole("link", { name: "View", exact: true });
    await expect(visualLinks).toHaveCount(2);
    const popupEvent = page.waitForEvent("popup");
    await visualLinks.first().click();
    const guide = await popupEvent;
    await expect(guide).toHaveURL(
      new RegExp(`/docs/${directory}/deployment.html$`)
    );
    await expect(guide.getByRole("heading", { level: 1 })).toContainText(
      "Deployment Guide"
    );
    await guide.getByRole("link", { name: "Back to Documentation" }).click();
    await expect(guide).toHaveURL(
      new RegExp(`/portfolio/#/projects/${slug}/documentation$`)
    );
    await expect(guide.getByRole("heading", { level: 1 })).toContainText(
      "Documentation"
    );
    await guide.close();

    for (const name of [
      "architecture",
      "database-schema",
      "api-flows",
      "deployment",
      "system-diagrams",
    ]) {
      const response = await page.goto(`docs/${directory}/${name}.html`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(
        page.getByRole("link", { name: "PDF edition" })
      ).toHaveAttribute("href", `${name}.pdf`);
      await expect(
        page.getByRole("link", { name: "Markdown source" })
      ).toHaveCount(0);
      expect(await page.locator("figure img").count()).toBeGreaterThan(0);
      expect(await page.locator("pre.mermaid, script").count()).toBe(0);
      for (const image of await page.locator("figure img").all()) {
        await image.evaluate(node => (node as HTMLImageElement).decode());
        expect(
          await image.evaluate(node => (node as HTMLImageElement).naturalWidth)
        ).toBeGreaterThan(0);
      }
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth)
      ).toBeLessThanOrEqual(info.project.use.viewport!.width);
      const pdf = await page.request.get(`docs/${directory}/${name}.pdf`);
      expect(pdf.status()).toBe(200);
      expect((await pdf.body()).subarray(0, 4).toString()).toBe("%PDF");
      expect((await pdf.body()).toString("latin1")).not.toMatch(
        /file:\/\/\/|\/Users\/|\/home\//
      );
      if (["deployment", "system-diagrams"].includes(name)) {
        const accessibility = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(accessibility.violations).toEqual([]);
        await page.screenshot({
          path: path.join(
            screenshots,
            `${info.project.name}-${directory}-${name}.png`
          ),
          fullPage: true,
        });
      }
    }
  });
}
