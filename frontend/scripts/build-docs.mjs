import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

// Offline rendering: Mermaid and Chromium are authoring tools, not site dependencies.
// Prerequisites: pandoc, frozen pnpm install, and Playwright Chromium.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const guides = [
  "architecture",
  "database-schema",
  "api-flows",
  "deployment",
  "system-diagrams",
];
const projects = [
  { directory: "imsop", slug: "imsop", title: "IMSOP" },
  {
    directory: "smartfactoryiot",
    slug: "smart-factory-iot",
    title: "Smart Factory IoT",
  },
];
const escape = value =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const sha = value => createHash("sha256").update(value).digest("hex");
const css = await readFile(path.join(root, "scripts/docs.css"), "utf8");
const { homepage } = JSON.parse(
  await readFile(path.join(root, "package.json"), "utf8")
);
const publicBase = `${homepage.replace(/\/$/, "")}/`;
const mermaidPath = path.join(
  path.dirname(fileURLToPath(import.meta.resolve("mermaid"))),
  "mermaid.min.js"
);
const manifest = { generator: "scripts/build-docs.mjs", documents: {} };
const browser = await chromium.launch();
try {
  for (const project of projects) {
    const directory = path.join(root, "public/docs", project.directory);
    for (const name of guides) {
      const source = await readFile(path.join(directory, `${name}.md`), "utf8");
      const content = execFileSync(
        "pandoc",
        ["--from=gfm", "--to=html5", "--wrap=none"],
        { input: source, encoding: "utf8" }
      );
      const page = await browser.newPage({
        viewport: { width: 1200, height: 1000 },
      });
      try {
        await page.setContent(`<main>${content}</main>`);
        await page.addScriptTag({ path: mermaidPath });
        const diagrams = await page.evaluate(async () => {
          window.mermaid.initialize({
            startOnLoad: false,
            securityLevel: "strict",
            theme: "base",
            flowchart: { htmlLabels: false, useMaxWidth: true },
            themeVariables: {
              fontFamily: "Arial, sans-serif",
              fontSize: "15px",
              background: "#f5f9fc",
              primaryColor: "#e5f2f7",
              primaryTextColor: "#102e43",
              primaryBorderColor: "#087a96",
              lineColor: "#415e70",
              secondaryColor: "#fff1df",
              tertiaryColor: "#eef3f8",
            },
          });
          const diagrams = [];
          for (const block of document.querySelectorAll("pre.mermaid")) {
            const label = (() => {
              let node = block.previousElementSibling;
              while (node && !/^H[23]$/.test(node.tagName))
                node = node.previousElementSibling;
              return node?.textContent ?? "System flow";
            })();
            const { svg } = await window.mermaid.render(
              `diagram-${diagrams.length + 1}`,
              block.textContent
            );
            diagrams.push({ svg, label });
            const placeholder = document.createElement("figure");
            placeholder.dataset.diagram = String(diagrams.length);
            block.replaceWith(placeholder);
          }
          return {
            diagrams,
            html: document.querySelector("main").innerHTML,
            title: document.querySelector("h1").textContent,
          };
        });
        let html = diagrams.html;
        for (const [index, diagram] of diagrams.diagrams.entries()) {
          const svgName = `${name}-${index + 1}.svg`;
          // Supply an intrinsic background so standalone SVGs remain readable in dark browsers.
          const svg = await page.evaluate(source => {
            const node = new DOMParser().parseFromString(
              source,
              "image/svg+xml"
            ).documentElement;
            if (node.localName !== "svg")
              throw new Error("Mermaid emitted invalid SVG");
            node.style.background = "#f5f9fc";
            return new XMLSerializer().serializeToString(node);
          }, diagram.svg);
          await writeFile(path.join(directory, svgName), svg);
          html = html.replace(
            `<figure data-diagram="${index + 1}"></figure>`,
            `<figure><a href="${svgName}" target="_blank" rel="noopener noreferrer" aria-label="Open full-size ${escape(diagram.label)}"><img src="${svgName}" alt="${escape(diagram.label)}" /></a><figcaption>${escape(diagram.label)} · Open the diagram for a full-size view.</figcaption></figure>`
          );
        }
        const back = `../../#/projects/${project.slug}/documentation`;
        const document = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${escape(diagrams.title)} — visual engineering reference for ${project.title}."><title>${escape(diagrams.title)} | Andrew Gotora</title><style>${css}</style></head><body><a class="skip" href="#main-content">Skip to guide</a><header><p>${project.title} / Engineering Documentation</p><nav aria-label="Guide navigation"><a href="${back}">Back to Documentation</a><a href="${name}.pdf">PDF edition</a></nav></header><main id="main-content" tabindex="-1">${html}</main><footer>Andrew Gotora · Engineering reference · Source review: 21 October 2026</footer></body></html>`;
        await page.setContent(document);
        // Convert only links whose rendered counterpart is generated by this script.
        await page.evaluate(names => {
          for (const anchor of document.querySelectorAll("main a[href]")) {
            const href = anchor.getAttribute("href");
            if (
              names.some(
                name => href === `${name}.md` || href?.startsWith(`${name}.md#`)
              )
            )
              anchor.setAttribute("href", href.replace(".md", ".html"));
          }
          for (const table of document.querySelectorAll("table")) {
            const wrapper = document.createElement("div");
            wrapper.className = "table-scroll";
            table.replaceWith(wrapper);
            wrapper.append(table);
          }
          const headings = [...document.querySelectorAll("main h2[id]")];
          const toc = document.createElement("nav");
          toc.setAttribute("aria-label", "Contents");
          const label = document.createElement("strong");
          label.textContent = "In this guide";
          toc.append(label);
          const list = document.createElement("ul");
          for (const heading of headings) {
            const item = document.createElement("li");
            const link = document.createElement("a");
            link.href = `#${heading.id}`;
            link.textContent = heading.textContent;
            item.append(link);
            list.append(item);
          }
          toc.append(list);
          document.querySelector("h1").after(toc);
          for (const heading of headings.filter(heading =>
            /references|related guides|read next|source references/i.test(
              heading.textContent
            )
          )) {
            const section = document.createElement("section");
            section.className = "references";
            heading.before(section);
            let node = heading;
            while (node && (node === heading || node.tagName !== "H2")) {
              const next = node.nextElementSibling;
              section.append(node);
              node = next;
            }
          }
        }, guides);
        const finalHtml = `<!doctype html>\n${await page.locator("html").evaluate(element => element.outerHTML)}\n`;
        await writeFile(path.join(directory, `${name}.html`), finalHtml);
        // Resolve relative image paths for Chromium's print renderer.
        await page.goto(
          pathToFileURL(path.join(directory, `${name}.html`)).href
        );
        await page.evaluate(() => document.fonts.ready);
        const imageFailures = await page
          .locator("img")
          .evaluateAll(images =>
            images
              .filter(image => !image.complete || !image.naturalWidth)
              .map(image => image.src)
          );
        if (imageFailures.length)
          throw new Error(`Unloaded diagrams: ${imageFailures.join(", ")}`);
        // Downloaded PDFs must link to the published guides, never author-machine files.
        await page.evaluate(
          ({ documentUrl }) => {
            for (const anchor of document.querySelectorAll("a[href]")) {
              const href = anchor.getAttribute("href");
              if (href && !href.startsWith("#")) {
                anchor.href = new URL(href, documentUrl).href;
              }
            }
          },
          {
            documentUrl: new URL(
              `docs/${project.directory}/${name}.html`,
              publicBase
            ).href,
          }
        );
        const pdfPath = path.join(directory, `${name}.pdf`);
        await page.pdf({
          path: pdfPath,
          format: "A4",
          printBackground: true,
          preferCSSPageSize: true,
          displayHeaderFooter: true,
          headerTemplate: "<span></span>",
          footerTemplate: `<div style="width:100%;margin:0 16mm;color:#40596d;font:8px Arial;display:flex;justify-content:space-between"><span>${project.title} / ${name}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
        });
        manifest.documents[`${project.directory}/${name}`] = {
          sourceSha256: sha(source),
          htmlSha256: sha(finalHtml),
          pdfSha256: sha(await readFile(pdfPath)),
          diagrams: diagrams.diagrams.length,
        };
        console.log(
          `Rendered ${project.directory}/${name}: ${diagrams.diagrams.length} diagrams`
        );
      } finally {
        await page.close();
      }
    }
  }
  const resume = await browser.newPage();
  try {
    await resume.goto(
      pathToFileURL(path.join(root, "public/resume/resume.html")).href
    );
    await resume.evaluate(() => document.fonts.ready);
    await resume.pdf({
      path: path.join(root, "public/resume/resume_download.pdf"),
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });
    console.log("Rendered updated résumé PDF");
  } finally {
    await resume.close();
  }
} finally {
  await browser.close();
}
await writeFile(
  path.join(root, "public/docs/manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`
);
