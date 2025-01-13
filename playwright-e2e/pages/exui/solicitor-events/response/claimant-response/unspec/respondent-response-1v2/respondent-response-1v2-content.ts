import { Party } from '../../../../../../../models/partys';

export const subheadings = {
  docUrl: 'Response document',
};

export const paragraphs = {
  rejectsAll: 'Reject all of the claim',
};

export const radioButtons = {
  proceedWithClaim: {
    label: `Do you want to proceed with the claim against`,
    yes: {
      label: 'Yes',
      selector: (party: Party) =>
        `#applicant1ProceedWithClaimAgainstRespondent${party.number}MultiParty1v2_Yes`,
    },
    no: {
      label: 'No',
      selector: (party: Party) =>
        `#applicant1ProceedWithClaimAgainstRespondent${party.number}MultiParty1v2_No`,
    },
  },
};
