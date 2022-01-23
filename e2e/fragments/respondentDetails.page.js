const {I} = inject();

module.exports = {

  fields: {
      respondentDetails: '#respondentDetails',
  },

  async verifyDetails() {
    I.waitForElement(this.fields.respondentDetails);
    await I.runAccessibilityTest();
    await I.see('Example respondent1 company');
    await I.see('hmcts.civil+organisation.1.solicitor.1@gmail.com');

    await I.clickContinue();
  }
};

