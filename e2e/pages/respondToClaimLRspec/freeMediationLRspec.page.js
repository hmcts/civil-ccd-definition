const {I} = inject();
module.exports = {
  fields: function(mpScenario) {
    switch (mpScenario) {
      case 'ClaimantResponse': {
        return {
          mediationType: {
            id: '#applicant1ClaimMediationSpecRequired_hasAgreedFreeMediation_radio',
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
          mediationType: {
            id: '#responseClaimMediationSpecRequired_radio',
            options: {
              yes: 'Yes',
              no: 'No'
            }
          }
        };
      }
    }
  },


 async selectMediation(mpScenario) {

    I.waitForElement(this.fields(mpScenario).mediationType.id);
    await I.runAccessibilityTest();
    await within(this.fields(mpScenario).mediationType.id, () => {
    I.click(this.fields(mpScenario).mediationType.options.yes);
    });

    await I.clickContinue();
  }
};
