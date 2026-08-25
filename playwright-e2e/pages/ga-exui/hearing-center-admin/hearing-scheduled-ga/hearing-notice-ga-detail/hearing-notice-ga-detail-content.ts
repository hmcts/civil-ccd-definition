export const subheading = 'Application details';

export const dropdowns = {
  applicationDetails: {
    label: 'Application details',
    option: 'Claimant',
    selector: '#gaHearingNoticeApplication_hearingNoticeApplicationDetail',
  },
};

export const inputs = {
  applicationType: {
    label: 'Type of application',
    selector: '#gaHearingNoticeApplication_hearingNoticeApplicationType',
  },
  applicationDate: {
    day: { label: 'Day', selector: '#hearingNoticeApplicationDate-day' },
    month: { label: 'Month', selector: '#hearingNoticeApplicationDate-month' },
    year: { label: 'Year', selector: '#hearingNoticeApplicationDate-year' },
  },
};
