module.exports = {
  discontinueClaim: () => {
    const data = {
      userInput: {
        MultipleClaimant:{
          addApplicant2 : 'Yes',
          claimantWhoIsDiscontinuing : {
            value: {
              code: 'bfcf6412-1b23-45c6-b451-224ab5ec1703',
              label: 'Test Inc'
            }
          }
        },
        claimantConsent:{
          selectedClaimantForDiscontinuance : 'Test Inc',
          claimantsConsentToDiscontinuance : 'Yes'
        }
      }
    };

    return data;
  }
};
