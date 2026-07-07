export const heading = 'Settle this claim';

export const radioButtons = {
  relateToAllClaimants: {
    label: 'Does marking this Claim as settled relate to all claimants?',
    yes: {
      label: 'Yes',
      selector: '#markPaidForAllClaimants_Yes',
    },
    no: {
      label: 'No',
      selector: '#markPaidForAllClaimants_No',
    },
  },
  claimantRelatesTo: {
    label: 'Select the claimant this relates to',
    claimant1: {
      label: 'Test Inc',
    },
    claimant2: {
      label: 'Claim 2',
    },
  },
};
