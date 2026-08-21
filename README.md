# Kyle Gregory Ibo — Portfolio

Personal portfolio site for **Kyle Gregory Ibo**, Systems & Automation Engineer.
A fast, statically-exported [Next.js](https://nextjs.org) site with a client-first
landing page, built with TypeScript and Tailwind CSS and deployed to GitHub Pages.

🔗 **Live:** https://kooldudegamedev.github.io/portfolio

## Tech stack

- **Next.js** (App Router) with `output: 'export'` — ships 100% static HTML/CSS/JS
- **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **next-themes** — cream editorial theme (default) with a light/dark toggle
- Self-hosted fonts via `next/font` (Inter + Fraunces); inline SVG icons (no icon CDN)

## Project structure

```
app/
  layout.tsx        # fonts, ThemeProvider, SEO metadata
  page.tsx          # composes the sections in order
  globals.css       # Tailwind import + design tokens (light + dark)
components/          # one component per section + Navbar, ThemeToggle, Icons
content/             # typed data: services, work, techstack, experience
lib/site.ts          # site constants, mailto, asset() base-path helper
public/assets/       # images
.github/workflows/   # GitHub Actions deploy
```

**Content is data-driven.** To add a project, service, or role, edit the typed arrays
in [`content/`](content/) — no need to touch component markup.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000/portfolio
```

The dev URL includes `/portfolio` because the site is served from a GitHub Pages
project path (`basePath` in [`next.config.ts`](next.config.ts)).

```bash
npm run build    # static export to ./out
```

## Deployment (GitHub Actions → GitHub Pages)

Deployment is automated. Every push to `main` triggers
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which runs
`npm ci && npm run build` and publishes the exported `out/` directory to GitHub Pages.

**One-time repository setup:** in **Settings → Pages**, set **Source** to
**GitHub Actions** (not "Deploy from a branch"). After that, pushing to `main` deploys.

### Serving from a different path or a root domain

`basePath` defaults to `/portfolio`. To serve from a custom root domain instead, build
with an empty base path:

```bash
NEXT_PUBLIC_BASE_PATH="" npm run build
```

## License

© Kyle Gregory Ibo. All rights reserved.
