import { Party } from '../../../../../../../models/partys';

export const radioButtons = {
  yesMediation: {
    label: 'Yes',
    selector: (party: Party) =>
      `#responseClaimMediationSpec${party.number === 1 ? '' : party.number}Required_Yes`,
  },
  noMediation: {
    label: 'No',
    selector: (party: Party) =>
      `#responseClaimMediationSpec${party.number === 1 ? '' : party.number}Required_No`,
  },
};
