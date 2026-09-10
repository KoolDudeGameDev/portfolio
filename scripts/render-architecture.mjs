/**
 * Draws the self-hosted automation platform's architecture.
 *
 *   node scripts/render-architecture.mjs
 *
 * Writes public/assets/platform-architecture.webp.
 *
 * Hand-authored, unlike scripts/render-workflow.mjs which reads an n8n export.
 * It shares that file's palette so the two sit together in a case study without
 * looking like they came from different sites.
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const W = 1200;
const H = 675;

const CANVAS = "#171a24";
const GRID = "#252a3a";
const BOX = "#232838";
const EDGE_C = "#39415a";
const LABEL = "#c9d1e4";
const DIM = "#8792ad";
const WIRE = "#55618a";

const GREEN = "#34d399";
const VIOLET = "#c084fc";
const AMBER = "#fbbf24";
const CYAN = "#22d3ee";
const SLATE = "#7c8aa8";

const FONT =
  'ui-sans-serif, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** A node box with a type dot, a title and an optional sub-line. */
function box(x, y, w, h, color, title, sub) {
  const dotX = x + 18;
  const dotY = y + h / 2;
  const textX = dotX + 16;
  return `<g>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${BOX}" stroke="${EDGE_C}" stroke-width="1"/>
  <circle cx="${dotX}" cy="${dotY}" r="11" fill="${color}" fill-opacity="0.16"/>
  <circle cx="${dotX}" cy="${dotY}" r="5" fill="${color}"/>
  <text x="${textX}" y="${sub ? dotY - 2 : dotY + 5}" font-family='${FONT}' font-size="15" font-weight="500" fill="${LABEL}">${esc(title)}</text>
  ${sub ? `<text x="${textX}" y="${dotY + 15}" font-family='${FONT}' font-size="12" fill="${DIM}">${esc(sub)}</text>` : ""}
</g>`;
}

/** Orthogonal-ish wire with an arrowhead. */
function wire(x1, y1, x2, y2, dashed = false) {
  const bend = Math.max(24, Math.abs(x2 - x1) * 0.45);
  const d =
    Math.abs(y2 - y1) < 2
      ? `M${x1},${y1} L${x2},${y2}`
      : `M${x1},${y1} C${x1 + bend},${y1} ${x2 - bend},${y2} ${x2},${y2}`;
  return `<path d="${d}" fill="none" stroke="${WIRE}" stroke-width="1.7" stroke-opacity="0.9"
      ${dashed ? 'stroke-dasharray="5 5"' : ""} marker-end="url(#a)"/>`;
}

function caption(x, y, text) {
  return `<text x="${x}" y="${y}" font-family='${FONT}' font-size="11.5" fill="${DIM}">${esc(text)}</text>`;
}

const parts = [];

// The host boundary — everything inside runs in one compose stack on one box.
parts.push(
  `<rect x="252" y="132" width="800" height="340" rx="16" fill="#1c2130" fill-opacity="0.5" stroke="${EDGE_C}" stroke-opacity="0.9" stroke-width="1"/>`,
  `<text x="276" y="160" font-family='${FONT}' font-size="12" font-weight="600" fill="${DIM}" letter-spacing="0.06em">OVH VPS · Debian 12 · Docker Compose</text>`,
);

// Left column: the public edge.
parts.push(box(48, 214, 168, 60, GREEN, "Public traffic", "HTTPS"));
parts.push(box(48, 430, 168, 60, SLATE, "DNS", "Hostinger A record"));

// Edge proxy.
parts.push(box(288, 200, 210, 74, AMBER, "Traefik", "TLS · 80 → 443"));

// The app.
parts.push(box(566, 200, 210, 74, VIOLET, "n8n", "workflows + REST/MCP API"));

// Datastores and the AI sidecars.
parts.push(box(844, 176, 176, 62, CYAN, "Postgres 16", "execution state"));
parts.push(box(844, 260, 176, 62, CYAN, "Qdrant", "vector store"));
parts.push(box(844, 344, 176, 62, CYAN, "Ollama", "local models"));

// Recovery path — deliberately drawn OUTSIDE the host boundary, because a
// backup that lives on the machine it is backing up is not a backup.
parts.push(box(566, 528, 210, 66, SLATE, "Git repo", "workflow JSON exports"));

// Wires.
parts.push(wire(216, 244, 288, 240));
parts.push(wire(216, 460, 288, 268, true));
parts.push(wire(498, 237, 566, 237));
parts.push(wire(776, 224, 844, 207));
parts.push(wire(776, 240, 844, 291));
parts.push(wire(776, 256, 844, 375));
parts.push(wire(671, 274, 671, 528));

parts.push(caption(566, 618, "the only copy that survived the SaaS shutting down"));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="1.6" cy="1.6" r="1.6" fill="${GRID}"/>
    </pattern>
    <marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path d="M0,1 L9,5 L0,9 z" fill="${WIRE}"/>
    </marker>
  </defs>
  <rect width="${W}" height="${H}" fill="${CANVAS}"/>
  <rect width="${W}" height="${H}" fill="url(#dots)" opacity="0.5"/>
${parts.join("\n")}
</svg>`;

const out = path.resolve("public/assets/platform-architecture.webp");
if (process.argv.includes("--keep-svg")) {
  writeFileSync(path.resolve("public/assets/platform-architecture.svg"), svg);
}
await sharp(Buffer.from(svg)).webp({ quality: 92 }).toFile(out);
console.log("->", out);
