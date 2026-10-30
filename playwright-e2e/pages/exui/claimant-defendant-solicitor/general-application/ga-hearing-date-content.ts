export const paragraph = {
  fourteenDaysAway: 'Is the application for an adjournment of a hearing which is at least 14 days away?'
}

export const radioButtons = {
  scheduled: {
    label: 'Hearing scheduled related to this application (Optional)',
    yes: {
      label: 'Yes',
      selector: '#generalAppHearingDate_hearingScheduledPreferenceYesNo-Yes',
    },
    no: {
      label: 'No',
      selector: '#generalAppHearingDate_hearingScheduledPreferenceYesNo-No',
    }
  },
};

export const inputs = {
  hearingScheduledDate: {
    day: '#hearingScheduledDate-day',
    month: '#hearingScheduledDate-month',
    year: '#hearingScheduledDate-year',
  },
};
