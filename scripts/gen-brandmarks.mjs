/**
 * Extracts the SVG path data for the brands used on the site into a committed
 * TypeScript file, so the static export ships no runtime dependency on
 * `simple-icons` (a devDependency) and fetches nothing from a CDN.
 *
 * Run after adding a slug below:  node scripts/gen-brandmarks.mjs
 *
 * Icon paths are CC0 (simple-icons); the trademarks remain their owners'.
 * Brands with no icon in the set (Playwright, GoHighLevel, LearnWorlds, …)
 * are intentionally absent — <BrandMark> renders a monogram tile for those.
 */
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const si = require("simple-icons");

const SLUGS = [
  // languages
  "typescript",
  "javascript",
  "python",
  "c",
  // backend, frontend & data stores
  "nodedotjs",
  "nextdotjs",
  "react",
  "django",
  "fastapi",
  "deno",
  "prisma",
  "supabase",
  "postgresql",
  "tailwindcss",
  // automation & integration
  "n8n",
  "asana",
  "zapier",
  "whatsapp",
  "googleappsscript",
  // testing
  "vitest",
  // ai & data
  "huggingface",
  "googlegemini",
  "pandas",
  // infrastructure & tools
  "git",
  "github",
  "docker",
  "linux",
  "nginx",
  "cloudflare",
  "googlecloud",
  "railway",
  "shopify",
  "jitsi",
  "raylib",
];

const key = (slug) => `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;

const missing = SLUGS.filter((slug) => !si[key(slug)]);
if (missing.length) {
  console.error(`Unknown simple-icons slug(s): ${missing.join(", ")}`);
  process.exit(1);
}

// Theme backgrounds the marks are drawn against (see app/globals.css).
const BG_LIGHT = "fafaf9";
const BG_DARK = "0a0a0a";
const FG_LIGHT = "#0c0c0c";
const FG_DARK = "#f5f5f4";
/**
 * Minimum contrast a mark must reach against its background before we touch it.
 * Deliberately below the WCAG 3:1 figure for graphical objects: every logo here
 * sits beside its own name in text, so the mark is decorative and brand
 * fidelity wins. Measured against the real palette, 1.8 is the break point that
 * rescues the illegible marks (Vitest, JavaScript, Hugging Face and Linux on
 * paper; the near-blacks, pandas, Django and Prisma on ink) while leaving
 * Supabase, WhatsApp, Asana, Cloudflare and Shopify exactly true.
 */
const MIN_CONTRAST = 1.8;

const toRgb = (hex) => {
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const toHex = ([r, g, b]) =>
  "#" +
  [r, g, b]
    .map((v) => Math.round(v).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

function relativeLuminance(rgb) {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x,
  );
  return (hi + 0.05) / (lo + 0.05);
}

function rgbToHsl([r, g, b]) {
  [r, g, b] = [r / 255, g / 255, b / 255];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h =
    max === r
      ? ((g - b) / d + (g < b ? 6 : 0)) / 6
      : max === g
        ? ((b - r) / d + 2) / 6
        : ((r - g) / d + 4) / 6;
  return [h, s, l];
}

function hslToRgb([h, s, l]) {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const channel = (t) => {
    t = (t + 1) % 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [channel(h + 1 / 3) * 255, channel(h) * 255, channel(h - 1 / 3) * 255];
}

/**
 * Fit a brand color to a background it has to be legible against, keeping the
 * brand's hue and saturation and moving only lightness. Hugging Face stays
 * yellow on paper instead of turning black; Django stays green on ink instead
 * of turning white.
 *
 * Brands whose color really is greyscale (Next.js, GitHub, Deno) have no hue
 * to protect, so those fall back to the theme foreground — which is what those
 * brands do with their own marks anyway.
 */
function fit(hex, bgHex, fgFallback) {
  const bg = toRgb(bgHex);
  const rgb = toRgb(hex);
  if (contrast(rgb, bg) >= MIN_CONTRAST) return `#${hex}`.toUpperCase();

  const [h, s, l] = rgbToHsl(rgb);
  // Relative saturation alone calls near-blacks like Railway #0B0D0E colored,
  // so require real chroma in absolute terms too.
  const chroma = Math.max(...rgb) - Math.min(...rgb);
  if (s < 0.15 || chroma < 20) return fgFallback;

  // Walk lightness away from the background until the mark is legible.
  const darken = relativeLuminance(bg) > 0.5;
  for (let step = 1; step <= 100; step++) {
    const next = darken ? l - step / 100 : l + step / 100;
    if (next <= 0 || next >= 1) break;
    const candidate = hslToRgb([h, s, next]);
    if (contrast(candidate, bg) >= MIN_CONTRAST) return toHex(candidate);
  }
  return fgFallback;
}

function themedColors(hex) {
  return {
    light: fit(hex, BG_LIGHT, FG_LIGHT),
    dark: fit(hex, BG_DARK, FG_DARK),
  };
}

const entries = SLUGS.map((slug) => {
  const icon = si[key(slug)];
  const { light, dark } = themedColors(icon.hex);
  return (
    `  ${JSON.stringify(slug)}: {\n` +
    `    title: ${JSON.stringify(icon.title)},\n` +
    `    path: ${JSON.stringify(icon.path)},\n` +
    `    light: ${JSON.stringify(light)},\n` +
    `    dark: ${JSON.stringify(dark)},\n` +
    `  },`
  );
}).join("\n");

const out = `// GENERATED by scripts/gen-brandmarks.mjs — do not edit by hand.
// Single-path brand marks (24x24 viewBox) drawn in currentColor, plus the
// brand color used on hover — one per theme, so near-black marks stay visible
// on the dark side and near-white marks on the light side.
// Source: simple-icons (CC0). Trademarks belong to their respective owners.

export type BrandMarkData = {
  title: string;
  path: string;
  light: string;
  dark: string;
};

export const brandMarks: Record<string, BrandMarkData> = {
${entries}
};
`;

writeFileSync(new URL("../content/brandmarks.ts", import.meta.url), out);
console.log(`Wrote ${SLUGS.length} brand marks to content/brandmarks.ts`);
