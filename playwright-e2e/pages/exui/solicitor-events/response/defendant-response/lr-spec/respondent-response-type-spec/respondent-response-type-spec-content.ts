export const getRadioButtons = (defendantNumber: number) => ({
  fullDefence: {
    label: 'Defends all of the claim',
    selector: `#respondent${defendantNumber}ClaimResponseTypeForSpec-FULL_DEFENCE`,
  },
  fullAdmit: {
    label: 'Admits all of the claim',
    selector: `#respondent${defendantNumber}ClaimResponseTypeForSpec-FULL_ADMISSION`,
  },
  partAdmit: {
    label: 'Admits part of the claim',
    selector: `#respondent${defendantNumber}ClaimResponseTypeForSpec-PART_ADMISSION`,
  },
  counterClaim: {
    label: 'Defends all of the claim and wants to counterclaim',
    selector: `#respondent${defendantNumber}ClaimResponseTypeForSpec-COUNTER_CLAIM`,
  },
});
