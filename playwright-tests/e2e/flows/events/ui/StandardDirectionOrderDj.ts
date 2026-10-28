import { expect, Page } from '@playwright/test';
import moment from 'moment-business-days';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import { envUrl } from '../../../../civilConfig.ts';

// The judge's directions after default judgment on an unspecified claim (event STANDARD_DIRECTION_ORDER_DJ,
// "Directions Order (Judgment)"), which is offered in JUDICIAL_REFERRAL once the claimant has asked for the damages to
// be decided. XUI only offers the event through a work allocation task (its EventEnablingCondition hides it from the
// next step list), so it is opened at its page URL instead, which is where the task would take the judge. The judge
// orders a disposal hearing, in person at the court civil-service suggests, on a date 40 days away for 30 minutes, with
// the directions civil-service fills in. The order page's mid event callback generates the order, which is previewed
// before it is issued, and civil-service moves the claim to CASE_PROGRESSION.
export class StandardDirectionOrderDj {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(caseId: string) {
    await this.pageHelper.gotoAndWaitForXui(
      `${envUrl}/cases/case-details/CIVIL/CIVIL/${caseId}/trigger/STANDARD_DIRECTION_ORDER_DJ/STANDARD_DIRECTION_ORDER_DJCaseManagementOrder`,
    );

    // A disposal hearing
    await this.page.locator('#caseManagementOrderSelection-DISPOSAL_HEARING').check();
    await this.pageHelper.continueToNextPage();

    // Order and hearing details: in person, on a date 40 days away for 30 minutes
    await expect(this.page.getByText('Order and hearing details').first()).toBeVisible();
    await this.page.getByRole('radio', { name: 'In Person' }).first().check();
    await this.page.locator('#disposalHearingFinalDisposalHearingTimeDJ_input').fill('The disposal hearing will take place');
    // Other directions on the page have date fields with the same IDs, so the hearing's is found within its section
    const hearingDate = moment().add(40, 'days');
    const hearingTime = this.page.locator('#disposalHearingFinalDisposalHearingTimeDJ_disposalHearingFinalDisposalHearingTimeDJ');
    await hearingTime.locator('#date-day').fill(hearingDate.date().toString());
    await hearingTime.locator('#date-month').fill((hearingDate.month() + 1).toString());
    await hearingTime.locator('#date-year').fill(hearingDate.year().toString());
    await this.page.locator('#disposalHearingFinalDisposalHearingTimeDJ_time-THIRTY_MINUTES').check();
    await this.page.locator('#disposalHearingOrderMadeWithoutHearingDJ_input').fill('This order has been made without a hearing');
    await this.pageHelper.continueToNextPage();

    // The order civil-service generated
    await expect(this.page.getByText('View directions order')).toBeVisible({ timeout: 60000 });
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText('Your order has been issued');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
