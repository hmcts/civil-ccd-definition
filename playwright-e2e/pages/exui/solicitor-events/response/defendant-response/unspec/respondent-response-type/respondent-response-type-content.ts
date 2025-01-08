export const getRadioButtons = (defendantNumber: number, isClaimant2 = false) => ({
  rejectAll: {
    label: 'Reject all of the claim',
    selector: `#respondent${defendantNumber}ClaimResponseType${isClaimant2 ? 'ToApplicant2' : ''}-FULL_DEFENCE`,
  },
  admitAll: {
    label: 'Admit all of the claim',
    selector: `#respondent${defendantNumber}ClaimResponseType${isClaimant2 ? 'ToApplicant2' : ''}-FULL_ADMISSION`,
  },
  partAdmit: {
    label: 'Admit part of claim',
    selector: `#respondent${defendantNumber}ClaimResponseType${isClaimant2 ? 'ToApplicant2' : ''}-PART_ADMISSION`,
  },
  counterClaim: {
    label: 'Reject all of the claim and wants to counterclaim',
    selector: `#respondent${defendantNumber}ClaimResponseType${isClaimant2 ? 'ToApplicant2' : ''}-COUNTER_CLAIM`,
  },
});
