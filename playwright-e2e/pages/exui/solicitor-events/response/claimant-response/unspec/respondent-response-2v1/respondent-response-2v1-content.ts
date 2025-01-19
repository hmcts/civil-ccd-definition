import StringHelper from '../../../../../../../helpers/string-helper';
import { Party } from '../../../../../../../models/partys';

export const subheadings = {
  docUrl: 'Response document',
};

export const paragraphs = {
  rejectAll: 'Reject all of the claim',
};

export const radioButtons = {
  proceedWithClaim: {
    label: (claimantParty: Party) =>
      `Does Claimant ${claimantParty.number} want to proceed with the claim against`,
    yes: {
      label: 'Yes',
      selector: (claimantParty: Party) =>
        `#${StringHelper.capitalise(claimantParty.oldKey)}ProceedWithClaimMultiParty2v1_Yes`,
    },
    no: {
      label: 'No',
      selector: (claimantParty: Party) =>
        `#${StringHelper.capitalise(claimantParty.oldKey)}ProceedWithClaimMultiParty2v1_No`,
    },
  },
};
