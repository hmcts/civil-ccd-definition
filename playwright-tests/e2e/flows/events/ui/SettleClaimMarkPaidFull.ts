import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

// The claimant's solicitor marking the claim as paid in full (event SETTLE_CLAIM_MARK_PAID_FULL, "Settle this claim").
// With one claimant they confirm it, and with two they are asked whether it is for both claimants, which it is here.
// civil-service stays the case (CASE_STAYED), keeps the state it was in (preStayState) and tells the defendants.
// Court staff have their own "Settle this claim" event (SETTLE_CLAIM), which the claimant's solicitor does not see.
export class SettleClaimMarkPaidFull {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(twoClaimants: boolean) {
    await this.pageHelper.selectNextStep('Settle this claim');

    if (twoClaimants) {
      await expect(this.page.getByText('Does marking this Claim as settled relate to all claimants?')).toBeVisible();
      await this.page.locator('#markPaidForAllClaimants_Yes').check();
    } else {
      await expect(this.page.getByText('Confirm settle this claim').first()).toBeVisible();
      await this.page.locator('#markPaidConsent-YES').check();
    }
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText('This claim has been marked as settled');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
