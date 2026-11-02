import { expect, test, type Page } from "@playwright/test";
import { route } from "./paths";

const DIALOG = '[role="dialog"]';
const ROW = "#showcase .showcase-row";

/** Pixels the row moved over a short window, ignoring the wrap. */
async function drift(page: Page, nth: number, ms = 700) {
  const row = page.locator(ROW).nth(nth);
  const before = await row.evaluate((el) => el.scrollLeft);
  await page.waitForTimeout(ms);
  const after = await row.evaluate((el) => el.scrollLeft);
  return Math.abs(after - before);
}

/**
 * `force` because the tiles never stop drifting, and Playwright would otherwise
 * wait for a stable target until the test times out. A person just clicks it.
 */
const clickTile = (page: Page) =>
  page.locator(`${ROW} button:not([tabindex="-1"])`).first().click({ force: true });

async function openShowcase(page: Page) {
  await page.goto(route());
  await page.locator("#showcase").evaluate((el) =>
    el.scrollIntoView({ behavior: "instant" }),
  );
  await expect(page.locator(ROW).first()).toBeInViewport();
  await page.waitForTimeout(600);
}

test("the rows run in the directions asked for", async ({ page }) => {
  await openShowcase(page);
  const directions = await page
    .locator(ROW)
    .evaluateAll((rows) => rows.map((r) => (r as HTMLElement).dataset.direction));
  expect(directions).toEqual(["left", "right", "left"]);
  expect(await drift(page, 0)).toBeGreaterThan(5);
});

test("a hovered row slows down, and only that row", async ({ page }) => {
  await openShowcase(page);
  const free = await drift(page, 0);

  await page.locator(ROW).first().hover();
  await page.waitForTimeout(1000);
  expect(await drift(page, 0)).toBeLessThan(free * 0.5);
  expect(await drift(page, 2)).toBeGreaterThan(free * 0.8);

  await page.mouse.move(5, 5);
  await page.waitForTimeout(1000);
  expect(await drift(page, 0)).toBeGreaterThan(free * 0.7);
});

test("clicking an image opens it and stops every row until it closes", async ({
  page,
}) => {
  await openShowcase(page);
  const free = await drift(page, 0);
  await clickTile(page);
  await expect(page.locator(DIALOG)).toBeVisible();

  await page.waitForTimeout(1000);
  for (const row of [0, 1, 2]) expect(await drift(page, row, 300)).toBeLessThan(2);

  // The mouse is parked in the corner, where the close button is. Focus goes
  // back to the tile on close, and that must not leave the row slow.
  await page.getByRole("button", { name: "Close enlarged image" }).click();
  await expect(page.locator(DIALOG)).toHaveCount(0);
  await page.mouse.move(5, 5);
  await page.waitForTimeout(1200);
  expect(await drift(page, 0)).toBeGreaterThan(free * 0.7);
});

test("the popup leads on to the case study", async ({ page }) => {
  await openShowcase(page);
  await clickTile(page);
  await page.getByRole("button", { name: "Read the case study" }).click();
  await expect(page.locator("#work-modal-title")).toHaveText("Jim's Franchise Loan");

  await page.keyboard.press("Escape");
  await expect(page.locator(DIALOG)).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("the pause button holds the rows", async ({ page }) => {
  await openShowcase(page);
  await page.getByRole("button", { name: "Pause" }).click();
  await page.waitForTimeout(1000);
  expect(await drift(page, 0, 300)).toBeLessThan(2);
  await page.getByRole("button", { name: "Play" }).click();
  await page.waitForTimeout(1000);
  expect(await drift(page, 0)).toBeGreaterThan(5);
});

test("nothing drifts with reduced motion, and copies are dropped", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openShowcase(page);
  expect(await drift(page, 0)).toBe(0);
  await expect(page.locator(`${ROW} .showcase-copy:visible`)).toHaveCount(3);
});

test("the duplicate copies stay out of the tab order", async ({ page }) => {
  await openShowcase(page);
  await page.waitForTimeout(300);
  const leaked = await page
    .locator(`${ROW} ul[aria-hidden] button`)
    .evaluateAll((buttons) => buttons.filter((b) => b.getAttribute("tabindex") !== "-1").length);
  expect(leaked).toBe(0);
});
