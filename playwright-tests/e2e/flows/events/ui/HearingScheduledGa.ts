import { expect, Page } from '@playwright/test';
import moment from 'moment-business-days';
import { PageHelper } from '../../../../helpers/PageHelper.ts';
import { GeneralApplication } from './GeneralApplication.ts';
import { GaHearingNotice } from '../shared_api_ui/gaHearingNoticeSpecs.ts';

// Court staff schedule the hearing a judge or legal adviser listed a general application for ("Schedule hearing",
// HEARING_SCHEDULED_GA, on the application), with the same answers as the API version: the application's details,
// then the hearing (the first court in the list civil-service fills in, unless the judge chose one, by video, at 10:00
// on a working day a week away, for 15 minutes), then a note. civil-service checks the hearing is in the future, sends
// the hearing notice and moves the application to HEARING_SCHEDULED. The application must be open in the page, with
// the ScheduleApplicationHearing task claimed where one is needed (see WaTaskHelper).
export class HearingScheduledGa {
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(notice: GaHearingNotice) {
    await this.pageHelper.selectNextStep('Schedule hearing');

    // The application
    await this.page.locator('#gaHearingNoticeApplication_hearingNoticeApplicationDetail').selectOption({ label: 'Claimant and Defendant' });
    await this.page.locator('#gaHearingNoticeApplication_hearingNoticeApplicationType').fill(notice.applicationType);
    await this.pageHelper.fillDate('hearingNoticeApplicationDate', moment(notice.applicationDate, 'YYYY-MM-DD'));
    await this.pageHelper.continueToNextPage();

    // The hearing: civil-service lists the courts and chooses the one the judge asked for, if any
    const location = this.page.locator('#gaHearingNoticeDetail_hearingLocation');
    await expect(location.locator('option').nth(1)).toBeAttached();
    if (await location.evaluate((select: HTMLSelectElement) => select.selectedIndex) <= 0) {
      await location.selectOption({ index: 1 });
    }
    await this.page.locator('#gaHearingNoticeDetail_channel-VIDEO').check();
    await this.pageHelper.fillDate('hearingDate', moment(notice.hearingDate, 'YYYY-MM-DD'));
    await this.page.locator('#gaHearingNoticeDetail_hearingTimeHourMinute').selectOption({ label: notice.hearingTimeLabel });
    await this.page.locator('#gaHearingNoticeDetail_hearingDuration').selectOption({ label: '15 minutes' });
    await this.pageHelper.continueToNextPage();

    // A note for the parties
    await this.page.locator('#gaHearingNoticeInformation').fill(notice.information);
    await this.pageHelper.continueToNextPage();

    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText('Hearing notice created');
    await new GeneralApplication(this.page).closeConfirmation();
  }
}
