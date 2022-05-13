const {I} = inject();
module.exports = {
  fields: function(mpScenario) {
    switch (mpScenario) {
      case 'ClaimantResponse': {
        return {
          noOfWitnesses: {
            id: '#applicant1ClaimWitnesses',

          },
        };
      }

      case 'DefendantResponse':
      default: {
        return {
          noOfWitnesses: {
            id: '#responseClaimWitnesses',

          }
        };
      }
    }
  },


 async howManyWitnesses(mpScenario) {

    I.waitForElement(this.fields(mpScenario).noOfWitnesses.id);
    await I.runAccessibilityTest();
    await I.fillField(this.fields(mpScenario).noOfWitnesses.id,2);
    await I.clickContinue();
  }
};