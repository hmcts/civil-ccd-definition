import { Locator, Page } from "@playwright/test";

export class LinkHelper {
  readonly signOut: Locator;
  readonly manualAddressClaimant1: Locator;
  readonly manualAddressClaimant2: Locator;
  readonly manualAddressDefendant1: Locator;
  readonly manualAddressDefendant2: Locator;

  constructor(public page: Page) {
    this.signOut = page.locator('.hmcts-header__navigation-link');
    this.manualAddressClaimant1 = page.locator('//*[@id="applicant1_primaryAddress_primaryAddress"]/div/a');
    this.manualAddressClaimant2 = page.locator('//*[@id="applicant2_primaryAddress_primaryAddress"]/div/a');
    this.manualAddressDefendant1 = page.locator('//*[@id="respondent1_primaryAddress_primaryAddress"]/div/a');
    this.manualAddressDefendant2 = page.locator('//*[@id="respondent2_primaryAddress_primaryAddress"]/div/a');
  }
}
