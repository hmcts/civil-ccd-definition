import { Party } from '../../../../../../../models/partys';

export const heading = 'Hearing availability';

export const subheadings = {
  unavailableDate: 'Unavailable date',
};

export const radioButtons = {
  unavailableDateRequired: {
    label:
    'Are there any days in the next 12 months when you, your client, an expert, or a witness, cannot attend a hearing?',
    label1v1FastTrack: 'Are there any dates when you, your client(s), experts or any witnesses are unavailable?',
      yes: {
      label: 'Yes',
        selectorFastTrack1v1: (claimantDefendantParty: Party) =>
          `#${claimantDefendantParty.oldKey}DQHearingLRspec_unavailableDatesRequired_Yes`,
        selectorSmallClaim: (claimantDefendantParty: Party) =>
        `#${claimantDefendantParty.oldKey}DQSmallClaimHearing_unavailableDatesRequired_Yes`,
    },
    no: {
      label: 'No',
      selectorFastTrack1v1: (claimantDefendantParty: Party) =>
        `#${claimantDefendantParty.oldKey}DQHearingLRspec_unavailableDatesRequired_No`,
      selector: (claimantDefendantParty: Party) =>
        `#${claimantDefendantParty.oldKey}DQHearing_unavailableDatesRequired_No`,
    },
  },

  unavailableDateType: {
    label: 'Add a single date or a date range',
    single: {
      selector1v1FastTrack: (claimantDefendantParty: Party, unavailableDateNumber: number) =>
        `#${claimantDefendantParty.oldKey}DQHearingLRspec_unavailableDates_${unavailableDateNumber - 1}_unavailableDateType-SINGLE_DATE`,
      selector: (claimantDefendantParty: Party, unavailableDateNumber: number) =>
        `#${claimantDefendantParty.oldKey}DQHearing_unavailableDate_${unavailableDateNumber - 1}_unavailableDateType-SINGLE_DATE`,
      selectorSmallClaim: (claimantDefendantParty: Party, unavailableDateNumber: number) =>
        `#${claimantDefendantParty.oldKey}DQSmallClaimHearing_smallClaimUnavailableDate_${unavailableDateNumber - 1}_unavailableDateType-SINGLE_DATE`,
    },
    range: {
      selector1v1FastTrack: (claimantDefendantParty: Party, unavailableDateNumber: number) =>
        `#${claimantDefendantParty.oldKey}DQHearingLRspec_unavailableDate_${unavailableDateNumber - 1}_unavailableDateType-DATE_RANGE`,
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
    selector1v1FastTrack: (claimantDefendantParty: Party) =>
      `div[id='${claimantDefendantParty.oldKey}DQHearingLRspec_unavailableDates'] button[type='button']`,
    selector: (claimantDefendantParty: Party) =>
      `div[id='${claimantDefendantParty.oldKey}DQHearing_unavailableDates']  button[type='button']`,
    selectorSmallClaim: (claimantDefendantParty: Party) =>
    `div[id='${claimantDefendantParty.oldKey}DQSmallClaimHearing_smallClaimUnavailableDate'] button[type='button']`
  },
};
