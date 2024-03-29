const {I} = inject();

module.exports = {

  fields: {
    respondent2SameLegalRepresentative: {
      id: '#respondent2SameLegalRepresentative',
      options: {
        yes: '#respondent2SameLegalRepresentative_Yes',
        no: '#respondent2SameLegalRepresentative_No'
      }
    },
  },

  async enterRespondent2SameLegalRepresentative(sameLegalRepresentative = false) {
    I.waitForElement(this.fields.respondent2SameLegalRepresentative.id);
    await I.runAccessibilityTest();
    await within(this.fields.respondent2SameLegalRepresentative.id, () => {
      const { yes, no } = this.fields.respondent2SameLegalRepresentative.options;
      I.click(sameLegalRepresentative ? yes : no);
    });

    await I.clickContinue();
  }
};

