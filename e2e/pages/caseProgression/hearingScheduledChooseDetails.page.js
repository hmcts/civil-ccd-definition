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
    selectChannel: {
          id: '#channel',
          options: {
            person: '#channel-IN_PERSON',
            video: '#channel-VIDEO',
            telephone: '#channel-TELEPHONE'
          }
     }
  },

  async selectCourt() {
      I.waitForElement(this.fields.courtLocation.id);
      await I.runAccessibilityTest();
      I.selectOption(this.fields.courtLocation.id, this.fields.courtLocation.options.preferredCourt);
     // await I.clickContinue();
  }

};
