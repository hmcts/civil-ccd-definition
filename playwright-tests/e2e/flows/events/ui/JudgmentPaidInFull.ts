import moment from 'moment';
import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

// The claimant's solicitor marking the live judgment as paid in full (event JUDGMENT_PAID_IN_FULL, "Mark judgment as
// paid in full"): paid today, and confirmed. civil-service marks the judgment satisfied, or cancelled where it was paid
// within a month of the judgment. Not to be confused with "Settle this claim" (SETTLE_CLAIM_MARK_PAID_FULL), which
// settles a claim with no judgment. The event has no check your answers page.
export class JudgmentPaidInFull {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit() {
    await this.pageHelper.selectNextStep('Mark judgment as paid in full');

    await expect(this.page.getByText('Enter the date the judgment was paid in full')).toBeVisible();
    await this.pageHelper.fillDate('dateOfFullPaymentMade', moment());
    await this.pageHelper.checkUntilChecked(this.page.locator('#joJudgmentPaidInFull_confirmFullPaymentMade-CONFIRMED'));

    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText('Judgment marked as paid in full');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
