const {I} = inject();

module.exports = {

  fields: (respondentNumber = '') => {
    return {
      respondentDetails: `#respondent${respondentNumber}Details`
    }
  },

  async verifyDetails(respondentNumber) {
    I.waitForElement(this.fields(respondentNumber).respondentDetails);
    await I.runAccessibilityTest();
    await I.see('Example respondent1 company');

    await I.clickContinue();
  }
};

