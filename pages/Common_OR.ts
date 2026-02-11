import type { Locator, Page } from "@playwright/test";

export interface Common_OR {
  enterButton: Locator;
  loginNavBarButton: Locator;
}

export function getCommonLocators(page: Page): Common_OR {
  return {
    enterButton: page.locator("//button[.='ENTER']"),
    loginNavBarButton: page.locator("//button[text()='Log In'][not(@type='submit')]"),
  };
}
