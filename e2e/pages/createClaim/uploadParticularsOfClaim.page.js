const {I} = inject();

const servedDocuments = require('../../fragments/servedDocument');

module.exports = {

  fields: {
    servedDocumentFiles: {
      options: [
        '#servedDocumentFiles_particularsOfClaimDocument',
        '#servedDocumentFiles_scheduleOfLoss',
        '#servedDocumentFiles_certificateOfSuitability',
      ]
    }
  },

  async upload(file) {
    await servedDocuments.upload(file, this.fields.servedDocumentFiles.options);

    await I.clickContinue();
  },
};

