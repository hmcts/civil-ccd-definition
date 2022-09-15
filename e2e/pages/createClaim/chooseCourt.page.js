const {I} = inject();

module.exports = {

  fields: {
    courtLocation: {
      id: 'select[id$="Location_applicantPreferredCourtLocationList"]',
      options: {
        claimantPreferredCourt: 'Barnet Civil and Family Centre - ST MARY\'S COURT, REGENTS PARK ROAD - N3 1BQ'
      }
    }
  },

  async selectCourt() {
    I.waitForElement(this.fields.courtLocation.id);
    await I.runAccessibilityTest();
    I.selectOption(this.fields.courtLocation.id, this.fields.courtLocation.options.claimantPreferredCourt);
    await I.clickContinue();
  }
};
