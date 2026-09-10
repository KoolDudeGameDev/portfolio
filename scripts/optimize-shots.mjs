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
const sources = readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f));

if (!sources.length) {
  console.log("No .png/.jpg files in public/assets — nothing to do.");
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
