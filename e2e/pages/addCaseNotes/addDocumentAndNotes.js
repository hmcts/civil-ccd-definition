const { I } = inject();

module.exports = {

  async uploadResponseDocuments (file) {
    await I.runAccessibilityTest();
    await I.click("Add New");
    await I.fillField("#documentID", "Doc 1");
    await I.fillField("#testNote", "Test Note");
    await I.attachFile("#FileID", file);
    await I.clickContinue();
  },
};

