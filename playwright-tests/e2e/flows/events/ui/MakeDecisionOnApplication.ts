import { expect, Page } from '@playwright/test';
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

  // For an application made without notice: instead of deciding it, asks for more information by sending it to the other
  // side ("Send application to other party and request hearing details"), as civil-service's
  // GAJudgeRequestMoreInfoOption.SEND_APP_TO_OTHER_PARTY. The option is only offered for an application made without
  // notice, and needs nothing else on the page, so there is no order to preview (showRequestInfoPreviewDoc is No).
  // civil-service then asks the applicant for the extra fee (APPLICATION_ADD_PAYMENT).
  async sendToOtherParty() {
    await this.pageHelper.selectNextStep('Make decision');

    await this.page.locator('#judicialDecision_decision-REQUEST_MORE_INFO').check();
    await this.pageHelper.continueToNextPage();

    await this.page.locator('#judicialDecisionRequestMoreInfo_requestMoreInfoOption-SEND_APP_TO_OTHER_PARTY').check();
    await this.pageHelper.continueToNextPage();

    await this.pageHelper.submitEvent();
    await new GeneralApplication(this.page).closeConfirmation();
  }

  // Asks the applicant for more information instead of deciding the application (GENERAL_APPLICATION_DECISION=
  // REQUEST_MORE_INFO): "Request more information", with the information wanted and a date a week away to give it by.
  // civil-service fills in the recital. For an application made without notice the page also asks whether to request
  // more information or send it to the other side. civil-service then waits for the applicant's response
  // (AWAITING_ADDITIONAL_INFORMATION), and the decision comes back to the court once the date has passed.
  async requestMoreInfo(information: string) {
    await this.pageHelper.selectNextStep('Make decision');

    await this.page.locator('#judicialDecision_decision-REQUEST_MORE_INFO').check();
    await this.pageHelper.continueToNextPage();

    const option = this.page.locator('#judicialDecisionRequestMoreInfo_requestMoreInfoOption-REQUEST_MORE_INFORMATION');
    if (await option.isVisible()) {
      await option.check();
    }
    await this.page.locator('#judicialDecisionRequestMoreInfo_judgeRequestMoreInfoText').fill(information);
    await this.pageHelper.fillDate('judgeRequestMoreInfoByDate', moment().add(7, 'days'));
    await this.pageHelper.continueToNextPage();

    await this.previewAndSubmit();
  }

  // Lists the application for a hearing instead of deciding it now (GENERAL_APPLICATION_DECISION=LIST_FOR_HEARING): a
  // 15 minute video hearing, then the general order with the hearing directions (civil-service fills in the recital),
  // not on the court's own initiative. civil-service then waits for court staff to schedule the hearing
  // (LISTING_FOR_A_HEARING).
  async listForHearing(directions: string) {
    await this.pageHelper.selectNextStep('Make decision');

    await this.page.locator('#judicialDecision_decision-LIST_FOR_A_HEARING').check();
    await this.pageHelper.continueToNextPage();

    await this.page.locator('#judicialListForHearing_hearingPreferencesPreferredType-VIDEO').check();
    await this.page.locator('#judicialListForHearing_judicialTimeEstimate-MINUTES_15').check();
    await this.pageHelper.continueToNextPage();

    await this.page.locator('#judicialGOHearingDirections').fill(directions);
    // As for approving an order, the radio is clicked by the page itself
    await this.page.locator('#judicialByCourtsInitiativeListForHearing-OPTION_3').evaluate((radio: HTMLInputElement) => radio.click());
    await this.pageHelper.continueToNextPage();

    await this.previewAndSubmit();
  }

  // The order the previous page generated, where there is one to preview, then check your answers and submit
  private async previewAndSubmit() {
    const continueButton = this.page.getByRole('button', { name: 'Continue' });
    const submitButton = this.page.getByRole('button', { name: 'Submit' });
    await expect(continueButton.or(submitButton).first()).toBeVisible();
    if (await continueButton.isVisible()) {
      await this.pageHelper.continueToNextPage();
    }
    await this.pageHelper.submitEvent();
    await new GeneralApplication(this.page).closeConfirmation();
  }
}
