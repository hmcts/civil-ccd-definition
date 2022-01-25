const {I} = inject();

module.exports = {

  fields:  {
    respondent1Details: '#respondent1Details',
    respondent2Details: '#respondent2Details',
  },

  async verifyDetails(twoDefendants) {
    I.waitForElement(this.fields.respondent1Details);
    if (twoDefendants) {
      I.waitForElement(this.fields.respondent2Details);
    }
    await I.runAccessibilityTest();
    await I.see('Example respondent1 company');

    if (twoDefendants) {
      await I.see('Example respondent2 company');
    }

    await I.clickContinue();
  }
};

