import moment from 'moment-business-days';
import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import trackType from '../../../../enums/track.ts';
import { courts } from '../../../../fixtures/courts.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// The hearing centre admin's hearing notice (HEARING_SCHEDULED, "Create a hearing notice") once the case is in
// CASE_PROGRESSION, through the CCD API instead of the event's pages in XUI. As in the UI: a small claims hearing or a
// trial, a first listing (so the hearing fee is charged), in person at Clerkenwell at 10:00 on the hearing date, for an
// hour (a day on the intermediate and multi tracks, which type it in). The court list is the one the notice type page's
// mid event callback fills in from location reference data.
export class CreateHearingNotice {
  private ccdApiHelper = new CcdApiHelper();

  // The hearing is 8 weeks ahead by default, as in the UI
  async submit(caseId: string, track: trackType, hearingDate: moment.Moment = moment().businessAdd(40)) {
    const listedForAnHour = track === trackType.SMALL || track === trackType.FAST;
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'HEARING_SCHEDULED', caseId, [
      { page: 'HearingNoticeSelect', answers: { hearingNoticeList: track === trackType.SMALL ? 'SMALL_CLAIMS' : 'FAST_TRACK_TRIAL' } },
      { page: 'ListingOrRelisting', answers: { listingOrRelisting: 'LISTING' } },
      {
        page: 'HearingDetails',
        answers: (data) => ({
          hearingLocation: this.chooseCourt(data.hearingLocation),
          channel: 'IN_PERSON',
          hearingDate: hearingDate.format('YYYY-MM-DD'),
          hearingTimeHourMinute: '1000',
          ...(listedForAnHour ? { hearingDuration: 'MINUTES_60' } : { hearingDurationMinti: '1 day' }),
        }),
      },
      { page: 'HearingInformation', answers: { information: 'Hearing notice created by playwright-tests' } },
    ]);
    console.log(`HEARING_SCHEDULED submitted through the API on case ${caseId} (hearing on ${hearingDate.format('YYYY-MM-DD')})`);
  }

  private chooseCourt(courtList: { list_items?: Array<{ code: string; label: string }> } | undefined) {
    const court = courtList?.list_items?.find((item) => item.label === courts.clerkenwell.longAddress);
    if (!court) {
      throw new Error(`The hearing court list has no ${courts.clerkenwell.longAddress} (it has ${courtList?.list_items?.length ?? 0} courts)`);
    }
    return { ...courtList, value: court };
  }
}
