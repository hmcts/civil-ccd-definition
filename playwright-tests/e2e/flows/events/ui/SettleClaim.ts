import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import SettleClaimReason from '../../../../enums/settleClaim.ts';

// Court staff recording that the claim has settled (event SETTLE_CLAIM, "Settle this claim"), following a judge's
// order or an approved consent order. civil-service moves the claim to CASE_SETTLED. The claimant's solicitor has
// their own "Settle this claim" event (SETTLE_CLAIM_MARK_PAID_FULL), which court staff do not see.
export class SettleClaim {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(reason: SettleClaimReason.JUDGE_ORDER | SettleClaimReason.CONSENT_ORDER) {
    await this.pageHelper.selectNextStep('Settle this claim');

    // Reason for settlement
    await this.page.locator(`#settleReason-${reason}`).check();
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText('Claim marked as settled');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
