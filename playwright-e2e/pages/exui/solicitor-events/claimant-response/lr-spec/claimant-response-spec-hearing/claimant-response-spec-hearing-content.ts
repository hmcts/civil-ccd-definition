export const headings = {
  heading1: 'Hearing availability',
};

export const subHeadings = {
  heading2: 'Unavailable date',
  heading3: 'Unavailable date',
};

export const unavailableDateRadioForm = {
  paragraph:
    'Are there any days in the next 12 months when you, your client, an expert, or a witness, cannot attend a hearing?',
  paragraphFastTrack:
    'Are there any dates when you, your client(s), experts or any witnesses are unavailable?',
  paragraphUnspec:
    'Are there any days in the next 12 months when your client, an expert, or a witness, cannot attend a hearing?',
  hint: 'Hearings take place Monday to Friday.',
  radioYes: {
    label: 'Yes',
    selector: '#applicant1DQSmallClaimHearing_unavailableDatesRequired_Yes',
    selectorFastTrack: '#applicant1DQHearingLRspec_unavailableDatesRequired_Yes',
    selectorUnspec: '#applicant1DQHearing_unavailableDatesRequired_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#applicant1DQSmallClaimHearing_unavailableDatesRequired_No',
  },
  addNewUnavailableDate: {
    title: 'add new',
    selector:
      "div[id='applicant1DQSmallClaimHearing_smallClaimUnavailableDate'] button[type='button']",
    selectorFastTrack: "div[id='applicant1DQHearingLRspec_unavailableDates'] button[type='button']",
    selectorUnspec: "div[id='applicant1DQHearing_unavailableDates'] button[type='button']",
  },
};

export const navigationButtons = {
  previousButton: {
    label: 'Previous',
    selector: 'button.button-secondary:not([aria-label="Cancel upload"])',
  },
  continueButton: {
    label: 'Continue',
    selector: 'button[type="submit"]',
  },
};

export const selectSingleUnavailableDate = {
  singleDate: {
    label: 'Single Date',
    selector:
      '#applicant1DQSmallClaimHearing_smallClaimUnavailableDate_0_unavailableDateType-SINGLE_DATE',
    selectorFastTrack:
      '#applicant1DQHearingLRspec_unavailableDates_0_unavailableDateType-SINGLE_DATE',
    selectorUnspec: '#applicant1DQHearing_unavailableDates_0_unavailableDateType-SINGLE_DATE',
  },
  day: {
    label: 'Day',
    selector: '#date-day',
  },
  month: {
    label: 'Month',
    selector: '#date-month',
  },
  year: {
    label: 'Year',
    selector: '#date-year',
  },
};
