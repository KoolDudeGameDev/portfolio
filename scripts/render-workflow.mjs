/**
 * Renders an n8n workflow export into a 16:9 snippet for a work card.
 *
 *   node scripts/render-workflow.mjs <workflow.json> <output-name> [--zoom=N] [--fit]
 *
 * Writes public/assets/<output-name>.webp. Pass --keep-svg to also drop the
 * intermediate SVG next to it for inspection.
 *
 * ── Confidentiality ──────────────────────────────────────────────────────
 * It draws ONLY node names, node types, the connections between them, and the
 * GEOMETRY of sticky notes. Node parameters are never read, because n8n exports
 * carry live values — broker email addresses, phone numbers, endpoint URLs —
 * that must not end up in a published image. Sticky-note TEXT is never drawn
 * either: notes routinely quote clients by name. Keep the source JSON out of
 * this repo for the same reason; pass a path to wherever it actually lives.
 *
 * ── Why it looks the way it does ─────────────────────────────────────────
 * A card renders this about 380px wide, so a node label lands at roughly 4px
 * tall — unreadable. The image therefore has to work as silhouette and texture
 * first and reward zooming second, which is why hue carries the node taxonomy
 * (it survives being too small to read), why each node gets a filled type dot
 * rather than a thin colour bar (a 3px bar disappears; a dot reads as a point
 * in a constellation), and why edges are drawn twice — a wide soft glow under a
 * crisp line — so the wiring reads as circuitry instead of grey scratches.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const args = process.argv.slice(2);
const zoomArg = args.find((a) => a.startsWith("--zoom"));
const forceFit = args.includes("--fit");
const zoomOverride = zoomArg ? Number(zoomArg.split("=")[1] ?? 130) : 0;
const [input, outName] = args.filter((a) => !a.startsWith("--"));
if (!input || !outName) {
  console.error(
    "usage: node scripts/render-workflow.mjs <workflow.json> <output-name> [--zoom[=nodeWidthPx]] [--fit]",
  );
  process.exit(1);
}

const W = 1200;
const H = 675;
const PAD = 52;
// n8n's own canvas geometry: nodes sit on a 240px pitch and draw about this big.
const NODE_W = 200;
const NODE_H = 72;

/* ── palette ──────────────────────────────────────────────────────────────
   A deep indigo-slate rather than a tinted near-black: it reads as an editor
   without landing on the generic "near-black + one neon accent" look, and it
   sits against the site's cream card the way an embedded terminal would. */
const CANVAS = "#171a24";
const GRID = "#252a3a";
const NODE_FILL = "#232838";
const NODE_EDGE = "#39415a";
const LABEL = "#c9d1e4";
const EDGE = "#55618a";
const EDGE_ALT = "#3d4661";

/* Hue = node family. This is the one piece of information that survives the
   image being too small to read, so it does the heavy lifting. */
const TYPE_COLOR = {
  webhook: "#34d399",
  executeWorkflowTrigger: "#34d399",
  manualTrigger: "#34d399",
  scheduleTrigger: "#34d399",
  shopifyTrigger: "#34d399",
  formTrigger: "#34d399",
  code: "#818cf8",
  if: "#fbbf24",
  switch: "#fbbf24",
  filter: "#fbbf24",
  httpRequest: "#c084fc",
  executeWorkflow: "#c084fc",
  respondToWebhook: "#7c8aa8",
  noOp: "#7c8aa8",
  stopAndError: "#fb7185",
  emailSend: "#f87171",
  gmail: "#f87171",
  telegram: "#f87171",
  set: "#22d3ee",
  merge: "#22d3ee",
  crypto: "#2dd4bf",
  dateTime: "#2dd4bf",
  itemLists: "#22d3ee",
  splitInBatches: "#22d3ee",
  moveBinaryData: "#22d3ee",
  github: "#94a3b8",
  n8n: "#94a3b8",
  shopify: "#4ade80",
};
const DEFAULT_COLOR = "#8792ad";

/* n8n's sticky-note colour index. In these workflows the author used it as real
   structure — red bands are error handling, green are success paths — so the
   panels carry meaning rather than decorating. */
const NOTE_TINT = {
  1: "#fbbf24",
  2: "#34d399",
  3: "#fb7185",
  4: "#34d399",
  5: "#60a5fa",
  6: "#c084fc",
  7: "#94a3b8",
};

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const wf = JSON.parse(readFileSync(input, "utf8"));
const all = wf.nodes ?? [];
const notes = all.filter((n) => n.type?.endsWith("stickyNote"));
const nodes = all.filter((n) => !n.type?.endsWith("stickyNote"));
if (!nodes.length) {
  console.error("no drawable nodes in", input);
  process.exit(1);
}

const shortType = (n) =>
  (n.type ?? "").replace("n8n-nodes-base.", "").replace("@n8n/n8n-nodes-langchain.", "");
const colorFor = (n) => TYPE_COLOR[shortType(n)] ?? DEFAULT_COLOR;

// --- fit the graph into the frame ---------------------------------------
const boxes = [
  ...nodes.map((n) => ({ x: n.position[0], y: n.position[1], w: NODE_W, h: NODE_H })),
  ...notes.map((n) => ({
    x: n.position[0],
    y: n.position[1],
    w: n.parameters?.width ?? 240,
    h: n.parameters?.height ?? 160,
  })),
];
const minX = Math.min(...boxes.map((b) => b.x));
const minY = Math.min(...boxes.map((b) => b.y));
const maxX = Math.max(...boxes.map((b) => b.x + b.w));
const maxY = Math.max(...boxes.map((b) => b.y + b.h));
// Frame on the NODES, not the sticky notes: a note can be 3000px wide and would
// drag the frame off the graph it is annotating.
const nMinX = Math.min(...nodes.map((n) => n.position[0]));
const nMinY = Math.min(...nodes.map((n) => n.position[1]));
const nMaxX = Math.max(...nodes.map((n) => n.position[0] + NODE_W));
const nMaxY = Math.max(...nodes.map((n) => n.position[1] + NODE_H));

const fitScale = Math.min(
  (W - PAD * 2) / (nMaxX - nMinX),
  (H - PAD * 2) / (nMaxY - nMinY),
  1,
);

// Below this the labels stop being readable even in the case-study modal, so a
// whole-graph fit is not worth having — better to crop and stay legible.
const MIN_SCALE = 0.5;

let scale;
let cx;
let cy;

if (zoomOverride > 0) {
  scale = Math.min(zoomOverride / NODE_W, 1);
} else if (forceFit || fitScale >= MIN_SCALE) {
  scale = fitScale;
} else {
  scale = MIN_SCALE;
}

if (scale <= fitScale + 1e-6) {
  // Everything fits at this scale: centre the graph.
  cx = (nMinX + nMaxX) / 2;
  cy = (nMinY + nMaxY) / 2;
} else {
  // It does not fit, so the frame has to crop. Slide a window over the graph and
  // keep the position that shows the MOST nodes — centring on a median or a
  // centroid lands in whitespace whenever the graph is L-shaped or has an
  // outlying error lane, which is most of them.
  // Inset by the padding: a node counts as "shown" only if it clears the frame
  // edge, otherwise the best-scoring window is one with a row sliced in half.
  const winW = (W - PAD * 2) / scale;
  const winH = (H - PAD * 2) / scale;
  let best = -1;
  for (const a of nodes) {
    for (const b of nodes) {
      const ccx = a.position[0] + NODE_W / 2;
      const ccy = b.position[1] + NODE_H / 2;
      const l = ccx - winW / 2;
      const t = ccy - winH / 2;
      let seen = 0;
      for (const n of nodes) {
        if (
          n.position[0] >= l &&
          n.position[0] + NODE_W <= l + winW &&
          n.position[1] >= t &&
          n.position[1] + NODE_H <= t + winH
        ) {
          seen++;
        }
      }
      // Tie-break toward the top-left, so a frame starts where the flow starts.
      if (seen > best || (seen === best && ccx + ccy < cx + cy)) {
        best = seen;
        cx = ccx;
        cy = ccy;
      }
    }
  }
}

const offX = W / 2 - cx * scale;
const offY = H / 2 - cy * scale;
const tx = (x) => x * scale + offX;
const ty = (y) => y * scale + offY;

const labelled = NODE_W * scale >= 84;
const byName = new Map(nodes.map((n) => [n.name, n]));

// --- edges ---------------------------------------------------------------
const edges = [];
for (const [from, outputs] of Object.entries(wf.connections ?? {})) {
  const src = byName.get(from);
  if (!src) continue;
  (outputs.main ?? []).forEach((branch, branchIndex) => {
    (branch ?? []).forEach((link) => {
      const dst = byName.get(link.node);
      if (!dst) return;
      edges.push({ src, dst, branchIndex });
    });
  });
}

const edgeGeometry = edges.map(({ src, dst, branchIndex }) => {
  const x1 = tx(src.position[0] + NODE_W);
  const y1 = ty(src.position[1] + NODE_H / 2);
  const x2 = tx(dst.position[0]);
  const y2 = ty(dst.position[1] + NODE_H / 2);
  const bend = Math.max(26, Math.abs(x2 - x1) * 0.45);
  const d = `M${x1.toFixed(1)},${y1.toFixed(1)} C${(x1 + bend).toFixed(1)},${y1.toFixed(1)} ${(x2 - bend).toFixed(1)},${y2.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
  return { d, branchIndex };
});

// Drawn twice: a wide soft pass reads as a glow at thumbnail size, the crisp
// pass keeps it a line when someone opens the case study.
const edgeGlow = edgeGeometry
  .map(
    ({ d }) =>
      `<path d="${d}" fill="none" stroke="${EDGE}" stroke-width="${Math.max(3, 6 * scale).toFixed(2)}" stroke-opacity="0.16" stroke-linecap="round"/>`,
  )
  .join("\n");

const edgeLines = edgeGeometry
  .map(
    ({ d, branchIndex }) =>
      `<path d="${d}" fill="none" stroke="${branchIndex === 0 ? EDGE : EDGE_ALT}" stroke-width="${Math.max(1, 1.7 * scale).toFixed(2)}" stroke-opacity="${branchIndex === 0 ? 0.95 : 0.6}" stroke-linecap="round"/>`,
  )
  .join("\n");

// --- sticky notes as tinted regions -------------------------------------
const notePanels = notes
  .map((n) => {
    const w = (n.parameters?.width ?? 240) * scale;
    const h = (n.parameters?.height ?? 160) * scale;
    const tint = NOTE_TINT[n.parameters?.color ?? 1] ?? NOTE_TINT[1];
    return `<rect x="${tx(n.position[0]).toFixed(1)}" y="${ty(n.position[1]).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${(10 * scale).toFixed(1)}" fill="${tint}" fill-opacity="0.055" stroke="${tint}" stroke-opacity="0.18" stroke-width="1"/>`;
  })
  .join("\n");

// --- node cards ----------------------------------------------------------
const nodeCards = nodes
  .map((n) => {
    const x = tx(n.position[0]);
    const y = ty(n.position[1]);
    const w = NODE_W * scale;
    const h = NODE_H * scale;
    const color = colorFor(n);
    const r = Math.max(3, 10 * scale);
    const dotR = Math.max(2.2, 5.5 * scale);
    const dotX = x + Math.max(8, 18 * scale);
    const dotY = y + h / 2;

    let label = "";
    if (labelled) {
      const textX = dotX + dotR + Math.max(5, 10 * scale);
      const room = x + w - textX - 8 * scale;
      const size = Math.max(9.5, 13 * scale);
      const max = Math.max(4, Math.floor(room / (size * 0.53)));
      const text = n.name.length > max ? `${n.name.slice(0, max - 1)}…` : n.name;
      label = `<text x="${textX.toFixed(1)}" y="${(dotY + size * 0.35).toFixed(1)}" font-family="ui-sans-serif, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="${size.toFixed(1)}" font-weight="500" fill="${LABEL}">${esc(text)}</text>`;
    }

    return `<g>
  <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${r.toFixed(1)}" fill="${NODE_FILL}" stroke="${NODE_EDGE}" stroke-width="1"/>
  <circle cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="${(dotR * 2.1).toFixed(1)}" fill="${color}" fill-opacity="0.16"/>
  <circle cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="${dotR.toFixed(1)}" fill="${color}"/>
  ${label}
</g>`;
  })
  .join("\n");

// The graph genuinely continues past the crop, so the frame fades rather than
// cutting — it reads as a viewport onto something larger, which is the truth.
const fade = `
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#fadeTop)"/>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#fadeBottom)"/>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#fadeLeft)"/>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#fadeRight)"/>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="1.6" cy="1.6" r="1.6" fill="${GRID}"/>
    </pattern>
    <linearGradient id="fadeTop" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${CANVAS}" stop-opacity="1"/>
      <stop offset="0.13" stop-color="${CANVAS}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="fadeBottom" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${CANVAS}" stop-opacity="1"/>
      <stop offset="0.13" stop-color="${CANVAS}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="fadeLeft" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${CANVAS}" stop-opacity="1"/>
      <stop offset="0.09" stop-color="${CANVAS}" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="fadeRight" x1="1" y1="0" x2="0" y2="0">
      <stop offset="0" stop-color="${CANVAS}" stop-opacity="1"/>
      <stop offset="0.09" stop-color="${CANVAS}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${CANVAS}"/>
  <rect width="${W}" height="${H}" fill="url(#dots)" opacity="0.55"/>
${notePanels}
${edgeGlow}
${edgeLines}
${nodeCards}
${fade}
</svg>`;

const webpPath = path.resolve(`public/assets/${outName}.webp`);
if (args.includes("--keep-svg")) {
  writeFileSync(path.resolve(`public/assets/${outName}.svg`), svg);
}
await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(webpPath);

console.log(
  `${path.basename(input)}  ${nodes.length} nodes, ${edges.length} edges, ` +
    `${notes.length} notes  ${scale <= fitScale + 1e-6 ? "fit" : "cropped"} scale=${scale.toFixed(3)} labels=${labelled}\n` +
    `  -> ${webpPath}`,
);
