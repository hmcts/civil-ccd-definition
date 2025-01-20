import { ClaimantDefendantType } from '../../../../models/claimant-defendant-types';

export const inputs = {
  dateOfBirth: {
    label: 'Date of birth',
    day: {
      label: 'Day',
      selector: (partyType: ClaimantDefendantType) => `#${partyType.key}DateOfBirth-day`,
    },
    month: {
      label: 'Month',
      selector: (partyType: ClaimantDefendantType) => `#${partyType.key}DateOfBirth-month`,
    },
    year: {
      label: 'Year',
      selector: (partyType: ClaimantDefendantType) => `#${partyType.key}DateOfBirth-year`,
    },
  },
};
