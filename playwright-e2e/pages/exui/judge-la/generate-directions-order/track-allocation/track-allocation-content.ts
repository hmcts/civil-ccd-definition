export const radioButtons = {
  finalOrderAllocateToTrack: {
    label:
      'Are you allocating or re-allocating the claim to a track or are you changing the complexity band?',
    containerSelector: '#finalOrderAllocateToTrack_radio',
    yes: {
      label: 'Yes',
      selector: '#finalOrderAllocateToTrack_Yes',
    },
    no: {
      label: 'No',
      selector: '#finalOrderAllocateToTrack_No',
    },
  },
  finalOrderTrackAllocation: {
    label: 'What track are you allocating or re-allocating the claim to?',
    intermediateClaim: {
      label: 'Intermediate Track',
      selector: '#finalOrderTrackAllocation-INTERMEDIATE_CLAIM',
    },
    multiClaim: {
      label: 'Multi Track',
      selector: '#finalOrderTrackAllocation-MULTI_CLAIM',
    },
  },
};
