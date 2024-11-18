const { I } = inject();

module.exports = {

  fields: {
    uploadQuestion: {
      id: '#uploadParticularsOfClaim',
      options: {
        yes: '#uploadParticularsOfClaim_Yes',
        no: '#uploadParticularsOfClaim_No'
      }
    },
  },

  async chooseUploadParticularsOfClaim(yesOrNo) {
    console.log('Available options:' + yesOrNo);
    I.waitForElement(this.fields.uploadQuestion.id);
    await I.runAccessibilityTest();
    await within(this.fields.uploadQuestion.id, () => {
      console.log('Available locator:' + this.fields.uploadQuestion.options[yesOrNo]);
      I.click(this.fields.uploadQuestion.options[yesOrNo]);
    });
    await I.clickContinue();
  },
};

