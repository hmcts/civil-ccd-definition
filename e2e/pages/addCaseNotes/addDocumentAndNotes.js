const { I } = inject();

module.exports = {

  async uploadResponseDocuments (file) {
    await I.runAccessibilityTest();
    await I.click("Add new");
    await I.fillField("#documentAndNote_0_documentName", "Doc 1");
    await I.fillField("#documentAndNote_0_documentNote", "Test Note");
    await I.attachFile("#documentAndNote_0_document", file);
    await I.clickContinue();
  },
};

