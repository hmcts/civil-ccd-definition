const {I} = inject();

module.exports = {

  fields: {
    searchText: '#search-org-text'
  },

  async enterOrganisationDetails() {
    I.waitForElement(this.fields.searchText);
    I.waitForText('Civil - Organisation 1');
    await I.runAccessibilityTest();
    await I.clickContinue();
  }
};

