import { expect, test } from "@playwright/test";
import { hydrated, route } from "./paths";

/**
 * Every home section has to fit one desktop screen with nothing left to scroll,
 * at Kyle's monitor, a common laptop and the smallest size that still snaps.
 */
for (const [width, height] of [
  [1920, 880],
  [1440, 900],
  [1366, 650],
  [1280, 720],
] as const) {
  test(`every section fits one screen at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto(route());
    // The web fonts are wider than the fallback, so measuring first misses wraps.
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);

    const heights = await page
      .locator("section.screen")
      .evaluateAll((sections) =>
        sections.map((s) => [s.id, Math.round(s.getBoundingClientRect().height)] as const),
      );

    expect(heights.length).toBe(10);
    for (const [id, tall] of heights) {
      expect(tall, `#${id} is taller than the screen`).toBeLessThanOrEqual(height + 1);
    }
  });
}

test("the page snaps on desktop and scrolls normally on a phone", async ({
  page,
}) => {
  const snap = () =>
    page.evaluate(() => getComputedStyle(document.documentElement).scrollSnapType);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(route());
  // `proximity` is the default strictness, so the browser reports just `y`.
  expect(await snap()).toBe("y");

  await page.setViewportSize({ width: 390, height: 844 });
  expect(await snap()).toBe("none");
});

test("no sideways scroll on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route());
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("six projects on the home page, and the rest one link away", async ({
  page,
}) => {
  await page.goto(route());
  await expect(page.locator("#work article")).toHaveCount(6);

  await page.getByRole("link", { name: /Browse all work/ }).click();
  await expect(page).toHaveURL(/\/work\/$/);
  await expect(page.locator("main article").nth(6)).toBeVisible();

  // The bar has to lead home from here too.
  await page.getByRole("link", { name: "Services" }).first().click();
  await expect(page.locator("#services")).toBeInViewport();
});

test("the business card turns itself over once, then stays with the visitor", async ({
  page,
}) => {
  await page.goto(route());
  await hydrated(page);
  const card = page.locator(".card-flip");

  // The side turned away must be out of reach, not just out of sight.
  await expect(page.locator(".card-back")).toHaveAttribute("inert");
  await page.locator("#book").evaluate((el) =>
    el.scrollIntoView({ behavior: "instant" }),
  );
  await expect(card).toHaveAttribute("data-flipped", "true", { timeout: 6000 });
  await expect(page.locator(".card-front")).toHaveAttribute("inert");

  await page.getByRole("button", { name: "Flip the card back" }).click();
  await expect(card).not.toHaveAttribute("data-flipped");

  // It has flipped once already: leaving and coming back must not do it again.
  await page.waitForTimeout(2600);
  await expect(card).not.toHaveAttribute("data-flipped");
});

// By coordinates on purpose. Playwright's own click can reach a button a person
// can't, and that is how a wrapper layer swallowing every click got through.
for (const [width, height] of [
  [1920, 849],
  [1440, 900],
  [1366, 650],
] as const) {
  test(`the Flip button is what a click lands on, on both sides, at ${width}x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto(route());
    await hydrated(page);
    await page.locator("#book").evaluate((el) =>
      el.scrollIntoView({ behavior: "instant" }),
    );
    const card = page.locator(".card-flip");

    for (const [side, next] of [
      [".card-front", true],
      [".card-back", false],
      [".card-front", true],
    ] as const) {
      const box = await page.locator(`${side} .card-button`).boundingBox();
      await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
      await page.waitForTimeout(400);
      const hover = await page.locator(`${side} .card-button`).boundingBox();
      await page.mouse.click(hover!.x + hover!.width / 2, hover!.y + hover!.height / 2);
      if (next) await expect(card).toHaveAttribute("data-flipped", "true");
      else await expect(card).not.toHaveAttribute("data-flipped");
      await page.waitForTimeout(1100);
    }
  });
}

test("flipping the card by hand first cancels the automatic turn", async ({
  page,
}) => {
  await page.goto(route());
  await hydrated(page);
  await page.locator("#book").evaluate((el) =>
    el.scrollIntoView({ behavior: "instant" }),
  );
  await page.locator(".card-front").click({ position: { x: 60, y: 60 } });
  await expect(page.locator(".card-flip")).toHaveAttribute("data-flipped", "true");
  await page.getByRole("button", { name: "Flip the card back" }).click();

  await page.waitForTimeout(2600);
  await expect(page.locator(".card-flip")).not.toHaveAttribute("data-flipped");
});

test("reduced motion goes straight to the side with the Book link", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(route());
  await hydrated(page);
  await expect(page.locator(".card-flip")).toHaveAttribute("data-flipped", "true");

  await page.getByRole("link", { name: "Book a free session" }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#cf-message")).toBeInViewport();
});

test("Start a project lands on the card, turned to the invitation", async ({
  page,
}) => {
  await page.goto(route());
  await hydrated(page);

  await page.getByRole("banner").getByRole("link", { name: "Start a project" }).click();
  await expect(page).toHaveURL(/#book$/);
  await expect(page.locator(".card-stage")).toBeInViewport();
  await expect(page.locator(".card-flip")).toHaveAttribute("data-flipped", "true");

  // Turned back by hand, the next click still has to show the invitation.
  await page.getByRole("button", { name: "Flip the card back" }).click();
  await expect(page.locator(".card-flip")).not.toHaveAttribute("data-flipped");
  await page.getByRole("banner").getByRole("link", { name: "Start a project" }).click();
  await expect(page.locator(".card-flip")).toHaveAttribute("data-flipped", "true");

  await page.getByRole("link", { name: "Book a free session" }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#cf-message")).toBeInViewport();
});

test("the FAQ is open, and form and footer share its band", async ({ page }) => {
  await page.goto(route());
  const band = page.locator("#contact");
  await expect(band.locator("#faq dd")).toHaveCount(4);
  await expect(band.locator("#faq dd").first()).toBeVisible();
  await expect(band.locator("#cf-message")).toBeAttached();
  await expect(band.locator("footer")).toBeAttached();
});

test("the process section loops on its own", async ({ page }) => {
  await page.goto(route());
  const running = () =>
    page.locator(".flow-stage-box").evaluateAll(
      (boxes) => boxes.filter((b) => b.getAnimations().length > 0).length,
    );
  expect(await running()).toBe(6);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(running).toBe(0);
});
