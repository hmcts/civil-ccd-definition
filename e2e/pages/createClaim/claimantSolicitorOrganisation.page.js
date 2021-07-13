const {I} = inject();

module.exports = {

  fields: {
    searchText: '#search-org-text'
  },

  async enterOrganisationDetails() {
    I.waitForElement(this.fields.searchText);
    await I.runAccessibilityTest();
    await I.clickContinue();
  }
};

