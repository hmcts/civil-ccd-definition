const {I} = inject();
const {checkCourtLocationDynamicListIsEnabled} = require('./../../api/testingSupport');
const config = require('./../../config');

module.exports = {
  fields: {
    courtLocation: {
      id: 'select[id$="hearingLocation"]',
      options: {
        preferredCourt: config.claimantSelectedCourt
      }
    }
  },

  async selectCourt() {
      I.waitForElement(this.fields.courtLocation.id);
      await I.runAccessibilityTest();
      I.selectOption(this.fields.courtLocation.id, this.fields.courtLocation.options.preferredCourt);
      await I.clickContinue();
  }

};
