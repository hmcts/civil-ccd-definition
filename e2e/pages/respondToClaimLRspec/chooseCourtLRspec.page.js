const {I} = inject();

module.exports = {
  fields: function(mpScenario) {
    switch (mpScenario) {
      case 'ClaimantResponse': {
        return {
          chooseCourtLocation: {
            id: '#applicant1DQRequestedCourt_requestHearingAtSpecificCourt_radio',
            options: {
              yes: 'Yes',
              no: 'No'
            }
          },
        };
      }

      case 'DefendantResponse':
      default: {
        return {
          chooseCourtLocation: {
            id: '#responseClaimCourtLocationRequired_radio',
            options: {
              yes: 'Yes',
              no: 'No'
            }
          }
        };
      }
    }
  },

  async chooseCourt(mpScenario) {

      I.waitForElement(this.fields(mpScenario).chooseCourtLocation.id);
      await I.runAccessibilityTest();
      await within(this.fields(mpScenario).chooseCourtLocation.id, () => {
      I.click(this.fields(mpScenario).chooseCourtLocation.options.no);
      });

      await I.clickContinue();
    }
  };
