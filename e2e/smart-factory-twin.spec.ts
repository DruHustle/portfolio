import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync } from "node:fs";

test.use({ launchOptions: { args: ["--enable-unsafe-swiftshader"] } });
const folder = "artifacts/browser/twin";
mkdirSync(folder, { recursive: true });

test("3D preview loads on demand and changes the actual model view", async ({
  page,
}, info) => {
  test.setTimeout(90_000);
  const models: string[] = [];
  const errors: string[] = [];
  page.on("request", request => {
    if (request.url().endsWith(".glb")) models.push(request.url());
  });
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("#/projects/smart-factory");
  await expect(
    page.getByRole("heading", { name: "OPC UA FX & TSN, made visible" })
  ).toBeVisible();
  expect(models).toEqual([]);
  await page.getByRole("button", { name: "Explore the 3D model" }).click();
  const explode = page.getByRole("button", {
    name: "Exploded view",
    exact: true,
  });
  await expect(explode).toBeEnabled({ timeout: 30_000 });
  const canvas = page.locator('[data-testid="twin-viewport"] canvas');
  await expect(canvas).toBeVisible();
  expect(models).toHaveLength(1);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth)
  ).toBeLessThanOrEqual(info.project.use.viewport!.width);
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await page.locator('section[aria-labelledby="digital-twins"]').screenshot({
    path: `${folder}/${info.project.name}-workspace.png`,
  });
  const assembled = await canvas.screenshot({
    path: `${folder}/${info.project.name}-assembled.png`,
  });
  await explode.click();
  await expect(explode).toHaveAttribute("aria-pressed", "true");
  const exploded = await canvas.screenshot({
    path: `${folder}/${info.project.name}-exploded.png`,
  });
  expect(exploded.equals(assembled)).toBe(false);
  await explode.click();
  await page.getByLabel("Inspect a component").selectOption("Motor");
  await expect(page.getByLabel("Inspect a component")).toHaveValue("Motor");
  await expect(page.getByText(/^Motor ·/)).toBeVisible();
  const motor = await canvas.screenshot();
  const reveal = page.getByRole("button", {
    name: "Reveal internals",
    exact: true,
  });
  await reveal.click();
  await expect(reveal).toHaveAttribute("aria-pressed", "true");
  const internals = await canvas.screenshot({
    path: `${folder}/${info.project.name}-motor-internals.png`,
  });
  expect(internals.equals(motor)).toBe(false);
  await page.getByRole("button", { name: "Reset view", exact: true }).click();
  await expect(explode).toHaveAttribute("aria-pressed", "false");
  await expect(reveal).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByLabel("Inspect a component")).toHaveValue("Assembly");
  const reset = await canvas.screenshot();
  expect(reset.equals(exploded)).toBe(false);
  await page
    .getByRole("link", { name: "Back to Projects", exact: true })
    .click();
  await expect(canvas).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("failed model download can be retried without losing the page", async ({
  page,
}) => {
  const path = "**/models/smart-factory/pump-motor.glb";
  await page.route(path, route => route.abort());
  await page.goto("#/projects/smart-factory");
  await page.getByRole("button", { name: "Explore the 3D model" }).click();
  await expect(page.getByRole("alert")).toContainText("preview is unavailable");
  await expect(
    page.getByRole("heading", { level: 1, name: "Smart Factory", exact: true })
  ).toBeVisible();
  await page.unroute(path);
  await page.getByRole("button", { name: "Retry 3D preview" }).click();
  await expect(
    page.getByRole("button", { name: "Exploded view", exact: true })
  ).toBeEnabled({ timeout: 30_000 });
  await expect(
    page.locator('[data-testid="twin-viewport"] canvas')
  ).toBeVisible();
});

test("unsupported WebGL keeps a useful model image and product information", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: function (
        this: HTMLCanvasElement,
        kind: string,
        ...args: unknown[]
      ) {
        return kind === "webgl2"
          ? null
          : Reflect.apply(original, this, [kind, ...args]);
      },
    });
  });
  await page.goto("#/projects/smart-factory");
  await page.getByRole("button", { name: "Explore the 3D model" }).click();
  await expect(page.getByRole("alert")).toContainText("preview is unavailable");
  await expect(
    page.getByRole("img", {
      name: "Smart Factory pump and motor reference model",
      exact: true,
    })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Full inspection guide" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "OPC UA FX & TSN, made visible" })
  ).toBeVisible();
});
