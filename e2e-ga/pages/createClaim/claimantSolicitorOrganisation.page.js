const {I} = inject();

module.exports = {

  fields: {
    orgPolicyReference: '#applicant1OrganisationPolicy_OrgPolicyReference',
    searchText: '#search-org-text'
  },

  async enterOrganisationDetails() {
    I.waitForElement(this.fields.orgPolicyReference);
    await I.runAccessibilityTest();
    I.fillField(this.fields.orgPolicyReference, 'Claimant policy reference');
    I.waitForElement(this.fields.searchText);
    await I.clickContinue();
  }
};

