import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import { RequestForReconsiderationBy, reconsiderationReasonField } from '../../../../enums/reconsideration.ts';

export const reconsiderationReason = 'The legal adviser did not take the evidence on the quantum of the claim into account.';

// A party's solicitor asking for the legal adviser's small claims Standard Direction Order to be reconsidered (event
// REQUEST_FOR_RECONSIDERATION, "Request for Reconsideration"). It is only offered on a specified claim in
// CASE_PROGRESSION, and civil-service only allows it for a claim of £10,000 or less, within 7 days of an order a legal
// adviser drew. civil-service works out from the user's case role which party is asking, and the page shows that
// party's reason box. The claim stays in CASE_PROGRESSION, and work allocation gives a judge the "Decision on
// Reconsideration Request" task (JudgeDecideOnReconsiderRequest).
export class RequestForReconsideration {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(by: RequestForReconsiderationBy) {
    await this.pageHelper.selectNextStep('Request for Reconsideration');

    await expect(this.page.getByText('Reason for reconsideration of directions order by a Legal Advisor').first()).toBeVisible();
    await this.page.locator(`#${reconsiderationReasonField[by]}_reasonForReconsiderationTxt`).fill(reconsiderationReason);
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText('Your request has been submitted');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
