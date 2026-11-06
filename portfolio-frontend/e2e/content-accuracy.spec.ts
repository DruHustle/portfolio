import { test, expect } from "@playwright/test";

test("Factory explains Python duties and labels AI as active development", async ({ page, request }) => {
  await page.goto("#/projects/smart-factory");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Smart Factory");
  await expect(page.getByRole("heading", { name: "Python edge agent", exact: true })).toBeVisible();
  const body = page.locator("body");
  await expect(body).toContainText("Python AI advisory capability is in active development");
  await expect(body).toContainText("durable SQLite");
  await expect(body).toContainText("provenance");
  await expect(body).toContainText("command-policy enforcement");
  await expect(body).toContainText("Mosquitto");
  await expect(body).not.toContainText("CloudAMQP");
  const image = await request.get("images/smart_factory_arch.svg");
  expect(image.status()).toBe(200);
  const svg = await image.text();
  expect(svg).toContain("AI in active development");
  expect(svg).toContain("Python edge agent");
  expect(svg).toContain("Oracle-hosted MQTT");
  expect(svg).not.toContain("CloudAMQP");
});

test("Factory rendered guides agree with reviewed broker and AI status", async ({ request }) => {
  for (const name of ["architecture", "api-flows", "database-schema", "deployment", "system-diagrams"]) {
    const response = await request.get(`docs/smartfactoryiot/${name}.html`);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain("Mosquitto");
    expect(html).toContain("active development");
    expect(html).not.toContain("CloudAMQP");
    const pdf = await request.get(`docs/smartfactoryiot/${name}.pdf`);
    expect(pdf.status()).toBe(200);
    expect((await pdf.body()).subarray(0, 4).toString()).toBe("%PDF");
  }
});
