import { Page } from '@playwright/test';
import moment from 'moment-business-days';
import { PageHelper } from '../../../../helpers/PageHelper.ts';
import { workingDayAfter } from '../../../../helpers/WorkingDayHelper.ts';
import { GeneralApplication } from './GeneralApplication.ts';

// A judge or legal adviser decides a general application ("Make decision", MAKE_DECISION, on the application), with the
// same answers as the API version: an order without a hearing, approving the order the applicant asked for as drafted,
// not on the court's own initiative, with no reasons given. Where the order runs to a date, such as a stay, it is a
// working day four weeks away. The application must be open in the page, with the decision's work allocation task
// claimed where one is needed (see WaTaskHelper).
export class MakeDecisionOnApplication {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  async approve() {
    await this.pageHelper.selectNextStep('Make decision');

    // Make an order without a hearing
    await this.page.locator('#judicialDecision_decision-MAKE_AN_ORDER').check();
    await this.pageHelper.continueToNextPage();

    // Approve the order as the applicant asked for it, which shows the date it runs to where it has one
    await this.page.locator('#judicialDecisionMakeOrder_makeAnOrder-APPROVE_OR_EDIT').check();
    if (await this.page.locator('#judgeApproveEditOptionDate-day').isVisible()) {
      await this.pageHelper.fillDate('judgeApproveEditOptionDate', moment(await workingDayAfter(moment().format('YYYY-MM-DD'), 28), 'YYYY-MM-DD'));
    }
    // These radios have no name, and a click from Playwright does not leave one selected, so the page's own click is
    // used (as a user's click does)
    await this.page.locator('#judicialDecisionMakeOrder_judicialByCourtsInitiative-OPTION_3').evaluate((radio: HTMLInputElement) => radio.click());
    await this.page.locator('#judicialDecisionMakeOrder_showReasonForDecision_No').evaluate((radio: HTMLInputElement) => radio.click());
    await this.pageHelper.continueToNextPage();

    // The order the previous page generated
    await this.pageHelper.continueToNextPage();
    await this.pageHelper.submitEvent();
    await new GeneralApplication(this.page).closeConfirmation();
  }
}
