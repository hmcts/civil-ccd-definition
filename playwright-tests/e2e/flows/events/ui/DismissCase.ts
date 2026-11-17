import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

// The hearing centre admin dismissing the case (event DISMISS_CASE, "Dismiss case"), which moves it to CASE_DISMISSED
// ("Claim Dismissed"). civil-service clears the hearing details and any requested judgment and tells the parties. The
// parties can still see the case but not act on it. The event has one page, which only explains this, and no check your
// answers page.
export class DismissCase {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit() {
    await this.pageHelper.selectNextStep('Dismiss case');

    await expect(this.page.getByText('This case will be dismissed.')).toBeVisible();
    await this.pageHelper.submitEvent();

    await expect(this.page.locator('#confirmation-header')).toContainText('The case has been dismissed');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
