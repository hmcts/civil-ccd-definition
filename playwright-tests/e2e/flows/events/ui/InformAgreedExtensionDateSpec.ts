import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

// A defendant's solicitor telling the court the date the parties have agreed to extend the time for responding to a
// specified claim to (event INFORM_AGREED_EXTENSION_DATE_SPEC, "Inform agreed extension date"). It is offered while the
// claim waits for the defendants' responses (AWAITING_RESPONDENT_ACKNOWLEDGEMENT) and sets that defendant's response
// deadline to the date; the claim's state does not change. Unlike the unspecified event the solicitor enters the date,
// which civil-service only accepts if it is a working day after the current deadline and no more than 28 days after it.
// The event has one page and no check your answers page.
export class InformAgreedExtensionDateSpec {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  // extensionDate is YYYY-MM-DD. Only the field for the defendant whose solicitor is signed in is shown: Defendant 2's
  // when they have their own solicitor, otherwise Defendant 1's (which also covers Defendant 2 when they share it).
  async submit(defendantNumber: 1 | 2, extensionDate: string) {
    await this.pageHelper.selectNextStep('Inform agreed extension date');

    const [year, month, day] = extensionDate.split('-');
    const field = `#respondentSolicitor${defendantNumber}AgreedDeadlineExtension`;
    await this.page.locator(`${field}-day`).fill(day);
    await this.page.locator(`${field}-month`).fill(month);
    await this.page.locator(`${field}-year`).fill(year);
    await this.page.locator(`${field}-year`).blur();
    await this.pageHelper.submitEvent();

    await expect(this.page.locator('#confirmation-header')).toContainText('Extension deadline submitted');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
