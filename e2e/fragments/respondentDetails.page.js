const {I} = inject();

module.exports = {

  fields:  {
    respondent1Details: '#respondent1Details',
    respondent2Details: '#respondent2Details',
  },

  async verifyDetails() {
    I.waitForElement(this.fields.respondent1Details);

    //ToDo: Uncomment when respondent2Details field has been implemented
    // if (twoDefendants) {
    //   I.waitForElement(this.fields.respondent2Details);
    // }
    await I.runAccessibilityTest();
    await I.see('Example respondent1 company');

    //ToDo: Uncomment when respondent2Details field has been implemented
    // if (twoDefendants) {
    //   await I.see('Example respondent2 company');
    // }

    await I.clickContinue();
  }
};

