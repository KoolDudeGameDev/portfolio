import type { Page } from "@playwright/test";

/**
 * The deploy base path, in one place. `next.config.ts` sets `basePath:
 * '/portfolio'`, so every route is served under it — and because Playwright's
 * baseURL is the origin, tests have to say so explicitly.
 */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portfolio";

/** Path to a page on the site, base path included. */
export const route = (path = "/") => `${BASE}${path}`;

/**
 * Waits until React has taken over the page. The dev server can be slow to
 * hydrate with several workers running, and a click before that does nothing.
 */
export const hydrated = (page: Page) =>
  page.waitForFunction(() => {
    const button = document.querySelector("#work article button");
    return button && Object.keys(button).some((k) => k.startsWith("__reactProps"));
  });
