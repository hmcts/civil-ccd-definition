const {I} = inject();

module.exports = {

  fields: {
    respondent1ClaimResponseType: {
      id: '#respondent1ClaimResponseType',
      options: {
        fullDefence: 'Reject all of the claim',
        fullAdmission: 'Admit all of the claim',
        partAdmission: 'Admit part of the claim',
        counterClaim: 'Reject all of the claim and wants to counterclaim'
      }
    }
  },

  async selectResponseType(responseType) {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.fields.respondent1ClaimResponseType.options.hasOwnProperty(responseType)) {
      throw new Error(`Response type: ${responseType} does not exist`);
    }
    I.waitForElement(this.fields.respondent1ClaimResponseType.id);
    await I.runAccessibilityTest();
    await within(this.fields.respondent1ClaimResponseType.id, () => {
      I.click(this.fields.respondent1ClaimResponseType.options[responseType]);
    });

    await I.clickContinue();
  }
};

