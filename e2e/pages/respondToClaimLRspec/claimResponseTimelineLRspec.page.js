const { I } = inject();

module.exports = {
  fields: {
    claimTimelineOption: {
      id: '#specClaimResponseTimelineList',
    },
  },

  async addManually() {
    I.waitForElement(this.fields.claimTimelineOption.id);
    await I.runAccessibilityTest();
    I.click('Add manually');
    await I.clickContinue();
  },
};
