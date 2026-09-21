import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PW_PORT ?? 3000);

/**
 * The site is a static export, so `next start` is not available — the dev
 * server is what can actually serve it.
 *
 * baseURL is the ORIGIN only, deliberately. Putting `/portfolio` in it does
 * not work: `page.goto('/')` resolves an absolute path against the origin and
 * silently drops the base path, landing on a 404. Tests therefore navigate to
 * `BASE` below, which is the one place the deploy path is written down.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    url: `http://127.0.0.1:${PORT}/portfolio`,
    // Locally, reuse whatever is already running rather than fighting it for
    // the port — the dev server is slow to boot and is usually already up.
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
