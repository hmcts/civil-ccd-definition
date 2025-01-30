import { Party } from '../../../../models/partys';

export const inputs = {
  reference: {
    label: (claimantDefendantParty: Party) =>
      `${claimantDefendantParty.partyType}'s legal representative's reference (Optional)`,
    selector: (solicitorParty: Party) =>
      `#${solicitorParty.number === 2 ? '' : 'solicitorReferences_'}${solicitorParty.oldKey}Reference`,
  },
};
