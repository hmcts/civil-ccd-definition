import Party from '../../../../../../../enums/party';

export const getRadioButtons = {
  availability: {
    radioYes: {
      label: 'Yes',
      selector: (party: Party) => `#${party}DQHearingSmallClaim_unavailableDatesRequired_Yes`,
    },
    radioNo: {
      label: 'No',
      selector: (party: Party) => `#${party}DQHearingSmallClaim_unavailableDatesRequired_No`,
    },
  },
  availabilityOptions: {
    single: {
      selector: (party: Party, hearingNumber: number) =>
        `#${party}DQHearingSmallClaim_smallClaimUnavailableDate_${hearingNumber}_unavailableDateType-SINGLE_DATE`,
    },
    range: {
      selector: (party: Party, hearingNumber: number) =>
        `#${party}DQHearingSmallClaim_smallClaimUnavailableDate_${hearingNumber}_unavailableDateType-DATE_RANGE`,
    },
  },
  interpreter: {
    radioYes: {
      label: 'Yes',
      selector: '#SmallClaimHearingInterpreterRequired_Yes',
    },
    radioNo: {
      label: 'No',
      selector: '#SmallClaimHearingInterpreterRequired_No',
    },
  },
};

export const getButtons = {
  addNewAvailability: {
    title: 'Add new',
    selector: (party: Party) =>
      `div[id='${party}DQHearing_unavailableDates'] button[class='button write-collection-add-item__top']`,
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
  interpreterType: {
    selector: '#SmallClaimHearingInterpreterDescription',
  },
};
