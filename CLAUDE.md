# Portfolio — Kyle Gregory Ibo

Personal portfolio website. Single-page, client-first, deployed to **GitHub Pages**.

## Owner
Kyle Gregory Ibo — Automation & Systems Integration Engineer (full-stack web, backend,
systems integration, applied ML).
- GitHub: [KoolDudeGameDev](https://github.com/KoolDudeGameDev)
- Contact email shown on site: gregoryibo7@gmail.com
- Positioning: **client-first** (win business owners), with skills/tech/experience in
  separate, neutrally-named sections. Do **not** use "recruiters/hiring" wording on the site.
- **Copy leans capability-first, tools as proof.** Say what the thing does, then name the
  vendor once as evidence — not "I do GoHighLevel and n8n". The site must read as
  *builds software end to end*, not as one platform's specialist. Vendor names belong in
  Tech Stack and the case studies.
- **The offshore/multinational angle is deliberate.** Bai Finance is an Australian finance
  brokerage worked remotely from Cebu; the ecommerce client is an agency contract. Keep
  "Australia", "remote", and the timezone framing where they appear.
- **Client confidentiality:** the ecommerce client is never named — it is always
  "Confidential Client — Ecommerce". Same for any other client that has not agreed to be
  named.
- ☠️ **Claims must survive `git log`.** Several projects here are team codebases where Kyle
  is one contributor among many (BAI-Website: 8 of 223 commits; BaiAcademy: 20 of 181). A
  case study describes **what he authored**, not what the repo contains — an interviewer
  asking "walk me through how you built that" must get a real answer. When writing or
  editing a case study for a team project, check `git log --author` first and frame the
  project as context (`org: "BaiAcademy — team-built LMS"`) with his own work as the
  substance. Verified 2026-09-21; two case studies were rewritten for exactly this.

## Stack & structure
- **Next.js (App Router) + TypeScript + Tailwind CSS v4.** Statically exported
  (`output: 'export'`) — the site is 100% static HTML/CSS/JS served from GitHub Pages.
- **There is a build step** (`npm run build` → `out/`). This replaced the old
  hand-written single-file `index.html` (see git history for the original).
- Font Awesome is gone; icons are inline SVGs in [components/Icons.tsx](components/Icons.tsx).
  Fonts come from `next/font/google` — **Instrument Sans** for sans, **Fraunces** for the
  italic serif accents.
- Brand/tech logos come from `simple-icons` at build time via
  `npm run brandmarks` → [content/brandmarks.ts](content/brandmarks.ts), rendered by
  [components/BrandMark.tsx](components/BrandMark.tsx). Flat-black PNG logos are painted
  with the `.mask-mark` CSS trick so they invert with the theme.

## Key files
- [app/layout.tsx](app/layout.tsx) — fonts, `<ThemeProvider>`, SEO + OG metadata, `<html>` shell.
- [app/page.tsx](app/page.tsx) — composes the sections in order.
- [app/globals.css](app/globals.css) — Tailwind import + **design tokens**. See below.
- [components/](components/) — one component per section, plus `Navbar`, `ThemeToggle`,
  `ThemeProvider`, `Icons`, `SectionHeading`, `BrandMark`, `LogoMarquee`, `WorkCard`,
  `WorkModal`, `ResumeModal`.
- [content/](content/) — **typed data files** (`services.ts`, `work.ts`, `techstack.ts`,
  `experience.ts`, `faq.ts`, `brandmarks.ts`). **To add a project/service/role/FAQ, edit
  these — do not hardcode content in components.** Each is a typed array; copy an existing
  object and edit in place. `brandmarks.ts` is generated — don't hand-edit it.
- [lib/site.ts](lib/site.ts) — site constants (name, role, email, socials, location),
  `mailtoHref`, `SITE_ORIGIN`, and the `asset()` helper that prefixes the deploy base path.
- [public/assets/](public/assets/) — images (referenced via `asset("/assets/…")`).
- [scripts/](scripts/) — the image pipelines. See **Case-study imagery** below.

## Section order (client-first, in `app/page.tsx`)
Navbar → Hero (`#home`) → BuildFlow → LogoMarquee → Services (`#services`) → Work (`#work`) →
Tech Stack (`#stack`) → Experience (`#experience`) → About (`#about`) →
Contact (`#contact`) → Footer.
Navbar is fixed; nav links smooth-scroll (CSS `scroll-behavior` + `scroll-margin-top: 92px`).

**`BuildFlow` is an unnumbered band**, like `LogoMarquee` — a live, hoverable version of
the six-step delivery process, sitting between the hero and the marquee.

☠️ **It has no `"use client"`, and must not get one.** Every moving part is a CSS rule in
`globals.css`: the travelling `.flow-spark`, the hover lift, and the inspect readout, which
works through `.flow-stage:hover` on the readout, detail panel and tick row, plus two
`:has()` rules for the dimming and the idle state. Zero JavaScript is the entire reason this is safe above the fold on a phone.
Sparks are removed from paint below 768px and under `prefers-reduced-motion`; below 1024px
the readout is clipped rather than `display:none`, so screen readers keep it.

Each stage's **readout, detail panel and tick row** live inside that stage but paint into
the canvas corners. That only works because `.flow-stage` stays `position: static` — the
hover lift is on `.flow-stage-box` precisely so the stage never becomes a containing block.
Move the transform up a level and all three silently reposition.

The **FAQ accordion is exclusive** via `<details name="faq">` — a browser feature, not
script. It matters beyond tidiness: `Contact`'s grid has no `items-start`, so both cards
share the row height, and without exclusivity a stack of open answers would stretch the
form card arbitrarily.

Content is `content/process.ts`, and every line of it is already claimed in `services.ts`
or `faq.ts`. Keep it that way: it is the first promise a visitor reads.

**The `--diagram-*` tokens** (`app/globals.css`) are the live band's surface: **true
neutrals**, no blue cast, and they **follow the theme**: a white sheet in light mode, a
near-black canvas under `.dark` (changed 2026-10-09 at Kyle's request — the always-dark
band read as a black slab on the paper page). The spark glow is `--diagram-glow`, not a
hardcoded rgba, for the same reason.

⚠️ They are **not** the palette of the baked case-study WebPs. Those render from
`scripts/diagrams/*.html`, which carry their own cooler hex (`#171a24` / `#232838` /
`#39415a`). So the live band is neutral and the work-card images are cool — a known,
accepted divergence. Re-rendering the 15 diagrams to neutral is the follow-up if the two
surfaces ever need to match.

**`.veil`** is one fixed radial gradient mounted in `app/layout.tsx`. Painted once, never
animated, `pointer-events: none`.

**The FAQ is not a section.** `Faq.tsx` exports a `FaqPanel` that `Contact` renders in a
two-column grid beside the form — the objections belong next to the box people hesitate to
fill in, and as a full-width band it cost a screen of scrolling for the page's lowest-value
content. It keeps `id="faq"`, which is both a deep-link target and what
`tests/navigation.spec.ts` scrolls to when asserting the nav highlights nothing there.
Section markers therefore run 01–06, with Contact as `06`.

## Styling conventions
- **Theme: monochrome editorial.** Light is paper (`#fafaf9`), dark is warm near-black
  (`#0a0a0a`) — not cold slate. Toggled via `next-themes` (`class="dark"` on `<html>`),
  with a View Transition crossfade fired from `ThemeToggle.tsx`.
- **`--accent` is ink, not a hue.** Emphasis is carried by contrast, weight and the italic
  serif — *not* by colour. There is exactly one hue on the site: `--live` (green), reserved
  for "running right now" indicators (hero status dot, `Active` badges). Do not spend it on
  anything else, or it stops meaning anything.
- **All colours come from CSS custom properties** in [app/globals.css](app/globals.css)
  (`--bg`, `--surface`, `--card`, `--fg`, `--muted`, `--border`, `--accent`, `--accent-fg`,
  `--live`), defined twice: `:root` (light) and `.dark` (dark). They're mapped to Tailwind
  tokens via `@theme inline`, so use `bg-bg`, `text-fg`, `text-muted`, `border-border`,
  `bg-accent`, `bg-live`. **Reuse these tokens; don't hardcode hex values.**
- Editorial type signature: uppercase tracked eyebrow labels, numbered section markers, large
  headings mixing bold sans + **italic serif** accents (`font-serif italic text-accent`),
  hairline dividers, generous whitespace.
- Layout: `max-w-6xl` container, Tailwind grid/flex, cards lift on hover (`hover:-translate-y-1`).
- Responsive: use Tailwind's `sm`/`md` breakpoints (mobile-first).
- **`prefers-reduced-motion` is handled properly and must stay that way.** `globals.css`
  kills all transitions/animations, drops `scroll-behavior`, and degrades the logo marquee
  to a static wrapped row. Any JS-driven motion must check it explicitly — the CSS
  `animation: none` rule will not stop a `requestAnimationFrame` loop.

## Case-study imagery
Three pipelines, in descending order of preference. **Lead a card with an authored diagram,
not a raw canvas screenshot** — a 30-node canvas at 380px is grey texture, and the argument
is what has to survive the thumbnail.

1. **Authored SVG diagrams** — [scripts/diagrams/](scripts/diagrams/) `*.html`, hand-written
   SVG at 1200×675 with `<title>`/`<desc>`, built by **`npm run diagrams`**
   ([scripts/render-diagrams.mjs](scripts/render-diagrams.mjs) — headless Chromium at 2× DPR,
   then sharp to WebP). It writes only the diagrams' own `.webp` files and touches nothing
   else in `public/assets`, so it sidesteps the `npm run shots` landmine below. One file
   per diagram; `npm run diagrams -- stage-sync` rebuilds just one. If the output name
   differs from the source name, add it to `OUTPUT_NAME` in that script.
   ☠️ **The card renders a 1200×675 image at 368×207 — 30.7%.** A 12px node name is 3.7px
   there, which is why every diagram in this folder was redrawn in 2026-10. **Node names
   never go below 24px**, sublabels 15–17px, labels and legend 13px. Keep to ~6 nodes and
   prefer **two rows over one long row** — a single left-to-right row is what leaves the
   bottom half of the frame empty. The full contract lives in
   [scripts/diagrams/README.md](scripts/diagrams/README.md); read it before adding one.
2. **`npm run workflow` → [scripts/render-workflow.mjs](scripts/render-workflow.mjs)** — renders an
   n8n workflow *export* into a texture-style canvas. **Confidentiality:** it deliberately
   reads only node names, types, connections and sticky-note geometry — never parameters or
   sticky text, which carry live emails, phone numbers and endpoints. Keep source JSON out
   of this repo.
3. **`npm run shots` → [scripts/optimize-shots.mjs](scripts/optimize-shots.mjs)** — raw
   screenshots centre-cropped to 1200×675 WebP. Use as supporting evidence *after* a
   diagram, not as the lead. **Not for `scripts/diagrams/` output** — that is `npm run
   diagrams`, which writes WebP directly and never scans the folder.
   ☠️ **It converts EVERY `.png`/`.jpg` in `public/assets` and deletes the original.** That
   includes `og.png` and the `mark-*.png` brand logos, which are referenced as PNG and must
   stay PNG — it will silently break the share card and the masked logos. Move the one new
   screenshot into `public/assets`, run it, and check `git status public/assets`; recover
   any collateral with `git checkout -- <paths>`. (Happened 2026-09-21.)

`WorkCard` shows `image`; `WorkModal` shows the `shots` carousel (arrow keys, thumbnails,
captions). Every card reserves the same 16:9 block, so a project without an image gets a
typographic title card rather than a hole.

## Editing guidance
- Content changes → edit the typed files in [content/](content/). Structure/style → the
  matching component in [components/](components/).
- Reference images with `asset("/assets/<file>")` so the base path stays correct.
- Fonts (Instrument Sans / Fraunces) and the tokens are intentionally easy to tune in
  [app/layout.tsx](app/layout.tsx) and [app/globals.css](app/globals.css).
- **Changing `site.role` means regenerating `public/assets/og.png`**, which has the title
  baked in, and updating the four copies of it in `app/layout.tsx`.
- Check `public/assets/` for orphans before committing — unreferenced files still ship to
  Pages.

## Testing
- **`npm run test:e2e`** — Playwright (Chromium). `npm run test:e2e:ui` for the picker.
- Playwright boots its own `npm run dev`, and **reuses one already running** locally. That
  means a stale dev server serves stale code to the tests — restart it after editing if a
  result looks impossible.
- **`baseURL` is the origin only, on purpose.** With `/portfolio` in it, `page.goto("/")`
  resolves against the origin and silently drops the base path onto a 404. Tests navigate
  via `route()` from [tests/paths.ts](tests/paths.ts), the one place the base path is written.
- **Assert with retrying matchers** (`expect(locator).toHaveValue(...)`), not one-shot reads
  like `inputValue()`. `ServiceCta` writes on the next animation frame, so a single read
  races it and fails against perfectly good code — that cost a debugging round already.
- Covered: the service-card prefill rules, the nav active-link behaviour (including
  clearing over unlisted sections), and the full dialog contract for both modals.

## Local dev & deploy
- **Dev:** `npm run dev` → http://localhost:3000/portfolio (basePath is `/portfolio`).
- **Build/export:** `npm run build` → static `out/` (includes `.nojekyll`).
- **Deploy:** GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml))
  builds and publishes `out/` on every push to `main`. **One-time setup:** in the repo's
  GitHub Pages settings, set **Source → GitHub Actions** (not "Deploy from a branch").
- **A push to `main` is a live deploy.** Kyle reviews locally with `npm run dev` first —
  leave work uncommitted unless he asks.
- `next.config.ts` sets `basePath: '/portfolio'` because the site lives at
  `kooldudegamedev.github.io/portfolio`. Set `NEXT_PUBLIC_BASE_PATH=""` to serve from a root domain.

## Contact form
[components/ContactForm.tsx](components/ContactForm.tsx) posts to **Web3Forms**, which
emails the submission to `gregoryibo7@gmail.com`. There is no backend — the site is a
static export, so a third-party endpoint is the only option.

- The key lives in `NEXT_PUBLIC_WEB3FORMS_KEY` (see [.env.example](.env.example)). Copy it
  to `.env.local` for local dev; `.env*.local` is gitignored.
- **The key is public by design.** It is compiled into the client bundle and only
  authorises "send mail to the address this key was issued for", so it is a repo *variable*
  (Settings → Secrets and variables → Actions → **Variables**), not a secret. Masking it
  would only make build logs harder to read.
- **No key → the form degrades to the old mailto button** rather than rendering a form that
  silently drops messages. Forks and keyless builds stay functional.
- Spam: a hidden `botcheck` honeypot, dropped server-side by Web3Forms.
- All "Start a project" CTAs now point at `#contact` (the form). `mailtoHref` survives only
  as the deliberate "email me directly" escape hatch and the failure-recovery link.

## Dialogs
`WorkModal` and `ResumeModal` both drive [lib/useDialog.ts](lib/useDialog.ts), which owns
Escape-to-close, body-scroll lock, focus park on open, focus restore on close, and the
**Tab trap** that keeps focus cycling inside the panel. Dialog-specific shortcuts go in the
optional `onKey` callback (WorkModal uses it for the arrow-key carousel); it never sees Tab
or Escape. **Any new dialog uses this hook** rather than re-implementing the contract.

**`ResumeModal` shows a picture of the PDF, not the PDF.** An `<object>` embed only works
where the browser has a PDF viewer, so phones (and Chrome set to download PDFs) got an empty
panel. The dialog now shows `public/assets/resume-preview.webp` as a paper sheet, with Open
and Download beside it. **After every resume export, run `npm run resume:preview`**
([scripts/render-resume-preview.py](scripts/render-resume-preview.py); needs
`pip install pypdfium2 pillow`) or the picture drifts from the file people download. If the
page size ever changes, update `PREVIEW_WIDTH`/`PREVIEW_HEIGHT` in the component too.

[components/ImageZoom.tsx](components/ImageZoom.tsx) is the full-screen image viewer opened
from the WorkModal image. It stacks *on top of* the modal, so WorkModal passes
`open: item !== null && !zoomed` — the modal's hook steps aside while the viewer owns
Escape/Tab/arrows, then re-arms. Zoom is a fixed width in a scrolling box, no library.

## Known gaps
- No booking link yet: `site.bookingUrl` is an empty string, which hides the "Book a
  15-min call" button. Paste a Cal.com URL there to turn it on.
- 17 projects is a lot and 4 of them are open-source n8n reference workflows — the least
  differentiated items. Pruning the tail is a judgement call, deliberately not made.
- Web3Forms free tier can't restyle the notification email. Sender name, subject and the
  per-row labels are controlled from the POST payload in `ContactForm.tsx` — the keys sent
  there *are* the labels shown in the inbox.

## Connectors / MCP
A **Supabase** MCP connector may be attached to sessions on this project. It requires
authorization (claude.ai connector settings, or `/mcp` in an interactive session) before its
tools work — it is not currently wired into the site itself (the contact form is a direct mailto,
no backend).
