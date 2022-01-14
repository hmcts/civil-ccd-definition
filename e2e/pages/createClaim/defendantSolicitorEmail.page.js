const {I} = inject();
const { respondentSolicitor1EmailAddress } = require('../../fixtures/events/createClaim.js').createClaim
  .valid.DefendantSolicitorEmail;

module.exports = {

  fields: respondentSolicitorNumber => {
    return {
      emailAddress: `#respondentSolicitor${respondentSolicitorNumber}EmailAddress`
    };
  },

  async enterSolicitorEmail(respondentSolicitorNumber) {
    I.waitForElement(this.fields(respondentSolicitorNumber).emailAddress);
    await I.runAccessibilityTest();
    I.fillField(this.fields(respondentSolicitorNumber).emailAddress, respondentSolicitor1EmailAddress);
    await I.clickContinue();
  },
};

