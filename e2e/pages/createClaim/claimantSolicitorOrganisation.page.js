const {I} = inject();

module.exports = {

  fields: {
    searchText: '#search-org-text'
  },

  async enterOrganisationDetails() {
    I.waitForElement(this.fields.searchText);
    I.wait(10);
    await I.runAccessibilityTest();
    await I.clickContinue();
  }
};

