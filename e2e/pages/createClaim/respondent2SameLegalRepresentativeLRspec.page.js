const {I} = inject();

module.exports = {

  fields: {
    respondent2SameLegalRepresentative: {
      id: '#specRespondent2Represented',
      options: {
        yes: 'Yes',
        no: 'No'
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

