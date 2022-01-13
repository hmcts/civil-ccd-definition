const {I} = inject();
const { courtLocation } = require('../../fixtures/events/createClaim.js').createClaim.valid.Court;

module.exports = {

  fields: {
    courtLocation: '#courtLocation_applicantPreferredCourt'
  },

  async enterCourt() {
    I.waitForElement(this.fields.courtLocation);
    await I.runAccessibilityTest();
    I.fillField(this.fields.courtLocation, courtLocation.applicantPreferredCourt);
    await I.clickContinue();
  }
};

