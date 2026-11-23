import moment from 'moment';
import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import { SetAsideJudgment as SetAsideReason } from '../../../../enums/judgmentsOnline.ts';
import { setAsideErrorText } from '../api/SetAsideJudgment.ts';

// The hearing centre admin setting aside the default judgment (event SET_ASIDE_JUDGMENT, "Set aside judgment"). A
// judgment made in error gives a reason the parties see. A judge's order goes on to a second page: the date of the order
// (today), which type of order, and the date of the application or of the defence received (yesterday). civil-service
// moves the judgment to the claim's historic judgments, so there is no longer a live judgment, and leaves the claim in
// All_FINAL_ORDERS_ISSUED; work allocation gives the hearing centre admin a task to take the claim offline.
export class SetAsideJudgment {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(setAside: SetAsideReason) {
    await this.pageHelper.selectNextStep('Set aside judgment');

    await expect(this.page.getByText('Why is this judgment being set aside?')).toBeVisible();
    if (setAside === SetAsideReason.JUDGMENT_ERROR) {
      await this.page.locator('#joSetAsideReason-JUDGMENT_ERROR').check();
      await this.page.locator('#joSetAsideJudgmentErrorText').fill(setAsideErrorText);
      await this.pageHelper.continueToNextPage();
    } else {
      await this.page.locator('#joSetAsideReason-JUDGE_ORDER').check();
      await this.pageHelper.continueToNextPage();

      await expect(this.page.getByText('Which type of order has been made?')).toBeVisible();
      await this.pageHelper.fillDate('joSetAsideOrderDate', moment());
      await this.pageHelper.checkUntilChecked(this.page.locator(`#joSetAsideOrderType-${setAside}`));
      const otherDate = setAside === SetAsideReason.ORDER_AFTER_APPLICATION ? 'joSetAsideApplicationDate' : 'joSetAsideDefenceReceivedDate';
      await this.pageHelper.fillDate(otherDate, moment().subtract(1, 'day'));
      await this.pageHelper.continueToNextPage();
    }

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText('Judgment set aside');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
