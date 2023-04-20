const {I} = inject();
const config = require('../../config.js');

module.exports = {

  fields: {
    witnessSelectionEvidence: {
      id: '#witnessSelectionEvidence',
      witnessStatement: '#witnessSelectionEvidence-WITNESS_STATEMENT'
    },

    witnessSelectionEvidenceRes: {
      id: '#witnessSelectionEvidenceRes',
      witnessStatement: '#witnessSelectionEvidenceRes-WITNESS_STATEMENT'
    },

    expertSelectionEvidence:{
      id: '#expertSelectionEvidence',
      expertReport: '#expertSelectionEvidence-EXPERT_REPORT'
    },

    expertSelectionEvidenceRes:{
      id: '#expertSelectionEvidenceRes',
      expertReport: '#expertSelectionEvidenceRes-EXPERT_REPORT'
    },

    trialSelectionEvidence:{
      id: '#trialSelectionEvidence',
      authorities: '#trialSelectionEvidence-AUTHORITIES'
    },

    trialSelectionEvidenceRes:{
      id: '#trialSelectionEvidenceRes',
      authorities: '#trialSelectionEvidenceRes-AUTHORITIES'
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

    documentWitnessStatementRes:{
      id: '#documentWitnessStatementRes',
      button: '#documentWitnessStatementRes > div:nth-child(1) > button:nth-child(2)',
      name: '#documentWitnessStatementRes_0_witnessOptionName',
      day: '#witnessOptionUploadDate-day',
      month: '#witnessOptionUploadDate-month',
      year: '#witnessOptionUploadDate-year',
      document: '#documentWitnessStatementRes_0_witnessOptionDocument'
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

    documentExpertReportRes:{
      id: '#documentExpertReportRes',
      button: '#documentExpertReportRes > div:nth-child(1) > button:nth-child(2)',
      name: '#documentExpertReportRes_0_expertOptionName',
      expertise: '#documentExpertReportRes_0_expertOptionExpertise',
      day: '#expertOptionUploadDate-day',
      month: '#expertOptionUploadDate-month',
      year: '#expertOptionUploadDate-year',
      document: '#documentExpertReportRes_0_expertDocument'
    },

    documentAuthorities:{
      id: '#documentAuthorities',
      button: '#documentAuthorities > div:nth-child(1) > button:nth-child(2)',
      document: '#documentAuthorities_0_documentUpload'
    },

    documentAuthoritiesRes:{
      id: '#documentAuthoritiesRes',
      button: '#documentAuthoritiesRes > div:nth-child(1) > button:nth-child(2)',
      document: '#documentAuthoritiesRes_0_documentUpload'
    }
  },

  async selectType(){
    await I.runAccessibilityTest();
    await within(this.fields.witnessSelectionEvidence.id, () => {
      I.waitForElement(this.fields.witnessSelectionEvidence.witnessStatement);
      I.click(this.fields.witnessSelectionEvidence.witnessStatement);
    });
    await within(this.fields.expertSelectionEvidence.id, () => {
      I.waitForElement(this.fields.expertSelectionEvidence.expertReport);
      I.click(this.fields.expertSelectionEvidence.expertReport);
    });
    await within(this.fields.trialSelectionEvidence.id, () => {
      I.waitForElement(this.fields.trialSelectionEvidence.authorities);
      I.click(this.fields.trialSelectionEvidence.authorities);
    });

    await I.clickContinue();
  },

  async uploadYourDocument(file){
    await I.waitForText('Upload Your Documents');
    await I.runAccessibilityTest();
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
    await within(this.fields.documentAuthorities.id, () => {
      I.click(this.fields.documentAuthorities.button);
      I.attachFile(this.fields.documentAuthorities.document, file);
    });

    await I.clickContinue();
  },

  async uploadADocument(caseId) {
    await I.runAccessibilityTest();
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
    await I.waitForText('Summary');

    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/trigger/EVIDENCE_UPLOAD_APPLICANT/EVIDENCE_UPLOAD_APPLICANTEvidenceUpload');

    await I.waitForText('Upload Your Documents');
    await I.clickContinue();
  }
};
