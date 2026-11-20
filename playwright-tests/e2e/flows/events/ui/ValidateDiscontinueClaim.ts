import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

// Court staff checking the order that gave the claimant permission to discontinue (event
// VALIDATE_DISCONTINUE_CLAIM_CLAIMANT, "Validate discontinuance"), which is only offered once the claimant's solicitor
// has said permission was granted. Confirming the order gives permission generates the notice of discontinuance and
// civil-service discontinues the claim (CASE_DISCONTINUED). The event has one page and no check your answers page.
export class ValidateDiscontinueClaim {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit() {
    await this.pageHelper.selectNextStep('Validate discontinuance');

    // The order gives permission, submitted from the page
    await this.page.locator('#confirmOrderGivesPermission-YES').check();
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText('Information successfully validated');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
