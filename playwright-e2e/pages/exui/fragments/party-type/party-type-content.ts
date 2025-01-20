import { Party } from '../../../../models/partys';
import { ClaimantDefendantType } from '../../../../models/claimant-defendant-types';

export const inputs = {
  name: {
    label: 'Name',
    selector: (claimantDefendantParty: Party, partyType: ClaimantDefendantType) =>
      `#${claimantDefendantParty.oldKey}_${partyType.key}Name`,
  },
  title: {
    label: 'Title (Optional)',
    selector: (claimantDefendantParty: Party, partyType: ClaimantDefendantType) =>
      `#${claimantDefendantParty.oldKey}_${partyType.key}Title`,
  },
  tradingAs: {
    label: 'Trading as',
    selector: (claimantDefendantParty: Party, partyType: ClaimantDefendantType) =>
      `#${claimantDefendantParty.oldKey}_${partyType.key}TradingAs`,
  },
  firstName: {
    label: 'Title (Optional)',
    selector: (claimantDefendantParty: Party, partyType: ClaimantDefendantType) =>
      `#${claimantDefendantParty.oldKey}_${partyType.key}FirstName`,
  },
  lastName: {
    label: 'Title (Optional)',
    selector: (claimantDefendantParty: Party, partyType: ClaimantDefendantType) =>
      `#${claimantDefendantParty.oldKey}_${partyType.key}LastName`,
  },
  dateOfBirth: {
    label: 'Date of Birth',
  },
  email: {
    label: 'Email (Optional)',
    selector: (claimantDefendantParty: Party) => `#${claimantDefendantParty.oldKey}_partyEmail`,
  },
  phone: {
    label: 'Phone (Optional)',
    selector: (claimantDefendantParty: Party) => `#${claimantDefendantParty.oldKey}_partyPhone`,
  },
};
