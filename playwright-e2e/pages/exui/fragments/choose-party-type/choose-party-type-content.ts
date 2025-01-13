import { Party } from '../../../../models/partys';

export const buttons = {
  individual: {
    label: 'Individual',
    selector: (party: Party) => `#${party.oldKey}_type-INDIVIDUAL`,
  },
  company: {
    label: 'Company',
    selector: (party: Party) => `#${party.oldKey}_type-COMPANY`,
  },
  organisaiton: {
    label: 'Organisaiton',
    selector: (party: Party) => `#${party.oldKey}_type-ORGANISATION`,
  },
  soleTrader: {
    label: 'Sole trader',
    selector: (party: Party) => `#${party.oldKey}_type-SOLE_TRADER`,
  },
};
