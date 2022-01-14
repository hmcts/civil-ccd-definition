const {I} = inject();
const { detailsOfClaim } = require('../../fixtures/events/createClaim.js').createClaim
  .valid.Details;

module.exports = {

  fields: {
    detailsOfClaim: '#detailsOfClaim'
  },

  async enterDetailsOfClaim() {
    I.waitForElement(this.fields.detailsOfClaim);
    await I.runAccessibilityTest();
    I.fillField(this.fields.detailsOfClaim, detailsOfClaim);
    await I.clickContinue();
  }
};

