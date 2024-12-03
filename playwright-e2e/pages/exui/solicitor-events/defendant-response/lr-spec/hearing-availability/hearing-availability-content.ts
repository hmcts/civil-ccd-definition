import exp from 'constants';

export const heading = 'Hearing availability';

export const availabilityQuestionSmallTrack = {
  question:
    'Are there any days in the next 12 months when you, your client, an expert, or a witness, cannot attend a hearing?',
  hint: 'Hearings take place Monday to Friday',
  radioYes: {
    label: 'Yes',
    selector: '#respondent1DQHearingSmallClaim_unavailableDatesRequired_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#respondent1DQHearingSmallClaim_unavailableDatesRequired_No',
  },
};

export const availabilityQuestionFastTrack = {
  radioYes: {
    label: 'Yes',
    selector: '#respondent1DQHearingFastClaim_unavailableDatesRequired_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#respondent1DQHearingFastClaim_unavailableDatesRequired_No',
  },
};

export const unavailableDates = 'Unavailable dates';

export const addNew = 'Add new';

export const remove = 'Remove';

export const singleDateOrDateRangeRadioButton = {
  label: 'Add a single date or date range',
  warning: 'Add a single date or date range is required',
  options: (dateEntry: number) => [
    {
      text: 'Single date',
      selector: `#respondent1DQHearingSmallClaim_smallClaimUnavailableDate_${dateEntry}_unavailableDateType-SINGLE_DATE`,
    },
    {
      text: 'Date range',
      selector: `#respondent1DQHearingSmallClaim_smallClaimUnavailableDate_${dateEntry}_unavailableDateType-DATE_RANGE`,
    },
  ],
};

export const unavailableSingleDate = {
  label: 'Unavailable date',
  day: {
    label: 'Day',
    input: '#date-day',
  },
  month: {
    label: 'Month',
    input: '#date-month',
  },
  year: {
    label: 'Year',
    input: '#date-year',
  },
};

export const unavailableDateRange = {
  label: 'Unavailable date range',
  dateFrom: {
    label: 'Date from',
    day: {
      label: 'Day',
      input: '#fromDate-day',
    },
    month: {
      label: 'Month',
      input: '#fromDate-month',
    },
    year: {
      label: 'Year',
      input: '#fromDate-year',
    },
  },
  dateTo: {
    label: 'Date to',
    day: {
      label: 'Day',
      input: '#toDate-day',
    },
    month: {
      label: 'Month',
      input: '#toDate-month',
    },
    year: {
      label: 'Year',
      input: '#toDate-year',
    },
  },
};

export const interpreterQuestion = {
  label: {
    question:
      'Will you be using an interpreter at the hearing, either for your client, or for a witness?',
  },
  radioYes: {
    label: 'Yes',
    selector: '#SmallClaimHearingInterpreterRequired_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#SmallClaimHearingInterpreterRequired_No',
  },
};

export const typeOfInterpreterQuestion = {
  label: 'Type of interpreter',
  selector: '#SmallClaimHearingInterpreterDescription',
};
