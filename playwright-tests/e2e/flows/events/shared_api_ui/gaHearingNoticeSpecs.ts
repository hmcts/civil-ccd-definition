import moment from 'moment-business-days';

// The hearing court staff schedule for a general application listed for a hearing (HEARING_SCHEDULED_GA), the same in
// the UI and API versions, and checked on the application afterwards
export interface GaHearingNotice {
  applicationType: string;
  // The date the application was made, YYYY-MM-DD
  applicationDate: string;
  // A working day a week away, YYYY-MM-DD
  hearingDate: string;
  // The start time as the page lists it, and as saved
  hearingTimeLabel: string;
  hearingTime: string;
  information: string;
}

export function gaHearingNotice(applicationType: string): GaHearingNotice {
  return {
    applicationType,
    applicationDate: moment().format('YYYY-MM-DD'),
    hearingDate: moment().businessAdd(5).format('YYYY-MM-DD'),
    hearingTimeLabel: '10:00',
    hearingTime: '1000',
    information: `Playwright hearing notice ${Date.now()}`,
  };
}
