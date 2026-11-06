import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";

test("four featured projects lead to a Farmer home using the established template", async ({ page }, info) => {
  await page.goto("#/");
  const cards = page.locator('#projects a[aria-label$="project details"]');
  await expect(cards).toHaveCount(4);
  const expectedColumns = info.project.use.viewport!.width >= 1280 ? 4 : info.project.use.viewport!.width >= 768 ? 2 : 1;
  const columns = await cards.first().evaluate(element => getComputedStyle(element.parentElement!).gridTemplateColumns.split(" ").length);
  expect(columns).toBe(expectedColumns);
  await page.getByRole("link", { name: "View Smart Logistics project details" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Smart Logistics");
  const template = await page.locator("main > section").first().getAttribute("class");
  const typography = await page.getByRole("heading", { level: 1 }).getAttribute("class");
  await page.getByRole("link", { name: "Back to Projects" }).click();
  await page.getByRole("link", { name: "View Smart Farmer project details" }).click();
  await expect(page).toHaveURL(/#\/projects\/smart-farmer$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Smart Farmer");
  await expect(page.locator("main > section").first()).toHaveAttribute("class", template!);
  await expect(page.getByRole("heading", { level: 1 })).toHaveAttribute("class", typography!);
  await expect(page.getByRole("heading", { name: "System Architecture", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Documentation", exact: true })).toHaveAttribute("href", "#/projects/smart-farmer/documentation");
});

test("Factory diagram updates Node-RED text without altering original styles or geometry", async ({ request }) => {
  const response = await request.get("images/smart_factory_arch.svg");
  expect(response.status()).toBe(200);
  const svg = await response.text();
  expect(svg).toContain("Python edge agent");
  expect(svg).toContain("Mosquitto");
  expect(svg).not.toContain("CloudAMQP");
  expect(svg).toContain("Node-RED adapters (optional)");
  expect(svg).toContain("Queue • TLS • command policy");
  const structure = svg.replace(/>[^<]*</g, "><");
  expect(createHash("sha256").update(structure).digest("hex")).toBe("1a6cb577fdfcb316e8a25b443f72146fa4d691609a3d3d076c10811464d81c2d");
});
