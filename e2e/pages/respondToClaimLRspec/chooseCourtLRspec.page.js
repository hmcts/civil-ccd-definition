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
            reasonForHearingAtSpecificCourt: '#applicant1DQRequestedCourt_reasonForHearingAtSpecificCourt'
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
            reasonForHearingAtSpecificCourt: 'textarea[id$="reasonForHearingAtSpecificCourt"]',
            respondent2DQRemoteHearingLRspec: {
              remoteHearingRequested: 'Yes',
              reasonForRemoteHearing: 'Some reason'
            },
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
            reasonForHearingAtSpecificCourt: 'textarea[id$="reasonForHearingAtSpecificCourt"]',
            respondent1DQRemoteHearingLRspec: {
              remoteHearingRequested: {
                options: {
                  yes: 'Yes',
                  no: 'No'
                }
              },
              reasonForRemoteHearing: 'Some reason'
            },
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
    I.click(this.fields(mpScenario).fields.respondent1DQRemoteHearingLRspec.remoteHearingRequested.options.yes);
    I.fillField(this.fields(mpScenario).fields.respondent1DQRemoteHearingLRspec.reasonForRemoteHearing, 'Some reason');
    await I.clickContinue();
  }
};
