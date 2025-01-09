export const getRadioButtons = (claimantNumber: number) => ({
  fullDefence: {
    label: 'Defends all of the claim',
    selector: `#claimant${claimantNumber}ClaimResponseTypeForSpec-FULL_DEFENCE`,
  },
  fullAdmit: {
    label: 'Admits all of the claim',
    selector: `#claimant${claimantNumber}ClaimResponseTypeForSpec-FULL_ADMISSION`,
  },
  partAdmit: {
    label: 'Admits part of the claim',
    selector: `#claimant${claimantNumber}ClaimResponseTypeForSpec-PART_ADMISSION`,
  },
  counterClaim: {
    label: 'Defends all of the claim and wants to counterclaim',
    selector: `#claimant${claimantNumber}ClaimResponseTypeForSpec-COUNTER_CLAIM`,
  },
});
