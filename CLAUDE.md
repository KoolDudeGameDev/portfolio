# Portfolio — Kyle Gregory Ibo

Personal portfolio website. Single-page, client-first, deployed to **GitHub Pages**.

## Owner
Kyle Gregory Ibo — Full-Stack & Automations Developer (custom web apps, the automation behind
them, and a full handover). `site.role` and the resume both say so.
- GitHub: [KoolDudeGameDev](https://github.com/KoolDudeGameDev)
- Contact email shown on site: gregoryibo7@gmail.com
- Positioning: **client-first** (win business owners), with skills/tech/experience in
  separate, neutrally-named sections. Do **not** use "recruiters/hiring" wording on the site.
- **Copy leans capability-first, tools as proof.** Say what the thing does, then name the
  vendor once as evidence — not "I do GoHighLevel and n8n". The site must read as
  *builds software end to end*, not as one platform's specialist. Vendor names belong in
  Tech Stack and the case studies.
- **The offshore/multinational angle is deliberate.** Bai is worked **on-site in Cebu, never
  call it remote** (Kyle, 2026-10-31); freelance and agency work is the remote part.
  **Client geography is Australia, the Philippines and "international".** Keep "Australia" and the timezone framing where they appear.
- **Dates and titles, set by Kyle 2026-10-31:** Bai Group of Companies, Full-Stack & Automations
  Developer (Intern), May 2026 — Jan 2027. Freelance (Agency & Contract), Jun 2026 — Present, no
  company names. Backend Developer, Cebuano speech: built the ASR model, now building a voice
  agent, worded as in progress. Degree: Expected May 2027, **Candidate for** Cum Laude, never
  "graduate" and never "Cum Laude" alone.
- **His role at Bai (Kyle, 2026-11-02):** technical lead for two project teams (Jim's Franchise Loan
  and Company Radar) and sole developer of the Leave Application Platform. He runs requirements
  analysis and system design as well as building. Never "project manager". Jim's and Radar are
  described as custom CRMs: Radar outright, Jim's as a custom loan CRM. Leave is not a CRM.
- ☠️ **"Open-source n8n workflow" cards are reference builds.** Never present one as client work
  unless it has been deployed for a client: visitors decide to hire on these claims.
- **"1,800-hour internship" is the length of the program, which he finishes in January 2027.** Do
  not write "completed 1,800 hours" until then.
- **Client confidentiality:** the ecommerce client is never named — it is always
  "Confidential Client — Ecommerce". Same for any other client that has not agreed to be
  named.
- ☠️ **Claims must survive `git log`.** Several projects here are team codebases where Kyle
  is one contributor among many (BAI-Website: 8 of 223 commits; BaiAcademy: 20 of 181). A
  case study or Experience bullet describes **what he authored**, not what the repo contains — an interviewer
  asking "walk me through how you built that" must get a real answer. When writing or
  editing a case study for a team project, check `git log --author` first and frame the
  project as context (`org: "BaiAcademy — team-built LMS"`) with his own work as the
  substance. Verified 2026-09-21; two case studies were rewritten for exactly this.

## Writing standards
Set by Kyle, 2026-11-02. All site copy follows these.
- **Voice:** a technology consultant who understands business operations, not a developer listing
  skills. Confident, plain, international business English in US spelling. Avoid contractions, slang
  and unsupported claims such as "world-class".
- **Order:** business problem or outcome first, then the technology. Page order follows the same
  hierarchy: headline, supporting statement, business solutions, case studies, technical expertise,
  background, call to action. The Showcase sits after the hero as proof, at Kyle's request.
- **Every case study has `value` ("Why it matters").** Say what the system enables. Never state a
  benefit as a measured result unless it was measured, and never invent a figure. Every number on
  the site must trace to a case study or the repos.
- **Do not undervalue the work:** owner voice, specific scope, real figures.
- **Fixed terms:** web app, handover (not handoff), sign-in, open-source, time zone, case study.
- ☠️ **Protected lines. Recommend first, never change them unasked:** "I build the systems that make
  a business run itself." and everything on the business card, including "Have a system worth
  building?".

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
- [app/work/page.tsx](app/work/page.tsx) — every project, linked from "Browse all work".
- [app/globals.css](app/globals.css) — Tailwind import + **design tokens**. See below.
- [components/](components/) — one component per section, plus `Navbar`, `ThemeToggle`,
  `ThemeProvider`, `Icons`, `SectionHeading`, `BrandMark`, `WorkCard`,
  `WorkModal`, `ResumeModal`. `Showcase` is the three-row carousel; `Work` is the six featured
  cards on the home page; `AllWork` is the tabbed list on `/work`.
- [content/](content/) — **typed data files** (`services.ts`, `work.ts`, `showcase.ts`, `techstack.ts`,
  `experience.ts`, `faq.ts`, `process.ts`, `brandmarks.ts`). `featured: true` in `work.ts` is what
  reaches the home page: **exactly six**, because the grid is 3×2. **To add a project/service/role/FAQ, edit
  these — do not hardcode content in components.** Each is a typed array; copy an existing
  object and edit in place. `brandmarks.ts` is generated — don't hand-edit it.
- [lib/site.ts](lib/site.ts) — site constants (name, role, email, socials, location),
  `mailtoHref`, `SITE_ORIGIN`, and the `asset()` helper that prefixes the deploy base path.
- [public/assets/](public/assets/) — images (referenced via `asset("/assets/…")`).
- [scripts/](scripts/) — the image pipelines. See **Case-study imagery** below.

## Section order (client-first, in `app/page.tsx`)
Navbar → Hero (`#home`) → Showcase (`#showcase`) → Services (`#services`) → BuildFlow
(`#process`) → Work (`#work`) → Tech Stack (`#stack`) → Experience (`#experience`) →
About (`#about`) → Book (`#book`) → Contact (`#contact`, which holds the FAQ, form and footer).
Navbar is fixed. Its links are full paths (`/portfolio/#services`), so it works from `/work` too.

**One screen per section (desktop only).** `<main className="snap-page">` plus `.screen` on each
section turns on `scroll-snap-type: y proximity`, at 1024px wide and 640px tall or more. It is
`proximity`, not `mandatory`, by Kyle's choice (2026-10-31): the wheel moves at the visitor's own
speed and only settles when they stop near a section, because a mandatory snap can't be slowed and
read as instant. Browsers report it as just `y`. Phones scroll normally, on purpose.
`:has(.snap-page)` keeps snapping off `/work`. `scroll-margin-top` must stay 0 here, or a strip of
the last section shows; the top padding clears the nav instead. Sizes use `svh` clamps; `.fit-hide`
(≤820px tall) and `.fit-tiny` (≤720px) drop supporting lines on short laptops. **Adding anything to
a section can push it past one screen**: [tests/one-screen.spec.ts](tests/one-screen.spec.ts) fails
if it does, at four window sizes.

**Section shades are translucent on purpose.** `.tint-1` to `.tint-4` are ink at low alpha, not
solid fills, so the fixed `.veil` shows through every section. A solid `bg-surface` on a section
hides it: that is the bug this replaced.

**Scroll effects are CSS with no JavaScript** (`animation-timeline`, in the MOTION block of
`globals.css`). On desktop `.reveal` runs on the section's own `--screen` timeline, so content
unfolds across the whole scroll into a section and is complete at rest. It stays opacity and
transform only: a slow scroll dwells in the middle of the range, so a blur reads as out of focus.
`.screen > *` recede on the way out, a soft pool of light drifts across each section
(`section.screen::before`, whose colour is `--section-light`), and the Experience line draws itself.
Browsers without scroll timelines show the page still, so nothing depends on them. Traps: `.reveal`
goes on a wrapper, never on an element with a hover transform; an `overflow: hidden` ancestor
captures the phone `view()` timeline, so use `overflow: clip`; the recede effect sits on a section's
children because a transform on a snap target moves its snap position; and the reduced-motion rule
has to name `::before` and `::after`, because `*` does not match them.

**The Showcase** ([components/Showcase.tsx](components/Showcase.tsx), data in
[content/showcase.ts](content/showcase.ts)): web, phone, web, running left, right, left. A hovered
row eases to 22%; opening an image stops all three. Tiles rest under a `--tile-dim` layer so white
app screens don't glare, which clears on hover. It is a layer, not `filter`, because 28 images move
at once. The side fade is one mask on `.showcase-rows`, not one per row. Each row is a real scroll container driven by
`scrollLeft`, so drag, touch and keys move the same thing. A tile's `project` must match a `title`
in `work.ts`, because the popup links to that case study. Only hover and Tab slow a row: closing
the popup hands focus back to the tile, and treating that as hover left the row stuck slow.

**`BuildFlow` is an unnumbered section** — a live version of the six-step delivery process, with
the handover list (`handoverItems` in `process.ts`) under it. **It loops on its own**: an 18s walk
through the steps, 3s each, with every stage running the same keyframes delayed by `--n`. A pointer
wins through `!important` on the hover rules, because a running animation beats a normal rule, and
the walk carries on behind it.

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

Content is `content/process.ts`, and every line of it is already claimed in `services.ts`
or `faq.ts`. Keep it that way: it is the first promise a visitor reads.

**The `--diagram-*` tokens** (`app/globals.css`) are the live band's surface: **true
neutrals**, no blue cast, and they **follow the theme**: a white sheet in light mode, a
near-black canvas under `.dark` (changed 2026-10-09 at Kyle's request — the always-dark
band read as a black slab on the paper page). The closing panel and band are deliberately dark in
both themes, also at his request: `.ink` re-scopes the colour tokens for anything inside them. The spark glow is `--diagram-glow`, not a
hardcoded rgba, for the same reason.

⚠️ They are **not** the palette of the baked case-study WebPs. Those render from
`scripts/diagrams/*.html`, which carry their own cooler hex (`#171a24` / `#232838` /
`#39415a`). So the live band is neutral and the work-card images are cool — a known,
accepted divergence. Re-rendering the 15 diagrams to neutral is the follow-up if the two
surfaces ever need to match.

**`.veil`** is one fixed radial gradient mounted in `app/layout.tsx`. Painted once, never
animated, `pointer-events: none`.

**The page ends on a business card, then one dark band.** `Book` holds
[components/BusinessCard.tsx](components/BusinessCard.tsx): icon, name and role on the front, the
invitation on the back. It turns itself over once, 2s after arriving, so nobody misses the Book
button, and is the visitor's to flip after that. With reduced motion it starts on the back. The face
turned away is `inert`, because `backface-visibility` hides it from the eye but not from Tab. Stage,
arrive, tilt and flip are separate elements so their transforms don't fight, and nothing between
the stage and the faces may set overflow, opacity or filter, which would flatten the 3D. **No scroll
effect may wrap the card**: Kyle saw stray lines along its swing path in Brave, so `#book` has no
`.reveal` and opts out of the recede, and the card has two faces only, with no stacked edge layers. The empty wrappers
are `pointer-events: none`: they share the 3D space, and one of them took every click on the back
face once the faces sat close to it. Test clicks by coordinates here: Playwright's own click still
reached the button while a person's did not.
That bug only reaches the display: browser screenshots redraw clean, and it would not reproduce in 10
scripted flips at his exact zoom. Check by eye in real Brave, and do not script OS screen captures:
they record whatever window Kyle is using at the time.

`Contact` joins four always-open FAQ
columns, the compact form and the footer, modelled on the reference Kyle gave, in white instead of
purple. On desktop it rests square under the nav: rounded corners left white wedges at the top of
the screen, so `band-flatten` rounds it only on the way in. Keep the FAQ at four, about three lines each. There is no
accordion. `id="faq"` stays: it is a deep-link target, and `tests/navigation.spec.ts` scrolls to it
when asserting the nav highlights nothing there. Section markers run 01–06, with `Book` as `06`.
`Footer` sits inside `#contact` on the home page, and in an `.ink` wrapper on `/work`.

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
  kills all transitions/animations, drops `scroll-behavior`, and stops the Showcase, leaving each row
  to scroll by hand. Any JS-driven motion must check it explicitly — the CSS
  `animation: none` rule will not stop a `requestAnimationFrame` loop.

## Case-study imagery
☠️ **App screens must carry fictional data.** The real apps hold real applicants, credit scores,
staff emails and prospect contacts. Screens in `public/assets/showcase/` were captured from the
apps running locally, read-only, with every name, email, list amount and id swapped in the browser
and sample figures typed into the calculator, then checked by eye. Totals, counts and dates are
real but identify nobody, which is why the site says "names and personal details", not "figures". Never drop a raw screenshot in. Raw captures live in gitignored `docs/`;
`npm run showcase -- <folder>` makes the popup image and thumbnail. (Done 2026-10-31.)

Three more pipelines for diagrams and supporting images, in descending order of preference. **Lead a card with an authored diagram,
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
  clearing over unlisted sections), the full dialog contract for both modals, the carousel, and
  one-screen fit.
- **Run `next build` only with the dev server stopped.** It overwrites `.next` and the running
  server starts returning 500s.
- A click before hydration does nothing, and the dev server hydrates slowly under parallel
  workers: use `hydrated(page)` from `tests/paths.ts` before clicking a client component.

## Local dev & deploy
- **Dev:** `npm run dev` → http://localhost:3000/portfolio (basePath is `/portfolio`).
- **Build/export:** `npm run build` → static `out/` (includes `.nojekyll`).
- **Deploy:** GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml))
  builds and publishes `out/` on every push to `main`. **One-time setup:** in the repo's
  GitHub Pages settings, set **Source → GitHub Actions** (not "Deploy from a branch").
- **A push to `main` is a live deploy.** Kyle reviews locally with `npm run dev` first —
  leave work uncommitted unless he asks.
- **The previous design is kept** on branch `former-portfolio` and tag
  `former-portfolio-2026-10-31`, local only until Kyle approves pushing them.
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
- "Start a project" goes to `#book`, and the card turns to its invitation on arrival, even if it was
  turned back. "Book a free session" and each service's "Discuss this" go straight to `#contact`,
  the form; "Discuss this" also prefills it. `mailtoHref` survives only
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
- No booking link yet: `site.bookingUrl` is empty, so "Book a free session" scrolls to the form
  and the form's own "Book a 15-min call" button stays hidden. Paste a Cal.com URL there to switch both.
- 19 projects is a lot and 4 of them are open-source n8n reference workflows. The home page only
  shows six now, so the long tail on `/work` costs nothing.
- Web3Forms free tier can't restyle the notification email. Sender name, subject and the
  per-row labels are controlled from the POST payload in `ContactForm.tsx` — the keys sent
  there *are* the labels shown in the inbox.

## Connectors / MCP
A **Supabase** MCP connector may be attached to sessions on this project. It requires
authorization (claude.ai connector settings, or `/mcp` in an interactive session) before its
tools work — it is not currently wired into the site itself (the contact form is a direct mailto,
no backend).
