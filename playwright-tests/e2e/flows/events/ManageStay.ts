import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../helpers/PageHelper';
import { ButtonHelper } from '../../../helpers/ButtonHelper.ts';

// Court staff managing a stayed case (event MANAGE_STAY, "Manage stay"), which is only offered in CASE_STAYED. They
// either ask the parties for an update, which leaves the case stayed, or lift the stay, which takes the claim back to
// the state it was stayed in.
export class ManageStay {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  // The parties are asked for an update and, after 7 days, a task is raised to progress the case
  async requestUpdate() {
    await this.chooseOption('REQUEST_UPDATE');

    await expect(this.page.getByText('You are requesting an update on this case, the stay will not be lifted.')).toBeVisible();
    await this.pageHelper.continueToNextPage();

    await this.submitAndConfirm('You have requested an update on');
  }

  // The page after the options explains what lifting the stay does, which depends on the state the claim was stayed
  // in. From JUDICIAL_REFERRAL or IN_MEDIATION the case goes back to a judge for a standard directions order.
  async liftStay() {
    await this.chooseOption('LIFT_STAY');

    await this.pageHelper.continueToNextPage();

    await this.submitAndConfirm('You have lifted the stay from this');
  }

  private async chooseOption(option: 'REQUEST_UPDATE' | 'LIFT_STAY') {
    await this.pageHelper.selectNextStep('Manage stay');

    await this.page.locator(`#manageStayOption-${option}`).check();
    await this.pageHelper.continueToNextPage();
  }

  // Check your answers and submit, then close the confirmation
  private async submitAndConfirm(confirmationHeading: string) {
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText(confirmationHeading);
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
