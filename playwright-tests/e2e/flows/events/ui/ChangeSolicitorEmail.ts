import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

// The claimant's solicitor changing their own email address for notifications (event CHANGE_SOLICITOR_EMAIL, "Change
// solicitor's information"). civil-service works out which party's legal representative is making the change, so the
// claimant's solicitor gets just the one page for the claimant's legal representative: whether postal correspondence
// should go to a different address than MyHMCTS has, and the email address, which civil-service checks. The event has
// no check your answers page and leaves the claim in its state.
export class ChangeSolicitorEmail {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(email: string) {
    await this.pageHelper.selectNextStep('Change solicitor\'s information');

    await this.page.locator('#applicantSolicitor1ServiceAddressRequired_No').check();
    await this.page.locator('#applicantSolicitor1UserDetails_email').fill(email);
    await this.pageHelper.submitEvent();

    await expect(this.page.locator('#confirmation-header')).toContainText('You have updated a claimant\'s legal representative\'s information');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
