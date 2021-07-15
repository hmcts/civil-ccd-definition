const { I } = inject();

module.exports = {
  fields: {
    claimAmount: {
      id: '#fieldset-case-data'
    },
  },

  async addClaimItem() {
    I.waitForElement(this.fields.claimAmount.id);
    await I.runAccessibilityTest();
    I.click('Add new');
    I.waitForElement('#claimAmountBreakup_0_claimReason');
    I.fillField('#claimAmountBreakup_0_claimReason', 'Test claim item details');
    I.fillField('#claimAmountBreakup_0_claimAmount', 1000);
    await I.clickContinue();
  },
};
