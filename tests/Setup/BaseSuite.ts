// base/BaseSuite.ts
import { type Page } from "@playwright/test";
import { ProjectConfig } from "playpom";
import test from "playpom/playpom/base/test/BaseTest.js";

// --- Project Test ---
const rawProjectTest = test.extend<{ page: Page }>({
  page: async ({ playwright }, use) => {
    const baseURL = ProjectConfig.get("baseURL");
    const context = await playwright.chromium.launchPersistentContext("./pw-user-data", {
      headless: true,
      args: ["--remote-debugging-port=9222"],
    });

    const page = await context.newPage();
    await page.goto(baseURL);
    await use(page);
  },
});

export const projectTest = rawProjectTest;

/// IMP - To be used for the scenarios needs to be performed after login
const rawAuthenticatedTest = projectTest.extend<{ page: Page }>({
  page: async ({ page, DECRYPT, context, INPUT, logger, browser }, use) => {
    await use(page);
  },
});

export const authenticatedTest = rawAuthenticatedTest;
