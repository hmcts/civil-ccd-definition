import Party from '../../../../../../../enums/party';

export const heading = 'Hearing availability';
export const getAvailabilityQuestionSmallTrack = ( party: Party) => ({
  question:
    'Are there any days in the next 12 months when you, your client, an expert, or a witness, cannot attend a hearing?',
  hint: 'Hearings take place Monday to Friday',
  radioYes: {
    label: 'Yes',
    selector: `#${party}DQHearingSmallClaim_unavailableDatesRequired_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: `#${party}DQHearingSmallClaim_unavailableDatesRequired_Yes`
  },
});

export const getAvailabilityQuestionFastTrack = (party : Party) => ({
  radioYes: {
    label: 'Yes',
    selector: `#${party}DQHearingFastClaim_unavailableDatesRequired_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: `#${party}DQHearingFastClaim_unavailableDatesRequired_No`,
  },
});

export const getAvailabilityQuestionSmallTrack1v2 = (party : Party) => ({
  question:
    'Are there any days in the next 12 months when you, your client, an expert, or a witness, cannot attend a hearing?',
  hint: 'Hearings take place Monday to Friday',
  radioYes: {
    label: 'Yes',
    selector: `#${party}DQHearingSmallClaim_unavailableDatesRequired_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: `#${party}DQHearingSmallClaim_unavailableDatesRequired_Yes`
  },
});

export const getAvailabilityQuestionUnspecandSpec2v1 = (party : Party) => ({
  radioYes: {
    label: 'Yes',
    selector: `#${party}DQHearing_unavailableDatesRequired_Yes`,
  },
  radioNo: {
    label: 'No',
    selector: `#${party}DQHearing_unavailableDatesRequired_No`,
  },
});

export const unavailableDates = 'Unavailable dates';

export const getButtons = (party : Party) => ({
  addNewAvailability: {
    title: 'Add new',
    selector: `div[id='${party}DQHearing_unavailableDates'] button[class='button write-collection-add-item__top']`,
  },
});

export const getSingleDateOrDateRangeRadioButtonSmallClaims = (
  party : Party,
  hearingNumber: number,
) => ({
  label: 'Add a single date or date range',
  warning: 'Add a single date or date range is required',
  options: {
    single: {
      text: 'Single date',
      selector: `#respondent${party}DQHearingSmallClaim_smallClaimUnavailableDate_${hearingNumber}_unavailableDateType-SINGLE_DATE`,
    },
    range: {
      text: 'Date range',
      selector: `#respondent${party}DQHearingSmallClaim_smallClaimUnavailableDate_${hearingNumber}_unavailableDateType-DATE_RANGE`,
    },
  },
});

export const getSingleDateOrDateRangeRadioButton = (
  party : Party,
  hearingNumber: number,
) => ({
  label: 'Add a single date or date range',
  warning: 'Add a single date or date range is required',
  options: {
    single: {
      text: 'Single date',
      selector: `#${party}DQHearing_unavailableDates_${hearingNumber}_unavailableDateType-SINGLE_DATE`,
    },
    range: {
      text: 'Date range',
      selector: `#${party}DQHearing_unavailableDates_${hearingNumber}_unavailableDateType-DATE_RANGE`,
    },
  },
});

export const unavailableSingleDate = {
  label: 'Unavailable date',
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

export const unavailableDateRange = {
  label: 'Unavailable date range',
  dateFrom: {
    label: 'Date from',
    day: {
      label: 'Day',
      selector: '#fromDate-day',
    },
    month: {
      label: 'Month',
      selector: '#fromDate-month',
    },
    year: {
      label: 'Year',
      selector: '#fromDate-year',
    },
  },
  dateTo: {
    label: 'Date to',
    day: {
      label: 'Day',
      selector: '#toDate-day',
    },
    month: {
      label: 'Month',
      selector: '#toDate-month',
    },
    year: {
      label: 'Year',
      selector: '#toDate-year',
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

export const interpreterQuestion1v2 = {
  label: {
    question:
      'Will you be using an interpreter at the hearing, either for your client, or for a witness?',
  },
  radioYes: {
    label: 'Yes',
    selector: '#SmallClaimHearingInterpreter2Required_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#SmallClaimHearingInterpreter2Required_No',
  },
};

export const typeOfInterpreterQuestion = {
  label: 'Type of interpreter',
  selector: '#SmallClaimHearingInterpreterDescription',
};
