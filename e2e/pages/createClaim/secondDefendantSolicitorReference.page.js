const { I } = inject();
const { OrgPolicyReference: defendantPolicyReference } = require('../../fixtures/events/createClaim.js').createClaim
  .valid.DefendantSolicitorOrganisation.respondent1OrganisationPolicy;

module.exports = {

  fields: {
    reference: '#respondentSolicitor2Reference'
  },

  async enterReference() {
    I.waitForElement(this.fields.reference);
    await I.runAccessibilityTest();
    I.fillField(this.fields.reference, defendantPolicyReference);
    await I.clickContinue();
  },
};

