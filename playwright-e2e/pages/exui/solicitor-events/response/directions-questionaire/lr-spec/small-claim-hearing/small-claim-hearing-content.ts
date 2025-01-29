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
      selector: (claimantDefendantParty: Party) =>
        `#${claimantDefendantParty.oldKey}DQHearingSmallClaim_unavailableDatesRequired_Yes`,
    },
    no: {
      label: 'No',
      selector: (claimantDefendantParty: Party) =>
        `#${claimantDefendantParty.oldKey}DQHearingSmallClaim_unavailableDatesRequired_No`,
    },
  },
  availabilityOptions: {
    single: {
      selector: (claimantDefendantParty: Party, unavailableDateNumber: number) =>
        `#${claimantDefendantParty.oldKey}DQHearingSmallClaim_smallClaimUnavailableDate_${unavailableDateNumber - 1}_unavailableDateType-SINGLE_DATE`,
    },
    range: {
      selector: (claimantDefendantParty: Party, unavailableDateNumber: number) =>
        `#${claimantDefendantParty.oldKey}DQHearingSmallClaim_smallClaimUnavailableDate_${unavailableDateNumber - 1}_unavailableDateType-DATE_RANGE`,
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
    selector: (claimantDefendantParty: Party) =>
      `div[id='${claimantDefendantParty.oldKey}DQHearing_unavailableDates'] button[class='button write-collection-add-item__top']`,
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
