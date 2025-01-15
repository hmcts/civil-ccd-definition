import { Party } from '../../../../../../../models/partys';

export const subheadings = {
  availability: 'Hearing availability',
  unavailableDate: 'Unavailable date',
};

export const radioButtons = {
  unavailableDateRequired: {
    label:
      'Are there any dates when you, your client(s), experts or any witnesses are unavailable?',
    yes: {
      selector: (party: Party) => `#${party.oldKey}DQHearingFastClaim_unavailableDatesRequired_Yes`,
    },
    no: {
      selector: (party: Party) => `#${party.oldKey}DQHearingFastClaim_unavailableDatesRequired_No`,
    },
  },
  unavailableDateType: {
    label: 'Add a single date or a date range',
    single: {
      selector: (party: Party, hearingNumber: number) =>
        `#${party.oldKey}DQHearingFastClaim_unavailableDate_${hearingNumber - 1}_unavailableDateType-SINGLE_DATE`,
    },
    range: {
      selector: (party: Party, hearingNumber: number) =>
        `#${party.oldKey}DQHearingFastClaim_unavailableDate_${hearingNumber - 1}_unavailableDateType-DATE_RANGE`,
    },
  },
};

export const buttons = {
  addNewAvailability: {
    title: 'Add new',
    selector: (party: Party) =>
      `div[id='${party.oldKey}DQHearingFastClaim_unavailableDates'] button[class='button write-collection-add-item__top']`,
  },
  removeAvailability: {
    title: 'Remove',
    selector: (party: Party, hearingNumber: number) =>
      `div[id='${party.oldKey}DQHearingFastClaim_unavailableDates_${hearingNumber - 1}_${hearingNumber - 1}'] button[class='button write-collection-remove-item__top']`,
  },
};

export const inputs = {
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
