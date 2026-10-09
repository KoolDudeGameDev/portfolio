/**
 * Renders the authored SVG diagrams in scripts/diagrams/ into the 16:9 WebP
 * thumbnails the work cards expect.
 *
 *   npm run diagrams                 every *.html in scripts/diagrams/
 *   npm run diagrams -- stage-sync   just that one (with or without .html)
 *
 * Each file is opened in headless Chromium at 1200x675, screenshotted, and
 * written to public/assets/<name>.webp. Nothing else in public/assets is read
 * or touched -- this deliberately does NOT go through scripts/optimize-shots.mjs,
 * which sweeps up every png in the folder including og.png and the mark-* logos.
 */
import { readdirSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { chromium } from "playwright";

const require = createRequire(import.meta.url);
// sharp ships with Next; it is not a direct dependency of this project.
const sharp = require("sharp");

const WIDTH = 1200;
const HEIGHT = 675;

const srcDir = path.resolve(import.meta.dirname, "diagrams");
const outDir = path.resolve(import.meta.dirname, "../public/assets");

/**
 * The diagram file and the asset it produces are not always named the same --
 * the asset names predate the diagram sources. Anything not listed here keeps
 * its own basename.
 */
const OUTPUT_NAME = {
  "broker-routing": "workflow-broker-routing",
  "commission-engine": "workflow-commission-engine",
  "messaging-engine": "workflow-messaging-engine",
  "qr-capture": "workflow-qr-capture",
  "sales-attribution": "workflow-sales-attribution",
  "stage-sync": "workflow-stage-sync",
  "whatsapp-otp": "whatsapp-otp-login",
  "idempotent-intake": "workflow-idempotent-intake",
  "invoice-queue": "workflow-invoice-queue",
  "leave-intake": "workflow-leave-intake",
  "open-source-set": "workflow-open-source-set",
  "rag-gmail": "workflow-rag-gmail",
  "cebuano-asr": "asr",
};

const named = process.argv.slice(2).map((a) => path.parse(a).name);

const sources = readdirSync(srcDir)
  .filter((f) => f.endsWith(".html"))
  .filter((f) => (named.length ? named.includes(path.parse(f).name) : true));

if (named.length) {
  const found = sources.map((f) => path.parse(f).name);
  const missing = named.filter((n) => !found.includes(n));
  if (missing.length) {
    console.error(`Not found in scripts/diagrams: ${missing.join(", ")}`);
    process.exit(1);
  }
}

if (!sources.length) {
  console.log("No diagrams to render.");
  process.exit(0);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 2,
});

for (const file of sources) {
  const stem = path.parse(file).name;
  const out = path.join(outDir, `${OUTPUT_NAME[stem] ?? stem}.webp`);

  await page.goto(pathToFileURL(path.join(srcDir, file)).href, {
    waitUntil: "networkidle",
  });
  // Webfonts load from Google; a screenshot taken before they swap in renders
  // the fallback and every text width is wrong.
  await page.evaluate(() => document.fonts.ready);

  const target = page.locator("svg#d");
  if (!(await target.count())) {
    console.error(`${file}  has no <svg id="d"> -- skipped`);
    continue;
  }

  const png = await target.screenshot({ type: "png" });
  await sharp(png).resize(WIDTH, HEIGHT).webp({ quality: 82 }).toFile(out);

  console.log(
    `${file}  ->  ${path.basename(out)}  ${(statSync(out).size / 1024).toFixed(1)}KB`,
  );
}

await browser.close();
