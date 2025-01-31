import { Party } from '../../../../../../../models/partys';

export const subheadings = {
  availability: 'Hearing availability',
  unavailableDate: 'Unavailable date ',
};

export const radioButtons = {
  unavailableDatesRequired: {
    label:
      'Are there any days in the next 12 months when you, your client, an expert, or a witness, cannot attend a hearing?',
    yes: {
      label: 'Yes',
      selector: (defendantParty: Party) =>
        `#${defendantParty.oldKey}DQSmallClaimHearing_unavailableDatesRequired_Yes`,
    },
    no: {
      label: 'No',
      selector: (defendantParty: Party) =>
        `#${defendantParty.oldKey}DQHearingSmallClaim_unavailableDatesRequired_No`,
    },
  },
  availabilityOptions: {
    single: {
      selector: (defendantParty: Party, unavailableDateNumber: number) =>
        `#${defendantParty.oldKey}DQSmallClaimHearing_smallClaimUnavailableDate_${unavailableDateNumber - 1}_unavailableDateType-SINGLE_DATE`,
    },
    range: {
      selector: (defendantParty: Party, unavailableDateNumber: number) =>
        `#${defendantParty.oldKey}DQHearingSmallClaim_smallClaimUnavailableDate_${unavailableDateNumber - 1}_unavailableDateType-SINGLE_DATE`,
    },
  },
  interpreter: {
    label:
      'Will you be using an interpreter at the hearing, either for your client, or for a witness?',
    yes: {
      label: 'Yes',
      selector: '#SmallClaimHearingInterpreterRequired_Yes',
    },
    no: {
      label: 'No',
      selector: '#SmallClaimHearingInterpreterRequired_No',
    },
  },
};

export const buttons = {
  addNewAvailability: {
    title: 'Add new',
    selector: (defendantParty: Party) =>
      `div[id='${defendantParty.oldKey}DQSmallClaimHearing_smallClaimUnavailableDate'] button[type='button']`,
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
  interpreterType: {
    label: 'Type of interpreter',
    selector: '#SmallClaimHearingInterpreterDescription',
  },
};
