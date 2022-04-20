const {I} = inject();

module.exports = {

  fields: {
     chooseCourtLocation: {
          id: '#responseClaimCourtLocationRequired_radio',
          options: {
            yes: 'Yes',
            no: 'No',
          }
    },
    courtCode: '#respondToCourtLocation_responseCourtCode',
    reason: '#respondToCourtLocation_reasonForHearingAtSpecificCourt',
  },

  async chooseCourt(responseType) {
    I.waitForElement(this.fields.chooseCourtLocation.id);
    await I.runAccessibilityTest();
    await within(this.fields.chooseCourtLocation.id, () => {
    I.click(this.fields.chooseCourtLocation.options[responseType]);
    });

    I.waitForElement(this.fields.courtCode);
    await I.runAccessibilityTest();
    I.fillField(this.fields.courtCode, '344');
    I.fillField(this.fields.reason, 'nearest court');

    await I.clickContinue();
  }
};

