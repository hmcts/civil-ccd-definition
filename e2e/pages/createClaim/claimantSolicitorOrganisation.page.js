const {I} = inject();

module.exports = {

  fields: {
    orgPolicyReference: '#applicant1OrganisationPolicy_OrgPolicyReference',
    searchText: '#search-org-text'
  },

  async enterOrganisationDetails() {
    I.waitForElement(this.fields.orgPolicyReference);
    await I.runAccessibilityTest();
    await I.clickContinue();
  }
};

