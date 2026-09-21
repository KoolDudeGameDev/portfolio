import { expect, test, type Page } from "@playwright/test";
import { route } from "./paths";

/**
 * The Services cards seed the contact form with whichever service was clicked.
 * The interesting behaviour is not the seeding — it is deciding when a box may
 * be overwritten, which is where this went wrong the first time: guarding on
 * "is the box empty" meant the first service you clicked was stuck there for
 * good, and a second click looked broken.
 */

const MESSAGE = "#cf-message";

/** The "Discuss this" link on the card whose heading matches. */
function serviceCta(page: Page, title: string) {
  return page.locator("#services article").filter({ hasText: title }).getByRole("link");
}

test.beforeEach(async ({ page }) => {
  await page.goto(route());
  // The form only renders when a Web3Forms key is compiled in; without one the
  // section falls back to a mailto button and there is nothing to seed.
  await expect(page.locator(MESSAGE)).toBeVisible();
});

test("seeds the message box with the service that was clicked", async ({ page }) => {
  await serviceCta(page, "CRM & Data Architecture").click();
  await expect(page.locator(MESSAGE)).toHaveValue(
    /I'd like to talk about CRM & Data Architecture\./,
  );
});

test("clicking a second service replaces the first one's text", async ({ page }) => {
  await serviceCta(page, "CRM & Data Architecture").click();
  await expect(page.locator(MESSAGE)).toHaveValue(/CRM & Data Architecture/);

  await serviceCta(page, "Backend & API Development").click();

  // `toHaveValue` rather than a one-shot `inputValue()`: the handler writes on
  // the next animation frame, so an immediate read races it and sees the old
  // text. That race is what made this test fail against working code.
  await expect(page.locator(MESSAGE)).toHaveValue(
    /I'd like to talk about Backend & API Development\./,
  );
  // The regression this guards: the box kept the first service and silently
  // ignored the second click, so the form said the wrong thing.
  await expect(page.locator(MESSAGE)).not.toHaveValue(/CRM & Data Architecture/);
});

test("never overwrites something the visitor typed", async ({ page }) => {
  const typed = "We need help untangling two systems that disagree.";
  await page.locator(MESSAGE).fill(typed);

  await serviceCta(page, "CRM & Data Architecture").click();

  await expect(page.locator(MESSAGE)).toHaveValue(typed);
});

test("an edited prefill counts as the visitor's text and is left alone", async ({
  page,
}) => {
  await serviceCta(page, "CRM & Data Architecture").click();
  await page.locator(MESSAGE).fill("I'd like to talk about CRM — specifically dedupe.");

  await serviceCta(page, "Backend & API Development").click();

  await expect(page.locator(MESSAGE)).toHaveValue(
    "I'd like to talk about CRM — specifically dedupe.",
  );
});

test("the card link scrolls to the contact section", async ({ page }) => {
  await serviceCta(page, "CRM & Data Architecture").click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#contact")).toBeInViewport();
});
