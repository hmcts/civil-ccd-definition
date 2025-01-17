import PartyTypes from '../models/party-types';

const partyTypes: PartyTypes = {
  INDIVIDUAL: {
    type: 'INDIVIDUAL',
    key: 'individual',
  },
  COMPANY: {
    type: 'COMPANY',
    key: 'company',
  },
  SOLE_TRADER: {
    type: 'SOLE_TRADER',
    key: 'soleTrader',
  },
  ORGANISATION: {
    type: 'ORGANISATION',
    key: 'organisation',
  },
};

export default partyTypes;
