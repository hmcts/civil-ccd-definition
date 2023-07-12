const {I} = inject();
const config = require('./../../config');

module.exports = {
  fields: {
    courtLocation: {
      id: 'select[id$="courtLocation_applicantPreferredCourtLocationList"]',
      options: {
        claimantPreferredCourt: config.claimantSelectedCourt
      }
    }
  },

  async selectCourt() {
    I.waitForElement(this.fields.courtLocation.id);
    await I.runAccessibilityTest();
    I.selectOption(this.fields.courtLocation.id, this.fields.courtLocation.options.claimantPreferredCourt);
    I.waitForElement('input[id$="applicant1DQRemoteHearing_remoteHearingRequested_No"]');
    I.checkOption('input[id$="applicant1DQRemoteHearing_remoteHearingRequested_No"]');
    await I.clickContinue();
  }
};
