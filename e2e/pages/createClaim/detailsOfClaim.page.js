const {I} = inject();

module.exports = {

  fields: {
    detailsOfClaim: '#detailsOfClaim'
  },

  async enterDetailsOfClaim(mpScenario) {
      await I.blockDomain();
      I.waitForElement(this.fields.detailsOfClaim);
      await I.runAccessibilityTest();
      let details = (typeof mpScenario !== 'undefined') ? mpScenario : 'Details of the claim text';
      I.fillField(this.fields.detailsOfClaim, details);
      await I.clickContinue();
    }
};

