const {I} = inject();

module.exports = {

  fields: {
      respondentDetails: '#respondent1Details',
  },

  async verifyDetails() {
    I.waitForElement(this.fields.respondentDetails);
    await I.runAccessibilityTest();
    await I.see('Example respondent1 company');

    await I.clickContinue();
  }
};

