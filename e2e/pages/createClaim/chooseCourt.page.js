const {I} = inject();

module.exports = {

  fields: {
    courtLocation: {
      id: 'select[id$="Location_applicantPreferredCourtLocationList"]',
      options: {
        courtA: 'site_name 0000 - court address 0000 - AA0 0BB'
      }
    }
  },

  async selectCourt() {
    I.waitForElement(this.fields.courtLocation.id);
    await I.runAccessibilityTest();
    I.selectOption(this.fields.courtLocation.id, this.fields.courtLocation.options.courtA);
    await I.clickContinue();
  }
};
