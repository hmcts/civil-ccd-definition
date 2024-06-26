module.exports = {
  discontinueClaim: (mpScenario) => {
    const data ={};
    switch (mpScenario) {
      case 'ONE_V_TWO': {
        data.userInput = {
          courtPermission: {
            courtPermissionNeeded: 'NO',
            courtPermissionNeededChecked: [
              'CourtPermissionNeededChecked'
            ]
          },
          DiscontinuingAgainstDefendants: {
            respondent2Represented: 'Yes',
            isDiscontinuingAgainstBothDefendants: 'NO',
            discontinuingAgainstOneDefendant: {
              value: {
                code: '321820a6-36cf-4fb2-9e78-2f34874ea9e8',
                label: 'Second Defendant'
              }
            }
          }
        };
      }
        break;
      case 'TWO_V_ONE': {
        data.userInput = {
          MultipleClaimant: {
            addApplicant2: 'Yes',
            claimantWhoIsDiscontinuing: {
              value: {
                code: 'bfcf6412-1b23-45c6-b451-224ab5ec1703',
                label: 'Test Inc'
              }
            }
          },
          ClaimantConsent: {
            selectedClaimantForDiscontinuance: 'Test Inc',
            claimantsConsentToDiscontinuance: 'Yes'
          },
          courtPermission: {
            courtPermissionNeeded: 'NO',
            courtPermissionNeededChecked: [
              'CourtPermissionNeededChecked'
            ]
          }
        };
      }
        break;
    }
    return data;
  }
};
