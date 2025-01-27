import { Party } from '../../../../../../../models/partys';

export const heading = 'Hearing availability';

export const subheadings = {
  unavailableDate: 'Unavailable date',
};

export const radioButtons = {
  unavailableDateRequired: {
    label:
    'Are there any days in the next 12 months when you, your client, an expert, or a witness, cannot attend a hearing?',
      yes: {
      label: 'Yes',
      selectorSmallClaim: (claimantDefendantParty: Party) =>
        `#${claimantDefendantParty.oldKey}DQSmallClaimHearing_unavailableDatesRequired_Yes`,
    },
    no: {
      label: 'No',
      selector: (claimantDefendantParty: Party) =>
        `#${claimantDefendantParty.oldKey}DQHearing_unavailableDatesRequired_No`,
    },
  },

  unavailableDateType: {
    label: 'Add a single date or a date range',
    single: {
      selector: (claimantDefendantParty: Party, unavailableDateNumber: number) =>
        `#${claimantDefendantParty.oldKey}DQHearing_unavailableDate_${unavailableDateNumber - 1}_unavailableDateType-SINGLE_DATE`,
      selectorSmallClaim: (claimantDefendantParty: Party, unavailableDateNumber: number) =>
        `#${claimantDefendantParty.oldKey}DQSmallClaimHearing_smallClaimUnavailableDate_${unavailableDateNumber - 1}_unavailableDateType-SINGLE_DATE`,
    },
    range: {
      selector: (claimantDefendantParty: Party, unavailableDateNumber: number) =>
        `#${claimantDefendantParty.oldKey}DQHearing_unavailableDate_${unavailableDateNumber - 1}_unavailableDateType-DATE_RANGE`,
    },
  },
};

export const inputs = {
  singleDate: {
    label: 'Unavailable date',
    selectorKey: 'date',
  },
  dateFrom: {
    label: 'Date from',
    selectorKey: 'fromDate',
  },
  dateTo: {
    label: 'Date to',
    selectorKey: 'toDate',
  },
};

export const buttons = {
  addNewAvailability: {
    title: 'Add new',
    selector: (claimantDefendantParty: Party) =>
      `div[id='${claimantDefendantParty.oldKey}DQHearing_unavailableDates']  button[type='button']`,
    selectorSmallClaim: (claimantDefendantParty: Party) =>
    `div[id='${claimantDefendantParty.oldKey}DQSmallClaimHearing_smallClaimUnavailableDate'] button[type='button']`
  },
};
