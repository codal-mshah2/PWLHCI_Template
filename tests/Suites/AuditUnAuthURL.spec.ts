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
      await page.waitForLoadState("domcontentloaded");

      // 🚦 Lighthouse audit
      await playAudit({
        page,
        port: 9222,

        // Audit the already-authenticated page
        url: page.url(),

        opts: {
          onlyCategories: ["performance", "accessibility", "best-practices", "seo"],

          // Desktop audit
          formFactor: "desktop",
          screenEmulation: {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
          },

          // Preserve auth
          disableStorageReset: true,
        },

        // Let LHCI handle assertions
        ignoreError: true,

        reports: {
          formats: {
            html: true,
            json: true,
          },
          name: `sp-${new URL(url).pathname.replace(/\W+/g, "_")}`,
          directory: "./lhci-reports",
        },
      });
    }
  });
});
