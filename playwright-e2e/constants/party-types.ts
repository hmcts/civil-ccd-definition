import ClaimantDefendantTypes from '../models/claimant-defendant-types';

const claimantDefendantTypes: ClaimantDefendantTypes = {
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

export default claimantDefendantTypes;
