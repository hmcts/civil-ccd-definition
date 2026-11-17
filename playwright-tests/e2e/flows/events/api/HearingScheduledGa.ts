import CaseType from '../../../../enums/caseType.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { GaHearingNotice } from '../shared_api_ui/gaHearingNoticeSpecs.ts';

// Court staff schedule the hearing a general application was listed for (HEARING_SCHEDULED_GA, "Schedule hearing",
// on the application) through the CCD API, instead of the event's pages in XUI, with the same answers as the UI: the
// court the about to start callback chose (the one the judge asked for), or else the first in its list, by video, on
// the date and at the time given, for 15 minutes. The hearing page's callback checks the hearing is in the future.
// civil-service then sends the hearing notice and moves the application to HEARING_SCHEDULED. The ScheduleApplicationHearing
// task is claimed first, as in the UI (see WaTaskHelper).
export class HearingScheduledGa {
  private ccdApiHelper = new CcdApiHelper(CaseType.GENERAL_APPLICATION);

  async submit(applicationCaseId: string, user: SessionUserKey, notice: GaHearingNotice) {
    await this.ccdApiHelper.submitEventThroughPages(sessionUsers[user].credentials, 'HEARING_SCHEDULED_GA', applicationCaseId, [
      {
        page: 'HearingNoticeGADetail',
        answers: {
          gaHearingNoticeApplication: {
            hearingNoticeApplicationDetail: 'CLAIMANT_AND_DEFENDANT',
            hearingNoticeApplicationType: notice.applicationType,
            hearingNoticeApplicationDate: notice.applicationDate,
          },
        },
      },
      {
        page: 'HearingDetails',
        answers: (data) => {
          const locations = data.gaHearingNoticeDetail?.hearingLocation ?? {};
          return {
            gaHearingNoticeDetail: {
              hearingLocation: { ...locations, value: locations.value ?? locations.list_items?.[0] },
              channel: 'VIDEO',
              hearingDate: notice.hearingDate,
              hearingTimeHourMinute: notice.hearingTime,
              hearingDuration: 'MINUTES_15',
            },
          };
        },
      },
      { page: 'HearingInformation', answers: { gaHearingNoticeInformation: notice.information } },
    ], false, true);
    console.log(`HEARING_SCHEDULED_GA submitted through the API as ${user} on application ${applicationCaseId}`);
  }
}
