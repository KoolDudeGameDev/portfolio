# Portfolio — Kyle Gregory Ibo

Personal portfolio website. Single-page, client-first, deployed to **GitHub Pages**.

## Owner
Kyle Gregory Ibo — AI Automation & Systems Engineer (backend, systems integration, applied AI/ML).
- GitHub: [KoolDudeGameDev](https://github.com/KoolDudeGameDev)
- Contact email shown on site: gregoryibo7@gmail.com
- Positioning: **client-first** (win business owners), with skills/tech/experience in
  separate, neutrally-named sections. Do **not** use "recruiters/hiring" wording on the site.

## Stack & structure
- **Next.js (App Router) + TypeScript + Tailwind CSS v4.** Statically exported
  (`output: 'export'`) — the site is 100% static HTML/CSS/JS served from GitHub Pages.
- **There is a build step now** (`npm run build` → `out/`). This replaced the old
  hand-written single-file `index.html` (see git history for the original).
- Font Awesome is gone; icons are inline SVGs in [components/Icons.tsx](components/Icons.tsx).
  Fonts are self-hosted via `next/font` (Inter for sans, Fraunces for italic serif accents).

## Key files
- [app/layout.tsx](app/layout.tsx) — fonts, `<ThemeProvider>`, SEO metadata, `<html>` shell.
- [app/page.tsx](app/page.tsx) — composes the sections in order.
- [app/globals.css](app/globals.css) — Tailwind import + **design tokens**. See below.
- [components/](components/) — one component per section + `Navbar`, `ThemeToggle`, `Icons`,
  `SectionHeading`.
- [content/](content/) — **typed data files** (`services.ts`, `work.ts`, `techstack.ts`,
  `experience.ts`). **To add a project/service/role, edit these — do not hardcode content in
  components.** Each is a typed array; copy an existing object and edit in place.
- [lib/site.ts](lib/site.ts) — site constants (name, email, socials), `mailtoHref`, and the
  `asset()` helper that prefixes the deploy base path.
- [public/assets/](public/assets/) — images (referenced via `asset("/assets/…")`).

## Section order (client-first, in `app/page.tsx`)
Navbar → Hero (`#home`) → Services (`#services`) → Work (`#work`) → Tech Stack (`#stack`) →
Experience (`#experience`) → About (`#about`) → Contact (`#contact`) → Footer.
Navbar is fixed; nav links smooth-scroll (CSS `scroll-behavior` + `scroll-margin-top`).

## Styling conventions
- **Theme:** warm **cream editorial** (light, default) with a **light/dark toggle** via
  `next-themes` (sets `class="dark"` on `<html>`). Dark side is a warm near-black, not cold slate.
- **All colors come from CSS custom properties** in [app/globals.css](app/globals.css)
  (`--bg`, `--surface`, `--card`, `--fg`, `--muted`, `--border`, `--accent`, `--accent-fg`),
  defined twice: `:root` (light) and `.dark` (dark). They're mapped to Tailwind tokens via
  `@theme inline`, so use utilities like `bg-bg`, `text-fg`, `text-muted`, `border-border`,
  `bg-accent`. **Reuse these tokens; don't hardcode hex values.** Accent = terracotta.
- Editorial type signature: uppercase tracked eyebrow labels, numbered section markers, large
  headings mixing bold sans + **italic serif** accents (`font-serif italic text-accent`),
  hairline dividers, generous whitespace.
- Layout: `max-w-6xl` container, Tailwind grid/flex, cards lift on hover (`hover:-translate-y-1`).
- Responsive: use Tailwind's `sm`/`md` breakpoints (mobile-first).

## Editing guidance
- Content changes → edit the typed files in [content/](content/). Structure/style → the
  matching component in [components/](components/).
- Reference images with `asset("/assets/<file>")` so the base path stays correct.
- Fonts (Inter/Fraunces) and the accent hex are intentionally easy to tune in
  [app/layout.tsx](app/layout.tsx) and [app/globals.css](app/globals.css).

## Local dev & deploy
- **Dev:** `npm run dev` → http://localhost:3000/portfolio (basePath is `/portfolio`).
- **Build/export:** `npm run build` → static `out/` (includes `.nojekyll`).
- **Deploy:** GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml))
  builds and publishes `out/` on every push to `main`. **One-time setup:** in the repo's
  GitHub Pages settings, set **Source → GitHub Actions** (not "Deploy from a branch").
- `next.config.ts` sets `basePath: '/portfolio'` because the site lives at
  `kooldudegamedev.github.io/portfolio`. Set `NEXT_PUBLIC_BASE_PATH=""` to serve from a root domain.

## Connectors / MCP
A **Supabase** MCP connector may be attached to sessions on this project. It requires
authorization (claude.ai connector settings, or `/mcp` in an interactive session) before its
tools work — it is not currently wired into the site itself (the contact form is a direct mailto,
no backend).
