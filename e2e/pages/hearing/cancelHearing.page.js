const {I} = inject();

module.exports = {

  fields: {
    viewDetails: 'a[id^="link-view-details"]',
    cancelEle: 'a[id^="link-cancel"]',
    cancelOption: '#listerr',
    cancellationRequestedText: 'Cancellation requested',
  },

  async clickCancelHearing() {
    await I.waitForElement(this.fields.cancelEle);
    await I.clickHearingHyperLinkOrButton(this.fields.cancelEle);
    await I.waitForText('Are you sure you want to cancel this hearing?');
    await I.runAccessibilityTest();
    await I.forceClick(this.fields.cancelOption);
    await I.clickContinue();
  },

  async verifyHearingCancellation() {
    await I.waitForText('Current and upcoming');
    await I.runAccessibilityTest();
    await I.see(this.fields.cancellationRequestedText.toUpperCase());
    await I.dontSeeElement(this.fields.cancelEle);
    await I.click(this.fields.viewDetails);
    await I.waitForText(this.fields.cancellationRequestedText);
  }
};
