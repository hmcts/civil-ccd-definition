import { expect, Page } from '@playwright/test';
import { envUrl } from '../../../../civilConfig.ts';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import { ReconsiderationDecision, reconsiderationDecisionOption } from '../../../../enums/reconsideration.ts';

export const upholdingReason = 'The order took all the information on the claim into account, so it stands.';

const confirmationText: Record<ReconsiderationDecision, string> = {
  [ReconsiderationDecision.UPHOLD]: 'Upholding previous order',
  [ReconsiderationDecision.CREATE_SDO]: 'Amend previous order and create new SDO',
  [ReconsiderationDecision.CREATE_GENERAL_ORDER]: 'Amend previous order and create a general order',
};

// The judge deciding a request for reconsideration (event DECISION_ON_RECONSIDERATION_REQUEST, "Decision on
// reconsideration"). It is not in the Next step list: it is only opened from the judge's "Decision on Reconsideration
// Request" task, so the test opens the event's page by its URL once the task is assigned, as the task's link does.
// Upholding the order asks for a reason and shows the decision document civil-service generates, which is issued
// (business process DECISION_ON_RECONSIDERATION_REQUEST). The other answers only say what the judge does next: make a
// new Standard Direction Order (a new directions task) or a general order with "Make an order". The claim stays in
// CASE_PROGRESSION.
export class DecisionOnReconsiderationRequest {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(caseId: string, decision: ReconsiderationDecision) {
    await this.pageHelper.gotoAndWaitForXui(
      `${envUrl}/cases/case-details/CIVIL/CIVIL/${caseId}/trigger/DECISION_ON_RECONSIDERATION_REQUEST/DECISION_ON_RECONSIDERATION_REQUESTJudgeResponseToReconsideration`,
    );

    await this.page.locator(`#decisionOnRequestReconsiderationOptions-${reconsiderationDecisionOption[decision]}`).check();
    if (decision === ReconsiderationDecision.UPHOLD) {
      await this.page.locator('#upholdingPreviousOrderReason_reasonForReconsiderationTxtYes').fill(upholdingReason);
    }
    await this.pageHelper.continueToNextPage();

    if (decision === ReconsiderationDecision.UPHOLD) {
      // The decision document civil-service generated
      await expect(this.page.getByRole('button', { name: /\.pdf/ }).first()).toBeVisible();
      await this.pageHelper.continueToNextPage();
    }

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText('Response has been submitted');
    await expect(this.page.locator('#confirmation-body')).toContainText(confirmationText[decision]);
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
