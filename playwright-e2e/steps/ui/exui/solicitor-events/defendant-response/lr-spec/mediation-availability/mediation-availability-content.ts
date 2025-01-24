export const heading = 'Mediation availability';

export const yesNoRadioButtons = {
  text: {
    question:
      'Are there any dates in the next 3 months when you or your client cannot attend a mediation appointment?',
    hint: 'These should only be the dates of important events like medical appointments, other court hearings, or holidays that are already booked. If the mediation appointment is not attended, your client may face a penalty. The Small Claims Mediation Service operates Monday to Friday from 8am to 5pm, except bank holidays',
  },
  radioYes: {
    text: 'Yes',
    selector: '#resp1MediationAvailability_isMediationUnavailablityExists_Yes',
  },
  radioNo: {
    text: 'No',
    selector: '#resp1MediationAvailability_isMediationUnavailablityExists_No',
  },
};

export const addNew = 'Add new';

export const remove = 'Remove';

export const singleDateOrDateRangeRadioButton = {
  text: {
    label: 'Add a single date or date range',
    warning: 'Add a single date or date range is required',
  },
  options: (dateEntry: number) => [
    {
      text: 'Single date',
      selector: `#resp1MediationAvailability_unavailableDatesForMediation_${dateEntry}_unavailableDateType-SINGLE_DATE`,
    },
    {
      text: 'Date range',
      selector: `#resp1MediationAvailability_unavailableDatesForMediation_${dateEntry}_unavailableDateType-DATE_RANGE`,
    },
  ],
};

export const unavailableSingleDate = {
  text: {
    label: 'Unavailable date',
    hint: 'This date cannot be in the past and must not be more than three months in the future',
  },
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
  text: {
    label: 'Unavailable date range',
  },
  dateFrom: {
    text: {
      label: 'Date from',
      hint: 'This date cannot be in the past and must not be more than three months in the future',
    },
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
    text: {
      label: 'Date to',
      hint: 'This date cannot be in the past and must not be more than three months in the future',
    },
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
