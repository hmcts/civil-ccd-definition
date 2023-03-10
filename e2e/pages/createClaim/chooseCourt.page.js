const {I} = inject();
const {checkCourtLocationDynamicListIsEnabled} = require('./../../api/testingSupport');
const config = require('./../../config');

module.exports = {
  oldFields:{
    courtLocation: '#courtLocation_applicantPreferredCourt'
  },
  fields: {
    courtLocation: {
      id: 'select[id$="courtLocation_applicantPreferredCourtLocationList"]',
      options: {
        claimantPreferredCourt: config.claimantSelectedCourt
      }
    }
  },

  async selectCourt() {
    let isCourtListEnabled = await checkCourtLocationDynamicListIsEnabled();
    if (!isCourtListEnabled) {
      I.waitForElement(this.oldFields.courtLocation);
      await I.runAccessibilityTest();
      I.fillField(this.oldFields.courtLocation, '344');
      await I.clickContinue();
    } else {
      I.waitForElement(this.fields.courtLocation.id);
      await I.runAccessibilityTest();

      I.click(this.fields.courtLocation.id);
      let courtLocationOption = locate('select').withAttr({ id: this.fields.courtLocation.id }).find('option').withText(this.fields.courtLocation.options.claimantPreferredCourt);
      I.click(courtLocationOption);

      await I.clickContinue();
    }
  }
};
