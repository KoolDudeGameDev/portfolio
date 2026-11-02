/**
 * Turns the raw captures into the Showcase images.
 *
 *   npm run showcase -- <folder of raw captures>
 *
 * Each source named in content/showcase.ts becomes two files under
 * public/assets/showcase: `<name>.webp` for the popup, and `<name>.thumb.webp`
 * for the moving rows. Thumbnails keep the rows light: thirty-odd images sit on
 * screen at once, and the full size only loads when one is opened.
 *
 * Raw captures stay in the gitignored docs/ folder. Nothing goes in there or
 * through here until it has been checked by eye for real names and figures;
 * see "Case-study imagery" in CLAUDE.md.
 */
import { mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
// sharp ships with Next; it is not a direct dependency of this project.
const sharp = require("sharp");

const raw = process.argv[2];
if (!raw) {
  console.error("Usage: npm run showcase -- <folder of raw captures>");
  process.exit(1);
}

const out = path.resolve(import.meta.dirname, "../public/assets/showcase");
mkdirSync(out, { recursive: true });

/** Width of the popup image. Phone captures are 2x, so they stay sharp at 780. */
const FULL = { web: 1600, phone: 780 };
/** Twice the size a tile is drawn at, for high-density screens. */
const THUMB = { web: 760, phone: 340 };

for (const file of readdirSync(raw).filter((f) => /\.(png|webp)$/.test(f))) {
  const name = file.replace(/\.(png|webp)$/, "").replace(/-desk$/, "");
  const kind = file.includes("-phone") ? "phone" : "web";
  const source = path.join(raw, file);

  await sharp(source)
    .resize({ width: FULL[kind], withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(out, `${name}.webp`));
  await sharp(source)
    .resize({ width: THUMB[kind] })
    .webp({ quality: 72 })
    .toFile(path.join(out, `${name}.thumb.webp`));
  console.log(name);
}
