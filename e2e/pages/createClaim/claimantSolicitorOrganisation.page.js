const {I} = inject();
const { applicant1OrganisationPolicy } = require('../../fixtures/events/createClaim.js').createClaim.valid
  .ClaimantSolicitorOrganisation;

module.exports = {

  fields: {
    orgPolicyReference: '#applicant1OrganisationPolicy_OrgPolicyReference',
    searchText: '#search-org-text'
  },

  async enterOrganisationDetails() {
    I.waitForElement(this.fields.orgPolicyReference);
    await I.runAccessibilityTest();
    I.fillField(this.fields.orgPolicyReference, applicant1OrganisationPolicy.OrgPolicyReference);
    I.waitForElement(this.fields.searchText);
    await I.clickContinue();
  }
};

