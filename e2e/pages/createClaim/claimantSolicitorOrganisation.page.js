const {I} = inject();

module.exports = {

  fields: {
    searchText: '#search-org-text',
    selectedOrg: '#organisation-selected-table'
  },

  async enterOrganisationDetails() {
    I.waitForElement(this.fields.selectedOrg);
    await I.runAccessibilityTest();
    await I.clickContinue();
  }
};

