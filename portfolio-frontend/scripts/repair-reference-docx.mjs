import { chromium } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { mkdir, copyFile, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const directory = path.resolve('client/public/docs/smartfactoryiot');
const media = '/tmp/portfolio-docx-media';
await mkdir(media, { recursive: true });
const browser = await chromium.launch();
try {
  for (const name of ['architecture', 'api-flows', 'database-schema']) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 1600 }, deviceScaleFactor: 2 });
    try {
      await page.goto(pathToFileURL(path.join(directory, `${name}.html`)).href);
      await page.evaluate(() => document.fonts.ready);
      let index = 0;
      for (const image of await page.locator('main img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(node => node.decode());
        const png = path.join(media, `${name}-${++index}.png`);
        await image.screenshot({ path: png });
        await image.evaluate((node, src) => node.setAttribute('src', src), png);
      }
      const html = path.join(media, `${name}.html`);
      await writeFile(html, await page.content());
      const output = path.join(media, `${name}.docx`);
      execFileSync('pandoc', ['-f', 'html', '-t', 'docx', '--reference-doc', path.join(directory, `${name}.docx`), '--resource-path', media, html, '-o', output]);
      await copyFile(output, path.join(directory, `${name}.docx`));
      console.log(`Repaired ${name}.docx: ${index} browser-rendered diagrams`);
    } finally { await page.close(); }
  }
} finally { await browser.close(); }
const dataFile = 'client/src/data/smartFactory.ts';
const data = await readFile(dataFile, 'utf8');
if (!data.includes('Python authenticates allowlisted sources')) throw new Error('Unexpected source wording');
await writeFile(dataFile, data.replace('Python authenticates allowlisted sources', 'Python verifies allowlisted source identities'));
