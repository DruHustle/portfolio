import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync } from "node:fs";

test.use({ launchOptions: { args: ["--enable-unsafe-swiftshader"] } });
const folder = "artifacts/browser/twin";
mkdirSync(folder, { recursive: true });

test("whole factory starts automatically and supports selection, movement and zones", async ({
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
    page.getByRole("button", { name: "Explore the 3D model" })
  ).toHaveCount(0);
  await expect(page.getByText(/Loads on demand/)).toHaveCount(0);
  const canvas = page.locator('[data-testid="twin-viewport"] canvas');
  await expect(canvas).toBeVisible();
  await expect(canvas).toHaveAttribute("data-floor-node-count", "40");
  await expect
    .poll(
      () => page.getByTestId("factory-scene").getAttribute("data-models-ready"),
      { timeout: 45_000 }
    )
    .toBe("25");
  expect(new Set(models).size).toBe(7);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth)
  ).toBeLessThanOrEqual(info.project.use.viewport!.width);
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await canvas.screenshot({
    path: `${folder}/${info.project.name}-factory.png`,
  });
  await page.getByLabel("Select equipment").selectOption("equipment:robot-01");
  await expect(
    page.getByText(/^Assembly pick and place robot · Assembly/)
  ).toBeVisible();
  const selected = await canvas.screenshot();
  await canvas.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("button", { name: "Reset layout", exact: true })
  ).toBeVisible();
  expect((await canvas.screenshot()).equals(selected)).toBe(false);
  await page.getByRole("button", { name: "Reset layout", exact: true }).click();
  await expect(page.getByLabel("Select equipment")).toHaveValue("");
  await page.getByLabel("Factory zone").selectOption("Assembly");
  await expect(canvas).toHaveAttribute("data-floor-node-count", "12");
  await page.getByLabel("Factory zone").selectOption("all");
  await expect(canvas).toHaveAttribute("data-floor-node-count", "40");
  await page.getByRole("button", { name: "Floor plan", exact: true }).click();
  await expect(
    page.getByRole("group", {
      name: "Accessible factory floor plan",
      exact: true,
    })
  ).toBeVisible();
  await expect(canvas).toHaveCount(0);
  await page.getByRole("button", { name: "3D view", exact: true }).click();
  await expect(canvas).toBeVisible();
  if (info.project.name === "desktop-1440") {
    await page
      .getByRole("button", { name: "Enter fullscreen", exact: true })
      .click();
    await expect
      .poll(() => page.evaluate(() => !!document.fullscreenElement))
      .toBe(true);
    await page
      .getByRole("button", { name: "Exit fullscreen", exact: true })
      .click();
    await expect
      .poll(() => page.evaluate(() => !!document.fullscreenElement))
      .toBe(false);
  }
  await page
    .getByRole("link", { name: "Back to Projects", exact: true })
    .click();
  await expect(canvas).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("missing reference keeps the factory usable and can be retried", async ({
  page,
}) => {
  test.setTimeout(90_000);
  const path = "**/models/smart-factory/robot-arm.glb";
  await page.route(path, route => route.abort());
  await page.goto("#/projects/smart-factory");
  const retry = page.getByRole("button", {
    name: "Retry detailed models",
    exact: true,
  });
  await expect(retry).toBeVisible({ timeout: 30_000 });
  await expect(
    page.locator('[data-testid="twin-viewport"] canvas')
  ).toBeVisible();
  await page.getByLabel("Select equipment").selectOption("equipment:robot-01");
  await expect(
    page.getByText(/^Assembly pick and place robot · Assembly/)
  ).toBeVisible();
  await page.unroute(path);
  await retry.click();
  await expect
    .poll(
      () => page.getByTestId("factory-scene").getAttribute("data-models-ready"),
      { timeout: 45_000 }
    )
    .toBe("25");
  await expect(retry).toHaveCount(0);
});

test("no WebGL retains an interactive, keyboard-accessible whole-factory plan", async ({
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
  await expect(
    page.getByText("3D unavailable on this device · Showing floor plan", {
      exact: true,
    })
  ).toBeVisible();
  const plan = page.getByRole("group", {
    name: "Accessible factory floor plan",
    exact: true,
  });
  await expect(plan).toBeVisible();
  const robot = page.getByRole("button", {
    name: "Select Assembly pick and place robot",
    exact: true,
  });
  await robot.focus();
  await robot.press("Enter");
  await expect(page.getByLabel("Select equipment")).toHaveValue(
    "equipment:robot-01"
  );
  await robot.press("ArrowRight");
  await expect(
    page.getByRole("button", { name: "Reset layout", exact: true })
  ).toBeVisible();
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
});
