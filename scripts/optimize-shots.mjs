/**
 * Turns raw screenshots into the 16:9 WebP thumbnails the work cards expect.
 *
 * Drop a .png/.jpg into public/assets/, then:  node scripts/optimize-shots.mjs
 *
 * Each source is centre-cropped to 1200x675 (the card renders 16:9 and
 * object-cover would crop anyway, so we do it here where the result is
 * predictable), converted to WebP, and the original is deleted. Reference the
 * output from content/work.ts as `image: "<name>.webp"`.
 */
import { readdirSync, statSync, unlinkSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
// sharp ships with Next; it is not a direct dependency of this project.
const sharp = require("sharp");

const WIDTH = 1200;
const HEIGHT = 675;

const dir = path.resolve(import.meta.dirname, "../public/assets");

/**
 * Files that live here as PNG on purpose and must not be swept up: the share
 * card is referenced as `og.png` by the metadata, and the `mark-*` / `kg-mark`
 * logos are painted through `.mask-mark`, which needs the PNG alpha channel.
 * Converting and deleting those silently breaks the share preview and the
 * theme-inverting logos, which is exactly what this guard exists to stop.
 */
const KEEP_AS_PNG = /^(og|kg-mark|mark-.*)\.png$/i;

// With filenames on the command line, only those are converted:
//   npm run shots -- my-screenshot.png
// Without, every unprotected screenshot in the folder is, as before.
const named = process.argv.slice(2);

const sources = readdirSync(dir)
  .filter((f) => /\.(png|jpe?g)$/i.test(f))
  .filter((f) => (named.length ? named.includes(f) : !KEEP_AS_PNG.test(f)));

const skipped = readdirSync(dir).filter(
  (f) => !named.length && KEEP_AS_PNG.test(f),
);
if (skipped.length) {
  console.log(`Skipping ${skipped.length} protected PNG(s): ${skipped.join(", ")}`);
}

if (named.length) {
  const missing = named.filter((f) => !sources.includes(f));
  if (missing.length) {
    console.error(`Not found in public/assets: ${missing.join(", ")}`);
    process.exit(1);
  }
}

if (!sources.length) {
  console.log("No .png/.jpg files to convert in public/assets — nothing to do.");
  process.exit(0);
}

for (const file of sources) {
  const src = path.join(dir, file);
  const out = path.join(dir, `${path.parse(file).name}.webp`);

  const { width = 0, height = 0 } = await sharp(src).metadata();
  if (width < WIDTH) {
    console.warn(
      `${file}  source is only ${width}px wide — it will be upscaled and look ` +
        `soft. Recapture at ${WIDTH}px or wider if you can.`,
    );
  }

  await sharp(src)
    .resize({ width: WIDTH, height: HEIGHT, fit: "cover", position: "centre" })
    .webp({ quality: 82 })
    .toFile(out);

  console.log(
    `${file} (${width}x${height})  ->  ${path.basename(out)}  ` +
      `${(statSync(out).size / 1024).toFixed(1)}KB`,
  );
  unlinkSync(src);
}
