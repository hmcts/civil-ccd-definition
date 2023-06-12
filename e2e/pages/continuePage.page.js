const {I} = inject();

module.exports = {
  async continue() {
    await I.blockDomain();
    await I.runAccessibilityTest();
    await I.clickContinue();
  },
};
