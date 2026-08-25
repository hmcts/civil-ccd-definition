export const radioButtons = {
  channel: {
    label: 'Channel',
    video: { label: 'Video', selector: '#gaHearingNoticeDetail_channel-VIDEO' },
    telephone: { label: 'Telephone', selector: '#gaHearingNoticeDetail_channel-TELEPHONE' },
    inPerson: { label: 'In person', selector: '#gaHearingNoticeDetail_channel-IN_PERSON' },
    paperHearing: {
      label: 'Paper hearing',
      selector: '#gaHearingNoticeDetail_channel-PAPER_HEARING',
    },
  },
};
export const dropdowns = {
  location: {
    label: 'Location',
    selector: '#gaHearingNoticeDetail_hearingLocation',
    options: {
      centralLondon:
        'Central London County Court - Thomas More Building, Royal Courts of Justice, Strand, London - WC2A 2LL',
    },
  },
  time: {
    label: 'Start time',
    selector: '#gaHearingNoticeDetail_hearingTimeHourMinute',
    options: {
      nineAm: '09:00',
    },
  },
  duration: {
    label: 'Duration',
    selector: '#gaHearingNoticeDetail_hearingDuration',
    options: {
      thirtyMinutes: '30 minutes',
    },
  },
};
export const inputs = {
  hearingDate: {
    label: 'Hearing Date',
    day: { label: 'Day', selector: '#hearingDate-day' },
    month: { label: 'Month', selector: '#hearingDate-month' },
    year: { label: 'Year', selector: '#hearingDate-year' },
  },
};
