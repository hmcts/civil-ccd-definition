const {I} = inject();

module.exports = {

  fields: {
    orgPolicyReference: '#applicant1OrganisationPolicy_OrgPolicyReference',
    searchText: '#search-org-text'
  },

  async enterOrganisationDetails() {
    I.waitForElement(this.fields.orgPolicyReference);
    I.fillField(this.fields.orgPolicyReference, 'Claimant policy reference');
    I.fillField(this.fields.searchText, 'Civil');
    I.click('a[title="Select the organisation Civil - Organisation 1"]');
    await I.clickContinue();
  }
};

