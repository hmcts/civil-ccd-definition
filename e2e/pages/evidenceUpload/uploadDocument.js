const {I} = inject();
const config = require('../../config.js');

module.exports = {

  fields: {
    witnessSelectionEvidenceSmallClaim: {
      id: '#witnessSelectionEvidence',
      options: {
        witnessStatement: '#witnessSelectionEvidence-WITNESS_STATEMENT'
      }
    },

    expertSelectionEvidenceSmallClaim:{
      id: '#expertSelectionEvidence',
      options: {
        expertReport: '#expertSelectionEvidence-EXPERT_REPORT'
      }
    },

    trialSelectionEvidenceSmallClaim:{
      id: '#trialSelectionEvidence',
      options: {
        authorities: '#trialSelectionEvidence-AUTHORITIES'
      }
    },

    documentWitnessStatement:{
      id: '#documentWitnessStatement',
      button: '#documentWitnessStatement > div:nth-child(1) > button:nth-child(2)',
      name: '#documentWitnessStatement_0_witnessOptionName',
      day: '#witnessOptionUploadDate-day',
      month: '#witnessOptionUploadDate-month',
      year: '#witnessOptionUploadDate-year',
      document: '#documentWitnessStatement_0_witnessOptionDocument'
    },

    documentExpertReport:{
      id: '#documentExpertReport',
      button: '#documentExpertReport > div:nth-child(1) > button:nth-child(2)',
      name: '#documentExpertReport_0_expertOptionName',
      expertise: '#documentExpertReport_0_expertOptionExpertise',
      day: '#expertOptionUploadDate-day',
      month: '#expertOptionUploadDate-month',
      year: '#expertOptionUploadDate-year',
      document: '#documentExpertReport_0_expertDocument'
    },

    documentAuthorities:{
      id: '#documentAuthorities',
      button: '#documentAuthorities > div:nth-child(1) > button:nth-child(2)',
      document: '#documentAuthorities_0_documentUpload'
    }
  },

  async selectType(){
    await I.waitForText('Select the type of document you would like to upload');
    await within(this.fields.witnessSelectionEvidenceSmallClaim.id, () => {
      I.click(this.fields.witnessSelectionEvidenceSmallClaim.options.witnessStatement);
    });
    await within(this.fields.expertSelectionEvidenceSmallClaim.id, () => {
      I.click(this.fields.expertSelectionEvidenceSmallClaim.options.expertReport);
    });
    /*await within(this.fields.trialSelectionEvidenceSmallClaim.id, () => {
      I.click(this.fields.trialSelectionEvidenceSmallClaim.options.authorities);
    });*/
    await I.clickContinue();
  },

  async uploadYourDocument(file){
    await I.waitForText('Upload Your Documents');
    await within(this.fields.documentWitnessStatement.id, () => {
      I.click(this.fields.documentWitnessStatement.button);
      I.fillField(this.fields.documentWitnessStatement.name, 'test name');
      I.fillField(this.fields.documentWitnessStatement.day, '1');
      I.fillField(this.fields.documentWitnessStatement.month, '1');
      I.fillField(this.fields.documentWitnessStatement.year, '2022');
      I.attachFile(this.fields.documentWitnessStatement.document, file);
    });
    await within(this.fields.documentExpertReport.id, () => {
      I.click(this.fields.documentExpertReport.button);
      I.fillField(this.fields.documentExpertReport.name, 'test name');
      I.fillField(this.fields.documentExpertReport.expertise, 'test expertise');
      I.fillField(this.fields.documentExpertReport.day, '1');
      I.fillField(this.fields.documentExpertReport.month, '1');
      I.fillField(this.fields.documentExpertReport.year, '2022');
      I.attachFile(this.fields.documentExpertReport.document, file);
    });
    /*await within(this.fields.documentAuthorities.id, () => {
      I.click(this.fields.documentAuthorities.button);
      I.attachFile(this.fields.documentAuthorities.document, file);
    });*/
    await I.clickContinue();
  },

  async uploadADocument(caseId) {
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
    await I.waitForText('Summary');
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/trigger/EVIDENCE_UPLOAD_APPLICANT/EVIDENCE_UPLOAD_APPLICANTEvidenceUpload');
    await I.waitForText('Upload Your Documents');
    await I.click('Continue');
  }
};
