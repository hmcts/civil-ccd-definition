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
      selector: (party: Party) =>
        `#${party.oldKey}DQHearingSmallClaim_unavailableDatesRequired_Yes`,
    },
    no: {
      label: 'No',
      selector: (party: Party) => `#${party.oldKey}DQHearingSmallClaim_unavailableDatesRequired_No`,
    },
  },
  availabilityOptions: {
    single: {
      selector: (party: Party, hearingNumber: number) =>
        `#${party.oldKey}DQHearingSmallClaim_smallClaimUnavailableDate_${hearingNumber - 1}_unavailableDateType-SINGLE_DATE`,
    },
    range: {
      selector: (party: Party, hearingNumber: number) =>
        `#${party.oldKey}DQHearingSmallClaim_smallClaimUnavailableDate_${hearingNumber - 1}_unavailableDateType-DATE_RANGE`,
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
    selector: (party: Party) =>
      `div[id='${party.oldKey}DQHearing_unavailableDates'] button[class='button write-collection-add-item__top']`,
  },
};

export const inputs = {
  interpreterType: {
    label: 'Type of interpreter',
    selector: '#SmallClaimHearingInterpreterDescription',
  },
};
