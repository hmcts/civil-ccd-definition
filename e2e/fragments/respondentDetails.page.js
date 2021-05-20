const {I} = inject();

module.exports = {

  fields: {
    respondentDetails: {
      id: '#respondentDetails'
    }
  },

  async verifyDetails() {
    I.waitForElement(this.fields.respondentDetails.id);
    await I.runAccessibilityTest();
    await I.see('Example company');

    await I.clickContinue();
  }
};

