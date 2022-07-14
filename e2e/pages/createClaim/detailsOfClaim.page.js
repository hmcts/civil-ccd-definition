const {I} = inject();

module.exports = {

  fields: {
    detailsOfClaim: '#detailsOfClaim'
  },

  async enterDetailsOfClaim(details) {
      I.waitForElement(this.fields.detailsOfClaim);
      await I.runAccessibilityTest();
      I.fillField(this.fields.detailsOfClaim, details);
      await I.clickContinue();
    }
};

