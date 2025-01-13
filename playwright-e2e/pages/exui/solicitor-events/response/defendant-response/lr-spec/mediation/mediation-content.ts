export const getRadioButtons = (defendantNumber?: number) => ({
  yesMediation: {
    label: 'Yes',
    selector: `#responseClaimMediationSpec${defendantNumber ?? ''}Required_Yes`,
  },
  noMediation: {
    label: 'No',
    selector: `#responseClaimMediationSpec${defendantNumber ?? ''}Required_No`,
  },
});
