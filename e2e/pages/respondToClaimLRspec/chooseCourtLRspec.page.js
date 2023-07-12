const {I} = inject();
const config = require('./../../config');

module.exports = {
  fields: function(mpScenario) {
    switch (mpScenario) {
      case 'ClaimantResponse': {
        return {
          oldFields: {
            chooseCourtLocation: {
              id: '#applicant1DQRequestedCourt_responseCourtCode'
            },
            reasonForHearingAtSpecificCourt: '#applicant1DQRequestedCourt_reasonForHearingAtSpecificCourt'
          },
          fields: {
            responseCourtLocations: {
              id: 'select[id$="applicant1DQRequestedCourt_responseCourtLocations"]',
              options: {
                preferredCourt: config.claimantSelectedCourt
              }
            },
            reasonForHearingAtSpecificCourt: '#applicant1DQRequestedCourt_reasonForHearingAtSpecificCourt',
            remoteHearingRequested: {
              id: '#applicant1DQRemoteHearingLRspec_remoteHearingRequested_radio',
              options: {
                yes: 'Yes',
                no: 'No'
              }
            },
            reasonForRemoteHearing: '#applicant1DQRemoteHearingLRspec_reasonForRemoteHearing'
          }
        };
      }

     case 'DefendantResponse2': {
        return {
          oldFields: {
            chooseCourtLocation: {
              id: '#responseClaimCourtLocation2Required_radio',
              options: {
                yes: 'Yes',
                no: 'No'
              }
            },
          },
          fields: {
            responseCourtLocations: {
              id: 'select[id$="responseCourtLocations"]',
              options: {
                preferredCourt: config.defendant2SelectedCourt
              }
            },
            reasonForHearingAtSpecificCourt: 'textarea[id$="reasonForHearingAtSpecificCourt"]'
          }
        };
       }

      case 'DefendantResponse':
      default: {
        return {
          oldFields: {
            chooseCourtLocation: {
              id: '#responseClaimCourtLocationRequired_radio',
              options: {
                yes: 'Yes',
                no: 'No'
              }
            }
          },
          fields: {
            responseCourtLocations: {
              id: 'select[id$="responseCourtLocations"]',
              options: {
                preferredCourt: config.defendantSelectedCourt
              }
            },
            reasonForHearingAtSpecificCourt: 'textarea[id$="reasonForHearingAtSpecificCourt"]'
          }
        };
      }
    }
  },

  async chooseCourt(mpScenario) {
    I.waitForElement(this.fields(mpScenario).fields.responseCourtLocations.id);
    await I.runAccessibilityTest();
    I.selectOption(this.fields(mpScenario).fields.responseCourtLocations.id,
    this.fields(mpScenario).fields.responseCourtLocations.options.preferredCourt);
    I.fillField(this.fields(mpScenario).fields.reasonForHearingAtSpecificCourt, 'Some reason');
    I.selectOption(this.fields(mpScenario).remoteHearingRequested, this.fields(mpScenario).fields.remoteHearingRequested.options.yes);
    I.fillField(this.fields(mpScenario).fields.reasonForRemoteHearing, 'Some reason');
    await I.clickContinue();
  }
};
