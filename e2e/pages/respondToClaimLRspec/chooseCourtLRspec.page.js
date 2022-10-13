const {I} = inject();
const {checkCourtLocationDynamicListIsEnabled} = require('./../../api/testingSupport');
const config = require('./../../config');

module.exports = {
  fields: function(mpScenario) {
    switch (mpScenario) {
      case 'ClaimantResponse': {
        return {
          oldFields: {
            chooseCourtLocation: {
              id: '#applicant1DQRequestedCourt_requestHearingAtSpecificCourt_radio',
              options: {
                yes: 'Yes',
                no: 'No'
              }
            },
          },
          fields: {
            responseCourtLocations: {
              id: 'select[id$="Location_responseCourtLocations"]',
              options: {
                preferredCourt: 'Barnet Civil and Family Centre - ST MARY\'S COURT, REGENTS PARK ROAD - N3 1BQ'
              }
            },
            reasonForHearingAtSpecificCourt: '#reasonForHearingAtSpecificCourt'
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
              id: 'select[id$="Location_responseCourtLocations"]',
              options: {
                preferredCourt: 'Barnet Civil and Family Centre - ST MARY\'S COURT, REGENTS PARK ROAD - N3 1BQ'
              }
            },
            reasonForHearingAtSpecificCourt: '#reasonForHearingAtSpecificCourt'
          }
        };
      }
    }
  },

  async chooseCourt(mpScenario) {
    let isCourtListEnabled = await checkCourtLocationDynamicListIsEnabled();
    if (!isCourtListEnabled || !(['preview', 'demo'].includes(config.runningEnv))) {
      I.waitForElement(this.fields(mpScenario).oldFields.chooseCourtLocation.id);
      await I.runAccessibilityTest();
      await within(this.fields(mpScenario).oldFields.chooseCourtLocation.id, () => {
        I.click(this.fields(mpScenario).oldFields.chooseCourtLocation.options.no);
      });
    }
    else {
      I.waitForElement(this.fields(mpScenario).fields.courtLocation.id);
      await I.runAccessibilityTest();
      I.selectOption(this.fields(mpScenario).fields.courtLocation.id,
        this.fields.courtLocation.options.preferredCourt);
      I.fillField(this.fields(mpScenario).fields.reasonForHearingAtSpecificCourt, 'Some reason');
      await I.clickContinue();
    }
  }
};
