import { Party } from '../../../../models/partys';

export const buttons = {
  individual: {
    label: 'Individual',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}_type-INDIVIDUAL`,
  },
  company: {
    label: 'Company',
    selector: (claimantDefendantParty: Party) => `#${claimantDefendantParty.oldKey}_type-COMPANY`,
  },
  organisaiton: {
    label: 'Organisaiton',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}_type-ORGANISATION`,
  },
  soleTrader: {
    label: 'Sole trader',
    selector: (claimantDefendantParty: Party) =>
      `#${claimantDefendantParty.oldKey}_type-SOLE_TRADER`,
  },
};
