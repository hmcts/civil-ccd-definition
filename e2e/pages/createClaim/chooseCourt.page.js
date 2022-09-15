const {I} = inject();
const {checkCourtLocationDynamicListIsEnabled} = require('./../../api/testingSupport');
const config = require('./../../config');

module.exports = {
  oldFields:{
    courtLocation: '#courtLocation_applicantPreferredCourt'
  },
  fields: {
    courtLocation: {
      id: 'select[id$="Location_applicantPreferredCourtLocationList"]',
      options: {
        claimantPreferredCourt: 'Barnet Civil and Family Centre - ST MARY\'S COURT, REGENTS PARK ROAD - N3 1BQ'
      }
    }
  },

  async selectCourt() {
    let isCourtListEnabled = await checkCourtLocationDynamicListIsEnabled();
    if (!isCourtListEnabled || config.runningEnv === 'aat') {
      I.waitForElement(this.oldFields.courtLocation);
      await I.runAccessibilityTest();
      I.fillField(this.oldFields.courtLocation, '344');
      await I.clickContinue();
    } else {
      I.waitForElement(this.fields.courtLocation.id);
      await I.runAccessibilityTest();
      I.selectOption(this.fields.courtLocation.id, this.fields.courtLocation.options.claimantPreferredCourt);
      await I.clickContinue();
    }
  }
};
