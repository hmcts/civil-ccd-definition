import Party from '../../../../../../../enums/party';

export const getRadioButtons = (party: Party, hearingNumber?: number) => ({
  availability: {
    radioYes: {
      selector: `#${party}DQHearingFastClaim_unavailableDatesRequired_Yes`,
    },
    radioNo: {
      selector: `#${party}DQHearingFastClaim_unavailableDatesRequired_No`,
    },
  },
  unavailableDateType: {
    single: {
      selector: `#${party}DQHearingFastClaim_unavailableDate_${hearingNumber}_unavailableDateType-SINGLE_DATE`,
    },
    range: {
      selector: `#${party}DQHearingFastClaim_unavailableDate_${hearingNumber}_unavailableDateType-DATE_RANGE`,
    },
  },
});

export const getButtons = (party: Party, hearingNumber?: number) => ({
  addNewAvailability: {
    title: 'Add new',
    selector: `div[id='${party}DQHearingFastClaim_unavailableDates'] button[class='button write-collection-add-item__top']`,
  },
  removeAvailability: {
    title: 'Remove',
    selector: `div[id='${party}DQHearingFastClaim_unavailableDates_${hearingNumber}_${hearingNumber}'] button[class='button write-collection-remove-item__top']`,
  },
});

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
