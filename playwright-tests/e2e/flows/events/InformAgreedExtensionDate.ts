import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../helpers/PageHelper';
import { ButtonHelper } from '../../../helpers/ButtonHelper.ts';

// A defendant's solicitor telling the court the parties have agreed a 28 day extension to the time for responding to
// an unspecified claim (event INFORM_AGREED_EXTENSION_DATE, "Inform agreed 28 day extension"). It is offered while the
// claim waits for the defendants' responses (AWAITING_RESPONDENT_ACKNOWLEDGEMENT), and moves that defendant's response
// deadline back; the claim's state does not change. The event has one page, showing the extended date, and no check
// your answers page.
export class InformAgreedExtensionDate {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit() {
    await this.pageHelper.selectNextStep('Inform agreed 28 day extension');

    // The description is the label of both defendants' extended date fields, and only the one for the defendant whose
    // solicitor is signed in is shown
    await expect(
      this.page.getByText('allows the parties to agree a 28 day extension to the time limit for responding to the claim').filter({ visible: true }),
    ).toBeVisible();
    await this.pageHelper.submitEvent();

    await expect(this.page.locator('#confirmation-header')).toContainText('Extension deadline submitted');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
