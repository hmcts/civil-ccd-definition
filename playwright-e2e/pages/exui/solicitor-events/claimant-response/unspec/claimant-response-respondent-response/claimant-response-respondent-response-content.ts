export const respondentResponseSubHeadings = {
  subheading2: 'Response document',
};

export const paragraph = {
  descriptionText: 'Reject all of the claim',
  claimantText: "Claimant's response to defendant",
};
export const legend = {
  proceedClaim: 'Do you want to proceed with the claim',
  containerSelector:
    "div[id='applicant1ProceedWithClaim'] span[class='form-label ng-star-inserted']",
  containerSelector1v2Respondent1:
    "div[id='applicant1ProceedWithClaimAgainstRespondent1MultiParty1v2'] span[class='form-label ng-star-inserted']",
  containerSelector1v2Respondent2:
    "div[id='applicant1ProceedWithClaimAgainstRespondent2MultiParty1v2'] span[class='form-label ng-star-inserted']",
};
export const legendUnspec2v1 = {
  textClaimant1: 'Does Claimant 1 want to proceed with the claim against',
  textClaimant2: 'Does Claimant 2 want to proceed with the claim against',
};
export const radioButtonForm = {
  radioYes: {
    label: 'Yes',
    selector: '#applicant1ProceedWithClaim_Yes',
    selector1v2Respondent1: '#applicant1ProceedWithClaimAgainstRespondent1MultiParty1v2_Yes',
    selector1v2Respondent2: '#applicant1ProceedWithClaimAgainstRespondent2MultiParty1v2_Yes',
    selector2v1Clamant1: '#applicant1ProceedWithClaimMultiParty2v1_Yes',
    selector2v1Clamant2: '#applicant2ProceedWithClaimMultiParty2v1_Yes',
  },
  radioNo: {
    label: 'No',
    selector: '#applicant1ProceedWithClaim_No',
  },
};

export const containers = {
  claimResponseType: {
    selector: "dl[id='respondent1ClaimResponseTypeLabelForSpec'] p",
  },
};
