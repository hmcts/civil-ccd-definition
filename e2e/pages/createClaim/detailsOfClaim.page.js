const {I} = inject();

module.exports = {

  fields: {
    detailsOfClaim: '#detailsOfClaim'
  },

  async enterDetailsOfClaim(mpScenario) {
    I.waitForElement(this.fields.detailsOfClaim);
    await I.runAccessibilityTest();
    I.fillField(this.fields.detailsOfClaim, mpScenario);
    await I.clickContinue();
  }
};

