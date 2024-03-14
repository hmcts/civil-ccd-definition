const {I} = inject();

module.exports = {

  async upload(file, documents) {
    await I.runAccessibilityTest();
    for (const fileType of documents) {
      I.click('Add new');
      await I.waitForElement(fileType + '_value');
      await I.attachFile(fileType + '_value', file);
      await I.waitForInvisible(locate('.error-message').withText('Uploading...'));
    }
  },
};

