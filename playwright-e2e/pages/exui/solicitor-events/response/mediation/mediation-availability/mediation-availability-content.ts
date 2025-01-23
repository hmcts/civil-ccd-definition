import { Party } from '../../../../../../models/partys';

export const subHeading = 'Mediation availability';

export const content = {
  paragraph1: {
    label:
      'These should only be the dates of important events like medical appointments, other court hearings, or holidays that are already booked. If the mediation appointment is not attended, your client may face a penalty. The Small Claims Mediation Service operates Monday to Friday from 8am to 5pm, except bank holidays',
  },
};

export const inputFields = {
  singleDate: {
    parentLabel: 'Unavailable dates',
    label: 'This date cannot be in the past and must not be more than three months in the future',
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
  },
  dateRange: {
    dateFrom: {
      subHeading: 'Date from',
      label: 'This date cannot be in the past and must not be more than three months in the future',
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
    dataTo: {
      subHeading: 'Date to',
      label: 'This date cannot be in the past and must not be more than three months in the future',
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
  },
};

export const radioButtons = {
  mediationAvailability: {
    label:
      'Are there any dates in the next 3 months when you or your client cannot attend a mediation appointment?',
    yes: {
      label: 'Yes',
      selector: (claimantParty: Party) =>
        `#${claimantParty.oldKey}MediationAvailability_isMediationUnavailablityExists_Yes`,
    },
    no: {
      label: 'No',
      selector: (claimantParty: Party) =>
        `#${claimantParty.oldKey}MediationAvailability_isMediationUnavailablityExists_No`,
    },
  },
  addSingleDateOrDateRange: {
    label: 'Add a single date or date range',
    singleDate: {
      label: 'Single date',
      selector: (claimantParty: Party) =>
        `#${claimantParty.oldKey}MediationAvailability_unavailableDatesForMediation_0_unavailableDateType-SINGLE_DATE`,
    },
    dateRange: {
      label: 'Date range',
      selector: (claimantParty: Party) =>
        `#${claimantParty.oldKey}MediationAvailability_unavailableDatesForMediation_0_unavailableDateType-DATE_RANGE`,
    },
  },
};

export const buttons = {
  addNewTop: {
    label: 'Add new',
    selector: '.button.write-collection-add-item__top',
  },
  addNewBottom: {
    label: 'Add new',
    selector: '.button.write-collection-add-item__bottom ng-star-inserted',
  },
  remove: {
    label: 'Remove',
    selector: '.button[aria-label="Remove Unavailable dates"]',
  },
  previous: {
    label: 'Previous',
    selector: '.button.button-secondary',
  },
  submit: {
    label: 'Continue',
    selector: '.button.button[type="submit"]',
  },
};
