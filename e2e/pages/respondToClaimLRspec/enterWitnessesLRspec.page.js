const {I} = inject();
module.exports = {
  fields: function(mpScenario) {
    switch (mpScenario) {
      case 'ClaimantResponse': {
        return {
          noOfWitnesses: {
            id: '#applicant1DQWitnessesSmallClaim_witnessesToAppear',
            options: {
              yes: '#applicant1DQWitnessesSmallClaim_witnessesToAppear_Yes',
              no: '#applicant1DQWitnessesSmallClaim_witnessesToAppear_No'
            },
          },
          noOfWitnessesTextField: {
            id: '#applicant1ClaimWitnesses'
          }
        };
      }

      case 'DefendantResponse':
      default: {
        return {
          noOfWitnesses: {
            id: '#respondent1DQWitnessesSmallClaim_witnessesToAppear',
            options: {
              yes: '#respondent1DQWitnessesSmallClaim_witnessesToAppear_Yes',
              no: '#respondent1DQWitnessesSmallClaim_witnessesToAppear_No'
            },
          }
        };
      }
    }
  },


 async howManyWitnesses(mpScenario) {
    I.waitForElement(this.fields(mpScenario).noOfWitnesses.id);
    await I.runAccessibilityTest();
    await I.click(this.fields(mpScenario).noOfWitnesses.options.no);
    if(mpScenario === 'ClaimantResponse') {
      I.fillField(this.fields(mpScenario).noOfWitnessesTextField.id, '0');
    }
    await I.clickContinue();
  }
};