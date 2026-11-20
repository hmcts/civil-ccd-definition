import { Page } from '@playwright/test';
import moment from 'moment-business-days';
import { PageHelper } from '../../../../helpers/PageHelper';
import { workingDaysAfter } from '../../../../helpers/WorkingDayHelper.ts';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import { courts } from '../../../../fixtures/courts.ts';
import trackType from '../../../../enums/track.ts';

// The hearing centre admin's hearing notice (event HEARING_SCHEDULED, "Create a hearing notice") once the case is in
// CASE_PROGRESSION. It stands in for HMC returning a LISTED hearing, which is not available on every environment.
// A first listing makes civil-service work out the hearing fee and its due date and move the case to HEARING_READINESS.
// The fast, intermediate and multi tracks share the trial notice, and a small claim has its own small claims hearing.
export class CreateHearingNotice {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  // The hearing is 40 working days (8 weeks) ahead by default, on a working day: civil-service needs it to be at least
  // 24 hours away, and trial arrangements can only be confirmed more than 3 weeks before it
  async submit(track: trackType, hearingDate?: moment.Moment) {
    hearingDate ??= moment(await workingDaysAfter(40), 'YYYY-MM-DD');
    await this.pageHelper.selectNextStep('Create a hearing notice');

    // Type of hearing notice: "Small claims hearing", or "Trial (Fast, Intermediate and Multi track)"
    await this.page.locator(`#hearingNoticeList-${track === trackType.SMALL ? 'SMALL_CLAIMS' : 'FAST_TRACK_TRIAL'}`).check();
    await this.pageHelper.continueToNextPage();

    // A first listing rather than a relisting, so the hearing fee is charged
    await this.page.locator('#listingOrRelisting-LISTING').check();
    await this.pageHelper.continueToNextPage();

    // Hearing details. The court list comes from location reference data, labelled "<site> - <address> - <postcode>"
    await this.page.locator('#hearingLocation').selectOption({ label: courts.clerkenwell.longAddress });
    await this.page.locator('#channel-IN_PERSON').check();
    await this.pageHelper.fillDate('hearingDate', hearingDate);
    await this.page.locator('#hearingTimeHourMinute').selectOption({ label: '10:00' });
    // The small claims and fast tracks pick a duration from a list; the intermediate and multi tracks type it in
    if (track === trackType.SMALL || track === trackType.FAST) {
      await this.page.locator('#hearingDuration').selectOption({ label: '1 hour' });
    } else {
      await this.page.locator('#hearingDurationMinti').fill('1 day');
    }
    await this.pageHelper.continueToNextPage();

    // Further information
    await this.page.locator('#information').fill('Hearing notice created by playwright-tests');
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await this.page.locator('#confirmation-header').waitFor({ state: 'visible' });
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
