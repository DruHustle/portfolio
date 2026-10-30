import { mkdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { chromium } from "@playwright/test";
import {
  Boxes,
  Bell,
  ChartColumn,
  Cloud,
  Cpu,
  Database,
  Factory,
  KeyRound,
  Mail,
  Monitor,
  Network,
  Router,
  Server,
  ShieldCheck,
} from "lucide-react";

// Edit this source to update the diagram. Every label remains real SVG text.
const width = 1672,
  height = 941;
const colors = {
  ink: "#f1f5f9",
  muted: "#b4c7d9",
  cyan: "#35c7ed",
  orange: "#ff9b42",
  blue: "#94c9ef",
  purple: "#c4b5fd",
};
const esc = value =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const text = (
  x,
  y,
  value,
  size = 20,
  fill = colors.ink,
  weight = 400,
  anchor = "start"
) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}">${esc(value)}</text>`;
const rect = (
  x,
  y,
  w,
  h,
  fill = "#10283c",
  stroke = "#326179",
  radius = 14,
  dash = ""
) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
const icon = (Icon, x, y, color = colors.cyan, size = 32) =>
  renderToStaticMarkup(
    createElement(Icon, {
      x,
      y,
      width: size,
      height: size,
      color,
      strokeWidth: 1.8,
      "aria-hidden": true,
    })
  );
const line = (path, color = colors.orange, dash = "") =>
  `<path d="${path}" fill="none" stroke="${color}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" marker-end="url(#${color === colors.orange ? "orange" : color === colors.blue ? "blue" : "white"})"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
function panel(x, w, number, heading, subtitle) {
  return (
    rect(x, 144, w, 710, "#0c2134", "#27728a", 16) +
    `<circle cx="${x + 32}" cy="181" r="18" fill="${colors.orange}"/>` +
    text(x + 32, 188, number, 20, "#102131", 700, "middle") +
    text(x + 61, 190, heading, 25, colors.ink, 700) +
    text(x + 20, 221, subtitle, 18, colors.muted)
  );
}
function card(
  x,
  y,
  w,
  h,
  Icon,
  title,
  lines = [],
  accent = colors.cyan,
  titleSize = 23
) {
  return (
    `<g data-card="true">` +
    rect(
      x,
      y,
      w,
      h,
      "#112c42",
      accent === colors.purple ? "#7b6aa5" : "#326c83",
      11
    ) +
    icon(Icon, x + 17, y + 16, accent) +
    text(x + 61, y + 39, title, titleSize, colors.ink, 600) +
    lines
      .map((value, i) => text(x + 17, y + 70 + i * 25, value, 18, colors.muted))
      .join("") +
    "</g>"
  );
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">
<title id="title">Smart Factory — production architecture</title>
<desc id="description">Factory equipment reaches a managed MQTT broker through Pi gateways or individual TLS devices. Oracle ARM64 hosts an application API role and one telemetry and notification worker. Vercel provides the web interface and API proxy; managed PostgreSQL, Redis, Resend and the Oracle BaSyx runtime provide data and asset services. OPC UA FX and TSN control and scheduling stay on the factory LAN.</desc>
<defs>
  <linearGradient id="background" x2="1" y2="1"><stop stop-color="#071729"/><stop offset="1" stop-color="#0b2439"/></linearGradient>
  ${[
    ["orange", colors.orange],
    ["blue", colors.blue],
    ["white", "#e2e8f0"],
  ]
    .map(
      ([name, color]) =>
        `<marker id="${name}" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 0 L8 4 L0 8 Z" fill="${color}"/></marker>`
    )
    .join("")}
</defs>
<rect width="${width}" height="${height}" rx="20" fill="url(#background)"/>
<g font-family="Arial, Helvetica, sans-serif">
${text(28, 64, "Smart Factory", 44, colors.ink, 700)}
${text(337, 64, "— Production architecture", 44, colors.orange, 700)}
${text(29, 104, "Edge acquisition, managed messaging, private runtime roles and asset standards", 22, colors.muted)}
${panel(24, 332, "1", "Factory OT", "Equipment and local acquisition")}
${panel(380, 256, "2", "Messaging", "Managed MQTT transport")}
${panel(660, 542, "3", "Oracle ARM64", "Private API role + singleton worker")}
${panel(1226, 422, "4", "Web, data & standards", "Vercel, managed services and BaSyx")}

${card(44, 254, 292, 112, Factory, "Factory equipment", ["Machines + WROVER sensors", "OPC UA • Modbus • Serial"], colors.cyan, 22)}
${card(44, 430, 292, 112, Router, "Pi gateway", ["Local MQTT TLS + edge spool", "Commissioned device mappings"])}
${card(44, 598, 292, 100, Cpu, "Direct MQTT devices", ["Individual TLS identities"], colors.cyan, 21)}
${card(44, 722, 292, 108, Network, "OPC UA FX / TSN", ["Local control and diagnostics", "Scheduling stays on the LAN"], colors.cyan, 21)}
${line("M190 367 V427")}
${text(207, 403, "Local acquisition", 16, colors.muted)}

${icon(Cloud, 477, 262, colors.cyan, 60)}
${text(508, 358, "Telemetry", 24, colors.ink, 600, "middle")}
${text(508, 388, "Edge → worker", 19, colors.muted, 400, "middle")}
${rect(399, 430, 218, 112, "#14334b", "#35c7ed", 12)}
${text(508, 466, "CloudAMQP", 26, colors.ink, 700, "middle")}
${text(508, 496, "Managed MQTT broker", 18, colors.muted, 400, "middle")}
${text(508, 523, "TLS + scoped identities", 18, colors.muted, 400, "middle")}
${text(508, 639, "Commands", 24, colors.ink, 600, "middle")}
${text(508, 670, "API → eligible gateway", 18, colors.muted, 400, "middle")}
${text(508, 696, "or direct device", 18, colors.muted, 400, "middle")}
${rect(400, 741, 216, 66, "#0f2b40", "#326c83", 10)}
${icon(ShieldCheck, 415, 758, colors.cyan, 28)}
${text(452, 781, "Scoped topics", 20, colors.ink, 600)}

${rect(678, 242, 506, 343, "#0a1b2c", "#7295ac", 12, "6 5")}
${text(701, 277, "Application API role", 24, colors.ink, 700)}
${card(701, 294, 460, 70, Server, "Node.js API · Express + tRPC", [], colors.orange, 23)}
${card(701, 382, 460, 53, Cpu, "DeviceService", [], colors.cyan, 23)}
${card(701, 445, 460, 53, KeyRound, "IdentityService", [], colors.cyan, 23)}
${card(701, 508, 460, 53, ChartColumn, "AnalyticsService", [], colors.cyan, 23)}
${rect(678, 609, 506, 221, "#0a1b2c", "#7295ac", 12, "6 5")}
${text(701, 645, "Worker role · one instance", 24, colors.ink, 700)}
${card(701, 666, 460, 60, Database, "TelemetryService", [], colors.cyan, 23)}
${card(701, 747, 460, 60, Bell, "NotificationService", [], colors.cyan, 23)}

${card(1247, 254, 380, 110, Monitor, "Vercel web application", ["React UI + same-origin API proxy"], colors.cyan, 23)}
${card(1247, 414, 380, 100, Database, "Aiven PostgreSQL", ["Dashboard • device • telemetry"])}
${card(1247, 540, 380, 94, Boxes, "Redis Cloud", ["Cache + transient event fan-out"])}
${card(1247, 659, 380, 112, Boxes, "BaSyx on Oracle", ["AAS repositories, registries + AASX", "OAuth gateway • Aiven PostgreSQL"], colors.purple)}
${card(1247, 783, 380, 52, Mail, "Resend · email", [], colors.cyan, 23)}
${text(1249, 395, "TLS data access · OAuth asset gateway", 18, colors.muted)}

${line("M337 474 H396")}
${line("M399 523 H339", colors.blue)}
${line("M337 648 H368 V502 H396")}
${line("M618 503 H648 V696 H698")}
${line("M700 329 H648 V455 H620", colors.blue)}
${line("M1245 329 H1165", colors.blue)}
${text(1204, 313, "HTTPS", 15, colors.muted, 400, "middle")}
${line("M700 696 H689 V350 H698", "#e2e8f0", "4 5")}
${line("M1204 464 H1244", colors.blue)}
${line("M1204 586 H1244", colors.blue)}
${line("M1204 709 H1244", colors.blue)}
${line("M1204 809 H1244", colors.blue)}

${rect(24, 876, 1624, 43, "#08182a", "#355267", 10)}
${line("M49 898 H94")}${text(110, 905, "MQTT telemetry", 18, colors.muted)}
${line("M331 898 H376", colors.blue)}${text(392, 905, "HTTPS / MQTT commands", 18, colors.muted)}
${line("M724 898 H769", "#e2e8f0", "4 5")}${text(785, 905, "Private HTTPS ingestion", 18, colors.muted)}
${rect(1129, 886, 39, 24, "none", "#7295ac", 4, "5 4")}${text(1185, 905, "Isolated runtime role", 18, colors.muted)}
</g>
</svg>`;

await mkdir("design", { recursive: true });
await writeFile("design/smart-factory-architecture.svg", svg);
await writeFile("client/public/images/smart_factory_arch.svg", svg);
const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 2,
  });
  await page.setContent(
    `<html><head><style>html,body{margin:0;width:${width}px;height:${height}px;overflow:hidden}svg{display:block}</style></head><body>${svg}</body></html>`
  );
  await page.evaluate(() => document.fonts.ready);
  const issue = await page.evaluate(source => {
    const parsed = new DOMParser().parseFromString(source, "image/svg+xml");
    if (parsed.querySelector("parsererror")) return "Invalid SVG XML";
    for (const group of document.querySelectorAll("g[data-card]")) {
      const rect = group.querySelector(":scope > rect").getBBox();
      for (const label of group.querySelectorAll(":scope > text")) {
        const bounds = label.getBBox();
        if (
          bounds.x < rect.x + 10 ||
          bounds.x + bounds.width > rect.x + rect.width - 10 ||
          bounds.y < rect.y + 5 ||
          bounds.y + bounds.height > rect.y + rect.height - 5
        )
          return `Label exceeds its card: ${label.textContent}`;
      }
    }
    return null;
  }, svg);
  if (issue) throw new Error(issue);
  await page.screenshot({
    path: "client/public/images/smart_factory_arch.png",
    omitBackground: true,
  });
} finally {
  await browser.close();
}
execFileSync(
  "cwebp",
  [
    "-lossless",
    "-m",
    "6",
    "client/public/images/smart_factory_arch.png",
    "-o",
    "client/public/images/smart_factory_arch.webp",
  ],
  { stdio: "ignore" }
);
console.log("Built crisp SVG and 2× lossless PNG/WebP architecture images.");
