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
    await within(this.fields.claimTimelineOption.id, () => {
       I.click('Add manually');
    });
    await I.clickContinue();
  },
};
