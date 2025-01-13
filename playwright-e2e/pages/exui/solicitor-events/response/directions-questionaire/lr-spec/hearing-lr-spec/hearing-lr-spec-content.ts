import Party from '../../../../../../../enums/party';

export const getRadioButtons = {
  availability: {
    radioYes: {
      selector: (party: Party) => `#${party}DQHearingFastClaim_unavailableDatesRequired_Yes`,
    },
    radioNo: {
      selector: (party: Party) => `#${party}DQHearingFastClaim_unavailableDatesRequired_No`,
    },
  },
  unavailableDateType: {
    single: {
      selector: (party: Party, hearingNumber: number) =>
        `#${party}DQHearingFastClaim_unavailableDate_${hearingNumber}_unavailableDateType-SINGLE_DATE`,
    },
    range: {
      selector: (party: Party, hearingNumber: number) =>
        `#${party}DQHearingFastClaim_unavailableDate_${hearingNumber}_unavailableDateType-DATE_RANGE`,
    },
  },
};

export const getButtons = {
  addNewAvailability: {
    title: 'Add new',
    selector: (party: Party) =>
      `div[id='${party}DQHearingFastClaim_unavailableDates'] button[class='button write-collection-add-item__top']`,
  },
  removeAvailability: {
    title: 'Remove',
    selector: (party: Party, hearingNumber: number) =>
      `div[id='${party}DQHearingFastClaim_unavailableDates_${hearingNumber}_${hearingNumber}'] button[class='button write-collection-remove-item__top']`,
  },
};

export const getInputs = {
  unavailableSingleDate: {
    day: {
      selector: '#date-day',
    },
    month: {
      selector: '#date-month',
    },
    year: {
      selector: '#date-year',
    },
  },
  unavailableDateRange: {
    dateFrom: {
      day: {
        selector: '#fromDate-day',
      },
      month: {
        selector: '#fromDate-month',
      },
      year: {
        selector: '#fromDate-year',
      },
    },
    dateTo: {
      day: {
        selector: '#toDate-day',
      },
      month: {
        selector: '#toDate-month',
      },
      year: {
        selector: '#toDate-year',
      },
    },
  },
};
