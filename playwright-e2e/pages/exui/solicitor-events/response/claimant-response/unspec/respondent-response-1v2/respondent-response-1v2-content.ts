export const subheadings = {
  docUrl: 'Response document',
};

export const paragraphs = {
  rejectsAll: 'Reject all of the claim',
};

export const getRadioButtons = (defendantNumber: number) => ({
  proceedWithClaim: {
    label: `Do you want to proceed with the claim against`,
    yes: {
      label: 'Yes',
      selector: `#applicant1ProceedWithClaimAgainstRespondent${defendantNumber}MultiParty1v2_Yes`,
    },
    no: {
      label: 'No',
      selector: `#applicant1ProceedWithClaimAgainstRespondent${defendantNumber}MultiParty1v2_No`,
    },
  },
});
