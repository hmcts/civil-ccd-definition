const {I} = inject();

module.exports = {

  fields: {
    viewDetails: 'a[id^="link-view-details"]',
    cancelEle: 'a[id^="link-cancel"]',
    cancelOption: '#listerr',
  },

  async clickCancelHearing() {
    await I.seeElement(this.fields.cancelEle);
    await I.forceClick(this.fields.cancelEle);
    await I.waitForText('Are you sure you want to cancel this hearing?');
    await I.runAccessibilityTest();
    await I.forceClick(this.fields.cancelOption);
    await I.click('Continue');
  },

  async verifyHearingCancellation() {
    await I.waitForText('Current and upcoming');
    await I.runAccessibilityTest();
    await I.see('CANCELLATION REQUESTED');
    await I.dontSeeElement(this.fields.cancelEle);
    await I.click(this.fields.viewDetails);
    await I.waitForText('Cancellation requested');
  }
};
