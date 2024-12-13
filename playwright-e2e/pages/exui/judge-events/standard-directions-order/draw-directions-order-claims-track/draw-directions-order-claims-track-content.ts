export const paragraph = 'Do you want to allocate this claim to the small claims track?';
export const radioButtons = {
  yes: {
    label: 'Yes',
    selector: '#drawDirectionsOrderSmallClaims_Yes',
  },
  no: {
    label: 'No',
    selector: '#drawDirectionsOrderSmallClaims_No',
  },
};

export const checkboxes = {
  smallClaims: {
    label: 'Select additional directions for Small Claims Track, if any (Optional)',
    creditHire: {
      label: 'Credit Hire',
      selector: '#drawDirectionsOrderSmallClaimsAdditionalDirections-smallClaimCreditHire',
    },
    roadTrafficAccident: {
      label: 'Road Traffic Accident',
      selector: '#drawDirectionsOrderSmallClaimsAdditionalDirections-smallClaimRoadTrafficAccident',
    },
    disputeResolutionHearing: {
      label: 'Dispute resolution hearing (Do not use with other options)',
      selector:
        '#drawDirectionsOrderSmallClaimsAdditionalDirections-smallClaimDisputeResolutionHearing',
    },
    flightDelay: {
      label: 'Flight Delay',
      selector: '#drawDirectionsOrderSmallClaimsAdditionalDirections-smallClaimFlightDelay',
    },
  },
};
