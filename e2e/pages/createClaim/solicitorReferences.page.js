const {I} = inject();
const { solicitorReferences } = require('../../fixtures/events/createClaim.js').createClaim.valid.References;

module.exports = {

  fields: {
    applicantReference: '#solicitorReferences_applicantSolicitor1Reference',
    respondentReference: '#solicitorReferences_respondentSolicitor1Reference',
  },

  async enterReferences() {
    I.waitForElement(this.fields.applicantReference);
    await I.runAccessibilityTest();
    I.fillField(this.fields.applicantReference, solicitorReferences.applicantSolicitor1Reference);
    I.fillField(this.fields.respondentReference, solicitorReferences.respondentSolicitor1Reference);
    await I.clickContinue();
  }
};

