import { expect, test } from "@playwright/test";
import { hydrated, route } from "./paths";

/**
 * Case studies are pages, not a modal: each one has its own address, so it can be
 * linked from a message or a job application. The only dialogs left are the image
 * viewer and the résumé preview, which share the contract in lib/useDialog.ts.
 */

const DIALOG = '[role="dialog"]';

// The dev server compiles each case-study page on its first visit. Two workers
// asking for the same uncompiled page at once can make Next 15's dev server read a
// half-written manifest ("Unexpected end of JSON input"), so these run in order.
// The static export has no such step; the build check covers the shipped pages.
test.describe.configure({ mode: "serial", timeout: 60_000 });

test("a home-page card links to its case study page", async ({ page }) => {
  await page.goto(route());
  const link = page.locator("#work article").first().getByRole("link", { name: /Case study/ });
  await expect(link).toHaveAttribute("href", route("/work/jims-franchise-loan/"));
  await link.click();
  await expect(page).toHaveURL(/\/work\/jims-franchise-loan\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Jim's Franchise Loan");
});

test("a case study leads with why it matters, then problem, build and results", async ({ page }) => {
  await page.goto(route("/work/document-hub/"));
  await expect(page.locator("header p").filter({ hasText: "Why it matters:" })).toBeVisible();
  for (const label of ["The business problem", "What I built", "Results"]) {
    await expect(page.getByRole("heading", { level: 2, name: label })).toBeVisible();
  }
  // The address someone shares is the one search engines are told about.
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/portfolio\/work\/document-hub\/$/);
});

test("previous and next walk through every case study", async ({ page }) => {
  await page.goto(route("/work/jims-franchise-loan/"));
  const next = page.getByRole("navigation", { name: "More case studies" }).getByRole("link").last();
  await next.click();
  await expect(page).toHaveURL(/\/work\/company-radar\/$/);
});

test("a screen opens full size and Escape returns focus to it", async ({ page }) => {
  await page.goto(route("/work/document-hub/"));
  await hydrated(page);
  const first = page.getByRole("button", { name: /^Enlarge:/ }).first();
  await first.click();
  await expect(page.locator(DIALOG)).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    const inside = await page.evaluate(() => document.querySelector('[role="dialog"]')?.contains(document.activeElement) ?? false);
    expect(inside, `focus left the viewer on press ${i + 1}`).toBe(true);
  }
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Shift+Tab");
    const inside = await page.evaluate(() => document.querySelector('[role="dialog"]')?.contains(document.activeElement) ?? false);
    expect(inside, `focus left the viewer on shift-press ${i + 1}`).toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(page.locator(DIALOG)).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await expect(first).toBeFocused();
});

test("the résumé dialog honours the same contract", async ({ page }) => {
  await page.goto(route());
  await hydrated(page);
  const opener = page.getByRole("button", { name: /Résumé/ });
  await opener.click();
  await expect(page.locator(DIALOG)).toBeVisible();

  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    const inside = await page.evaluate(() => document.querySelector('[role="dialog"]')?.contains(document.activeElement) ?? false);
    expect(inside, `focus left the résumé dialog on press ${i + 1}`).toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(page.locator(DIALOG)).toHaveCount(0);
  await expect(opener).toBeFocused();
});
