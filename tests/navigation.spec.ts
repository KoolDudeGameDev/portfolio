import { expect, test } from "@playwright/test";
import { route } from "./paths";

/**
 * The nav highlights the section in view. The bug worth guarding is the one it
 * had: the observer only ever *set* the active link and never cleared it, so
 * "Experience" stayed lit through About, FAQ and Contact — sections the nav
 * does not even list.
 */

/** The nav link Tailwind marks as current (`bg-surface`). */
const ACTIVE = 'nav ul a[class*="bg-surface"]';

test.beforeEach(async ({ page }) => {
  await page.goto(route());
});

for (const [id, label] of [
  ["services", "Services"],
  ["work", "Work"],
  ["stack", "Tech Stack"],
  ["experience", "Experience"],
] as const) {
  test(`highlights ${label} while that section is in view`, async ({ page }) => {
    await page.evaluate((target) => {
      const el = document.getElementById(target);
      window.scrollTo(0, el!.getBoundingClientRect().top + window.scrollY + 200);
    }, id);

    await expect(page.locator(ACTIVE)).toHaveText(label);
  });
}

for (const id of ["about", "faq", "contact"] as const) {
  test(`highlights nothing over #${id}, which the nav does not list`, async ({
    page,
  }) => {
    await page.evaluate((target) => {
      const el = document.getElementById(target);
      window.scrollTo(0, el!.getBoundingClientRect().top + window.scrollY + 200);
    }, id);

    await expect(page.locator(ACTIVE)).toHaveCount(0);
  });
}
