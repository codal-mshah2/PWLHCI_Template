import CommonActions from "@pages/CommonActions.js";
import { projectTest as test } from "@tests/Setup/BaseSuite.js";
import { playAudit } from "playwright-lighthouse";
import { urlsToAudit } from "@pages/Constants/URLs.js";
import uploadToLhciServer from "@pages/ReportHelper.js";

test.describe("Audit the Un-auth URL by accepting cookies", () => {
  test("Audit by accepting cookies", async ({ page }) => {
    const commonActions = new CommonActions(page);
    await commonActions.acceptTerms();

    for (const url of urlsToAudit) {
      await page.goto(url);
      await page.waitForLoadState("domcontentloaded");
      //  await page.waitForLoadState("networkidle");
      //await commonActions.UI.delay(2000);

      // 🚦 Lighthouse audit
      const result = await playAudit({
        page: page,
        port: 9222,
        thresholds: {
          performance: 5,
          accessibility: 5,
          "best-practices": 5,
          seo: 5,
          pwa: 5,
        },
        // reports: {
        //   formats: {
        //     json: true, // This generates the .json file
        //     html: true, // Optional: generates .html report
        //   },
        //   name: `report-${new Date().getTime()}`, // Name of the file
        //   directory: `${process.cwd()}/lighthouse-results`, // Where to save it
        // },
      });
      try {
        await uploadToLhciServer(result.lhr);
      } catch (err) {
        console.error("LHCI upload failed:", err);
      }
    }
  });
});
