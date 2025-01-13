export const subheadings = {
  docUrl: 'Response document',
};

export const paragraphs = {
  rejectAll: 'Reject all of the claim',
};

export const getRadioButtons = (claimantNumber: number) => ({
  proceedWithClaim: {
    label: `Does Claimant ${claimantNumber} want to proceed with the claim against`,
    yes: {
      label: 'Yes',
      selector: `#applicant${claimantNumber}ProceedWithClaimMultiParty2v1_Yes`,
    },
    no: {
      label: 'No',
      selector: `#applicant${claimantNumber}ProceedWithClaimMultiParty2v1_No`,
    },
  },
});
