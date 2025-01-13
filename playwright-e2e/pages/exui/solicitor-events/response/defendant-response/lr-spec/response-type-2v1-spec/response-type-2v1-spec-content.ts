import { Party } from '../../../../../../../models/partys';

export const radioButtons = {
  fullDefence: {
    label: 'Defends all of the claim',
    selector: (party: Party) => `#claimant${party.number}ClaimResponseTypeForSpec-FULL_DEFENCE`,
  },
  fullAdmit: {
    label: 'Admits all of the claim',
    selector: (party: Party) => `#claimant${party.number}ClaimResponseTypeForSpec-FULL_ADMISSION`,
  },
  partAdmit: {
    label: 'Admits part of the claim',
    selector: (party: Party) => `#claimant${party.number}ClaimResponseTypeForSpec-PART_ADMISSION`,
  },
  counterClaim: {
    label: 'Defends all of the claim and wants to counterclaim',
    selector: (party: Party) => `#claimant${party.number}ClaimResponseTypeForSpec-COUNTER_CLAIM`,
  },
};
