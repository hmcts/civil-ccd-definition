const {I} = inject();
const config = require('../../config.js');

module.exports = {

  fields: {
    witnessSelectionEvidence: {
      id: '#witnessSelectionEvidence',
      options: {
        witnessStatement: '#witnessSelectionEvidence-WITNESS_STATEMENT'
      }
    },

    witnessSelectionEvidenceSmallClaimRes: {
      id: '#witnessSelectionEvidenceSmallClaimRes',
      options: {
        witnessStatement: '#witnessSelectionEvidenceSmallClaimRes-WITNESS_STATEMENT'
      }
    },

    expertSelectionEvidence:{
      id: '#expertSelectionEvidence',
      options: {
        expertReport: '#expertSelectionEvidence-EXPERT_REPORT'
      }
    },

    expertSelectionEvidenceSmallClaimRes:{
      id: '#expertSelectionEvidenceSmallClaimRes',
      options: {
        expertReport: '#expertSelectionEvidenceSmallClaimRes-EXPERT_REPORT'
      }
    },

    trialSelectionEvidence:{
      id: '#trialSelectionEvidence',
      options: {
        authorities: '#trialSelectionEvidence-AUTHORITIES'
      }
    },

    trialSelectionEvidenceRes:{
      id: '#trialSelectionEvidenceSmallClaimRes',
      options: {
        authorities: '#trialSelectionEvidenceSmallClaimRes-AUTHORITIES'
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

    documentWitnessStatementRes:{
      id: '#documentWitnessStatementRes_0_0',
      button: '#documentWitnessStatementRes_0_0 > div:nth-child(1) > button:nth-child(2)',
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

  async selectType(defendant = false){
    if(defendant) {
      await within(this.fields.witnessSelectionEvidenceSmallClaimRes.id, () => {
        I.click(this.fields.witnessSelectionEvidenceSmallClaim.options.witnessStatement);
      });
      await within(this.fields.expertSelectionEvidenceSmallClaimRes.id, () => {
        I.click(this.fields.expertSelectionEvidenceSmallClaim.options.expertReport);
      });
      await within(this.fields.trialSelectionEvidenceSmallClaimRes.id, () => {
        I.click(this.fields.trialSelectionEvidenceSmallClaim.options.authorities);
      });
    }
    else {
      await within(this.fields.witnessSelectionEvidence.id, () => {
        I.click(this.fields.witnessSelectionEvidenceSmallClaim.options.witnessStatement);
      });
      await within(this.fields.expertSelectionEvidence.id, () => {
        I.click(this.fields.expertSelectionEvidenceSmallClaim.options.expertReport);
      });
      await within(this.fields.trialSelectionEvidence.id, () => {
        I.click(this.fields.trialSelectionEvidenceSmallClaim.options.authorities);
      });
    }
    await I.clickContinue();
  },

  async uploadYourDocument(file, defendant = false){
    await I.waitForText('Upload Your Documents');
    if(defendant) {
      await within(this.fields.documentWitnessStatementRes.id, () => {
        I.click(this.fields.documentWitnessStatementRes.button);
        I.fillField(this.fields.documentWitnessStatementRes.name, 'test name');
        I.fillField(this.fields.documentWitnessStatementRes.day, '1');
        I.fillField(this.fields.documentWitnessStatementRes.month, '1');
        I.fillField(this.fields.documentWitnessStatementRes.year, '2022');
        I.attachFile(this.fields.documentWitnessStatementRes.document, file);
      });
      await within(this.fields.documentExpertReportRes.id, () => {
        I.click(this.fields.documentExpertReportRes.button);
        I.fillField(this.fields.documentExpertReportRes.name, 'test name');
        I.fillField(this.fields.documentExpertReportRes.expertise, 'test expertise');
        I.fillField(this.fields.documentExpertReportRes.day, '1');
        I.fillField(this.fields.documentExpertReportRes.month, '1');
        I.fillField(this.fields.documentExpertReportRes.year, '2022');
        I.attachFile(this.fields.documentExpertReportRes.document, file);
      });
      await within(this.fields.documentAuthoritiesRes.id, () => {
        I.click(this.fields.documentAuthoritiesRes.button);
        I.attachFile(this.fields.documentAuthoritiesRes.document, file);
      });
    }
    else {
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
    }
    await I.clickContinue();
  },

  async uploadADocument(caseId, defendant = false) {
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
    await I.waitForText('Summary');
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + defendant ? '/trigger/EVIDENCE_UPLOAD_RESPONDENT/EVIDENCE_UPLOAD_RESPONDENTEvidenceUpload':'/trigger/EVIDENCE_UPLOAD_APPLICANT/EVIDENCE_UPLOAD_APPLICANTEvidenceUpload');
    await I.waitForText('Upload Your Documents');
    await I.click('Continue');
  }
};
