import { BasePage, getLogger, type Page } from "playpom";
import { type Common_OR, getCommonLocators } from "./Common_OR.js";

export default class CommonActions extends BasePage {
  public initialPage: Page;
  public commonLocators: Common_OR;

  constructor(page: Page) {
    // Initialization if needed
    super(page);
    this.initialPage = page;
    this.logger = getLogger();
    this.commonLocators = getCommonLocators(page);
  }

  async acceptTerms(): Promise<void> {
    if (!(await this.commonLocators.loginNavBarButton.isVisible())) {
      await this.UI.clickAndVerify(this.commonLocators.enterButton, this.commonLocators.loginNavBarButton);
      this.logger.info("Successfully accepted the terms and Homepage is displayed");
    } else {
      this.logger.info("Term was already accepted and Homepage is displayed");
    }
  }
}
