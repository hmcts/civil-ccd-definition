const {I} = inject();

module.exports = {

  fields: {
    options: {
      nonAttendance: 'input[id*="NON_ATTENDANCE_STATEMENT"]',
      referredDocs: 'input[id*="REFERRED_DOCUMENTS"]',
    }
  },

  async selectDocumentType() {
    await I.waitForText('Select the type of document you want to upload', 10);
    await I.see('Mediation non-attendance');
    I.click(this.fields.options.nonAttendance);
    I.click(this.fields.options.referredDocs);
    await I.clickContinue();
  },
};
