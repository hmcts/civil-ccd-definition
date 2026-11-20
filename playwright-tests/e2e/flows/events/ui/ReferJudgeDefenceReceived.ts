import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

// The hearing centre admin referring the claim to a judge because a defence was received in time, after judgment was
// given (event REFER_JUDGE_DEFENCE_RECEIVED, "Refer to judge-defended claim"). civil-service changes nothing on the
// claim; work allocation gives a judge a task to decide what happens to the judgment. The event has no check your
// answers page.
export class ReferJudgeDefenceReceived {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit() {
    await this.pageHelper.selectNextStep('Refer to judge-defended claim');

    await this.page.locator('#confirmReferToJudgeDefenceReceived-CONFIRM').check();

    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText('The case has been referred to a judge for a decision');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
