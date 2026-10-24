import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

// Re-export the existing artwork; Chromium is an authoring tool only.
const source = await readFile(new URL("../design/favicon-source.png", import.meta.url));
const sizes = [16, 32, 48, 64, 180];
const browser = await chromium.launch();
let images;
try {
  const page = await browser.newPage();
  images = await page.evaluate(async ({ source, sizes }) => {
    const image = new Image();
    image.src = `data:image/png;base64,${source}`;
    await image.decode();
    return Object.fromEntries(sizes.map(size => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const context = canvas.getContext("2d");
      context.imageSmoothingQuality = "high";
      context.drawImage(image, 0, 0, size, size);
      return [size, canvas.toDataURL("image/png").split(",")[1]];
    }));
  }, { source: source.toString("base64"), sizes });
} finally {
  await browser.close();
}

const frames = sizes.filter(size => size <= 64).map(size => ({
  size,
  png: Buffer.from(images[size], "base64"),
}));
// ICO header followed by one directory entry per embedded PNG image.
const directory = Buffer.alloc(6 + 16 * frames.length);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(frames.length, 4);
let offset = directory.length;
frames.forEach(({ size, png }, index) => {
  const entry = 6 + index * 16;
  directory.writeUInt8(size, entry);
  directory.writeUInt8(size, entry + 1);
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(png.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
const output = fileURLToPath(new URL("../client/public/", import.meta.url));
await writeFile(`${output}favicon.ico`, Buffer.concat([directory, ...frames.map(frame => frame.png)]));
await writeFile(`${output}favicon.png`, Buffer.from(images[64], "base64"));
await writeFile(`${output}apple-touch-icon.png`, Buffer.from(images[180], "base64"));
console.log("Exported multi-size favicon.ico, 64px favicon.png, and 180px apple-touch-icon.png.");
