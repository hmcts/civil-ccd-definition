const {I} = inject();

module.exports = {
  fields: function(mpScenario) {
    switch (mpScenario) {
      case 'ClaimantResponse': {
        return {
          // this needs to change
          chooseCourtLocation: {
            id: '#applicant1DQRequestedCourt_requestHearingAtSpecificCourt_radio',
            options: {
              yes: 'Yes',
              no: 'No'
            }
          },
        };
      }

      // done
      case 'DefendantResponse':
      default: {
        return {
          reasonForHearingAtSpecificCourt: `#respondToCourtLocation_reasonForHearingAtSpecificCourt`,
          responseCourtCode: `#respondToCourtLocation_responseCourtCode`,
        };
      }
    }
  },

  async chooseCourt(mpScenario) {

    // need to check if this is right
      I.waitForElement(this.fields(mpScenario).chooseCourtLocation.id);
      await I.runAccessibilityTest();
      await within(this.fields(mpScenario).chooseCourtLocation.id, () => {
      I.click(this.fields(mpScenario).chooseCourtLocation.options.no);
      });

      await I.clickContinue();
    }
  };
