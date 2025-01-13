import { Party } from '../../../../models/partys';
import { PartyType } from '../../../../models/party-types';

export const inputs = {
  name: {
    label: 'Name',
    selector: (party: Party, partyType: PartyType) => `#${party.oldKey}_${partyType.key}Name`,
  },
  title: {
    label: 'Title (Optional)',
    selector: (party: Party, partyType: PartyType) => `#${party.oldKey}_${partyType.key}Title`,
  },
  tradingAs: {
    label: 'Trading as',
    selector: (party: Party, partyType: PartyType) => `#${party.oldKey}_${partyType.key}TradingAs`,
  },
  firstName: {
    label: 'Title (Optional)',
    selector: (party: Party, partyType: PartyType) => `#${party.oldKey}_${partyType.key}FirstName`,
  },
  lastName: {
    label: 'Title (Optional)',
    selector: (party: Party, partyType: PartyType) => `#${party.oldKey}_${partyType.key}LastName`,
  },
  dateOfBirth: {
    label: 'Date of Birth',
  },
  email: {
    label: 'Email (Optional)',
    selector: (party: Party) => `#${party.oldKey}_partyEmail`,
  },
  phone: {
    label: 'Phone (Optional)',
    selector: (party: Party) => `#${party.oldKey}_partyPhone`,
  },
};
