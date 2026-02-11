import CommonActions from "@pages/CommonActions.js";
import { projectTest as test } from "@tests/Setup/BaseSuite.js";
import { playAudit } from "playwright-lighthouse";
import { urlsToAudit } from "@pages/Constants/URLs.js";

test.describe("Audit the Un-auth URL by accepting cookies", () => {
  test("Audit by accepting cookies", async ({ page }) => {
    const commonActions = new CommonActions(page);
    await commonActions.acceptTerms();

    for (const url of urlsToAudit) {
      await page.goto(url);
      await page.waitForLoadState("networkidle");
      try {
        // Wrapping in a Promise to pause execution
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        throw error; // Re-throw for proper error handling upstream
      }

      try {
        await playAudit({
          page,
          port: 9222,
          url: page.url(),

          opts: {
            onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
            formFactor: "desktop",
            throttlingMethod: "devtools",
            screenEmulation: {
              mobile: false,
              width: 1350,
              height: 940,
              deviceScaleFactor: 1,
            },
            disableStorageReset: true,
          },

          reports: {
            formats: { json: true, html: true },
            name: `sp-${new URL(url).pathname.replace(/\W+/g, "_")}`,
            directory: "./lhci-reports",
          },
        });
      } catch (error) {
        console.error(`❌ Lighthouse failed for ${url}`);
        console.error(error.message);
        // continue to next URL
      }
    }
  });
});
