import { expect, test } from "@playwright/test";
import { route } from "./paths";

/**
 * The dialog contract lives in lib/useDialog.ts and both modals share it. The
 * Tab trap is the part that was missing: everything else (Escape, scroll lock,
 * focus restore) already worked, so these guard the whole contract at once.
 */

const DIALOG = '[role="dialog"]';

async function openFirstCaseStudy(page: import("@playwright/test").Page) {
  await page.goto(route());
  const card = page.locator("#work article").first();
  await card.getByRole("button", { name: /Case study/ }).click();
  await expect(page.locator(DIALOG)).toBeVisible();
}

test("opens a case study and parks focus inside the dialog", async ({ page }) => {
  await openFirstCaseStudy(page);
  await page.keyboard.press("Tab");

  const inside = await page.evaluate(() => {
    const panel = document.querySelector('[role="dialog"]');
    return panel?.contains(document.activeElement) ?? false;
  });
  expect(inside).toBe(true);
});

test("traps Tab inside the dialog instead of leaking to the page behind", async ({
  page,
}) => {
  await openFirstCaseStudy(page);

  // Far more presses than the dialog has focusable elements, so the cycle has
  // to wrap several times. One escape anywhere fails this.
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Tab");
    const inside = await page.evaluate(() => {
      const panel = document.querySelector('[role="dialog"]');
      return panel?.contains(document.activeElement) ?? false;
    });
    expect(inside, `focus left the dialog on press ${i + 1}`).toBe(true);
  }
});

test("shift-Tab also stays inside", async ({ page }) => {
  await openFirstCaseStudy(page);

  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Shift+Tab");
    const inside = await page.evaluate(() => {
      const panel = document.querySelector('[role="dialog"]');
      return panel?.contains(document.activeElement) ?? false;
    });
    expect(inside, `focus left the dialog on shift-press ${i + 1}`).toBe(true);
  }
});

test("Escape closes it, unlocks scrolling and returns focus to the opener", async ({
  page,
}) => {
  await page.goto(route());
  const card = page.locator("#work article").first();
  const opener = card.getByRole("button", { name: /Case study/ });

  await opener.click();
  await expect(page.locator(DIALOG)).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

  await page.keyboard.press("Escape");

  await expect(page.locator(DIALOG)).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await expect(opener).toBeFocused();
});

test("the résumé dialog honours the same contract", async ({ page }) => {
  await page.goto(route());
  const opener = page.getByRole("button", { name: /Résumé/ });
  await opener.click();
  await expect(page.locator(DIALOG)).toBeVisible();

  for (let i = 0; i < 10; i++) {
    await page.keyboard.press("Tab");
    const inside = await page.evaluate(() => {
      const panel = document.querySelector('[role="dialog"]');
      return panel?.contains(document.activeElement) ?? false;
    });
    expect(inside, `focus left the résumé dialog on press ${i + 1}`).toBe(true);
  }

  await page.keyboard.press("Escape");
  await expect(page.locator(DIALOG)).toHaveCount(0);
  await expect(opener).toBeFocused();
});
