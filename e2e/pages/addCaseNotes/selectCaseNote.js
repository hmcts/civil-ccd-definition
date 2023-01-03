const {I} = inject();

module.exports = {
  async selectCaseNotes() {
    await I.runAccessibilityTest();
    await I.click("Document with a note");
    await I.clickContinue();
  }
};

