import { Page } from "@playwright/test";

export class LinkHelper {
  constructor(public page: Page) {}

  readonly signOut = this.page.locator('.hmcts-header__navigation-link');
  readonly manualAddressClaimant1 = this.page.locator('//*[@id="applicant1_primaryAddress_primaryAddress"]/div/a');
  readonly manualAddressClaimant2 = this.page.locator('//*[@id="applicant2_primaryAddress_primaryAddress"]/div/a');
  readonly manualAddressDefendant1 = this.page.locator('//*[@id="respondent1_primaryAddress_primaryAddress"]/div/a');
  readonly manualAddressDefendant2 = this.page.locator('//*[@id="respondent2_primaryAddress_primaryAddress"]/div/a');
}
