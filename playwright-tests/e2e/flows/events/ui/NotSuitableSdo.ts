import { expect, Page } from '@playwright/test';
import { envUrl } from '../../../../civilConfig.ts';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import NotSuitableSdoReason from '../../../../enums/notSuitableSdo.ts';
import { changeLocationReason, otherReason } from '../shared_api_ui/notSuitableSdoSpecs.ts';

// The judge deciding the claim is not suitable for a Standard Direction Order (event NotSuitable_SDO, "Not suitable for
// SDO"). Judges only reach it from the "Not Suitable for SDO" link on their directions task (its EventEnablingCondition
// keeps it out of the Next step list), so it is opened at that link's URL, as CreateSdo is.
//
// Sending the claim to another hearing centre (CHANGE_LOCATION) asks why; the hearing centre admin then transfers it.
// Another reason (OTHER_REASONS) takes the claim offline.
export class NotSuitableSdo {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(caseId: string, reason: NotSuitableSdoReason) {
    await this.pageHelper.gotoAndWaitForXui(`${envUrl}/cases/case-details/CIVIL/CIVIL/${caseId}/trigger/NotSuitable_SDO/NotSuitable_SDONotSuitableSDO`);
    await expect(this.page.getByText('What is the reason for not drawing a Standard Directions Order?')).toBeVisible();

    await this.pageHelper.checkUntilChecked(this.page.locator(`#notSuitableSdoOptions-${reason}`));
    if (reason === NotSuitableSdoReason.CHANGE_LOCATION) {
      await this.page.locator('#tocTransferCaseReason_reasonForCaseTransferJudgeTxt').fill(changeLocationReason);
    } else {
      await this.page.locator('textarea[id^="reasonNotSuitable"][id$="_input"]').fill(otherReason);
    }
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText(
      reason === NotSuitableSdoReason.CHANGE_LOCATION ? 'Your request was successful' : 'Your request was accepted',
    );
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
