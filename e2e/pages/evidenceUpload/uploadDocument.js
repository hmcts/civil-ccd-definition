const {I} = inject();
const config = require('../../config.js');
const {incrementDate, decrementDate} = require('../../api/dataHelper.js');

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

    bundles: {
      id: '#bundleSelectionEvidence',
      bundleCheckBox: '#bundleSelectionEvidence-BUNDLE_UPLOAD'
    },

    expertSelectionEvidence: {
      id: '#expertSelectionEvidence',
      expertReport: '#expertSelectionEvidence-EXPERT_REPORT'
    },

    expertSelectionEvidenceRes: {
      id: '#expertSelectionEvidenceRes',
      expertReport: '#expertSelectionEvidenceRes-EXPERT_REPORT'
    },

    trialSelectionEvidence: {
      id: '#trialSelectionEvidence',
      authorities: '#trialSelectionEvidence-AUTHORITIES'
    },

    trialSelectionEvidenceRes: {
      id: '#trialSelectionEvidenceRes',
      authorities: '#trialSelectionEvidenceRes-AUTHORITIES'
    },

    withoutPrejudiceSelectionEvidence:{
      id: '#withoutPrejudiceSelectionEvidence',
      withoutPrejudice: '#withoutPrejudiceSelectionEvidence-PART36_REJECTION'
    },

    withoutPrejudiceSelectionEvidenceRes:{
      id: '#withoutPrejudiceSelectionEvidenceRes',
      withoutPrejudice: '#withoutPrejudiceSelectionEvidenceRes-PART36_REJECTION'
    },

    documentWitnessStatement: {
      id: '#documentWitnessStatement',
      button: '#documentWitnessStatement > div:nth-child(1) > button:nth-child(2)',
      name: '#documentWitnessStatement_0_witnessOptionName',
      day: '#witnessOptionUploadDate-day',
      month: '#witnessOptionUploadDate-month',
      year: '#witnessOptionUploadDate-year',
      document: '#documentWitnessStatement_0_witnessOptionDocument'
    },

    documentWitnessStatementRes: {
      id: '#documentWitnessStatementRes',
      button: '#documentWitnessStatementRes > div:nth-child(1) > button:nth-child(2)',
      name: '#documentWitnessStatementRes_0_witnessOptionName',
      day: '#witnessOptionUploadDate-day',
      month: '#witnessOptionUploadDate-month',
      year: '#witnessOptionUploadDate-year',
      document: '#documentWitnessStatementRes_0_witnessOptionDocument'
    },

    bundleForm: {
      id: '#bundleEvidence',
      addNewButton: '#bundleEvidence button',
      name: '#bundleEvidence_0_bundleName',
      day: '#documentIssuedDate-day',
      month: '#documentIssuedDate-month',
      year: '#documentIssuedDate-year',
      document: '#bundleEvidence_0_documentUpload'
    },

    bundleForm2: {
      id: '#bundleEvidence',
      addNewButton: '#bundleEvidence button',
      name: '#bundleEvidence_1_bundleName',
      day: '#documentIssuedDate-day',
      month: '#documentIssuedDate-month',
      year: '#documentIssuedDate-year',
      document: '#bundleEvidence_1_documentUpload'
    },

    documentExpertReport: {
      id: '#documentExpertReport',
      button: '#documentExpertReport > div:nth-child(1) > button:nth-child(2)',
      name: '#documentExpertReport_0_expertOptionName',
      expertise: '#documentExpertReport_0_expertOptionExpertise',
      day: '#expertOptionUploadDate-day',
      month: '#expertOptionUploadDate-month',
      year: '#expertOptionUploadDate-year',
      document: '#documentExpertReport_0_expertDocument'
    },

    documentExpertReportRes: {
      id: '#documentExpertReportRes',
      button: '#documentExpertReportRes > div:nth-child(1) > button:nth-child(2)',
      name: '#documentExpertReportRes_0_expertOptionName',
      expertise: '#documentExpertReportRes_0_expertOptionExpertise',
      day: '#expertOptionUploadDate-day',
      month: '#expertOptionUploadDate-month',
      year: '#expertOptionUploadDate-year',
      document: '#documentExpertReportRes_0_expertDocument'
    },

    documentAuthorities: {
      id: '#documentAuthorities',
      button: '#documentAuthorities > div:nth-child(1) > button:nth-child(2)',
      document: '#documentAuthorities_0_documentUpload'
    },

    documentAuthoritiesRes: {
      id: '#documentAuthoritiesRes',
      button: '#documentAuthoritiesRes > div:nth-child(1) > button:nth-child(2)',
      document: '#documentAuthoritiesRes_0_documentUpload'
    },

    documentPart36Rejection: {
      id: '#documentPart36Rejection',
      button: '#documentPart36Rejection > div:nth-child(1) > button:nth-child(2)',
      name: '#documentPart36Rejection_0_documentDescription',
      document: '#documentPart36Rejection_0_document'
    },

    documentPart36RejectionRes: {
      id: '#documentPart36RejectionRes',
      button: '#documentPart36RejectionRes > div:nth-child(1) > button:nth-child(2)',
      name: '#documentPart36RejectionRes_0_documentDescription',
      document: '#documentPart36RejectionRes_0_document'
    }
  },

  async selectType(defendant, isBundle = false, mpScenario = false, scenario = '', typeOfDoc = '') {
    if (mpScenario) {
      await I.waitForElement('#evidenceUploadOptions', 10);
      if (scenario === 'ONE_V_TWO_ONE_LEGAL_REP') {
        await I.checkOption('Defendant 1 and 2');
      } else if (scenario === 'ONE_V_TWO_TWO_LEGAL_REP') {
        await I.checkOption('Defendant 2 - Dr Foo Bar');
      } else {
        throw new Error('Invalid scenario provided for mpScenario');
      }
      await I.clickContinue();
    }
      // Existing logic remains unchanged
      if (defendant) {
        if (isBundle) {
          // Bundle-specific actions for defendant
          await within(this.fields.bundles.id, () => {
            I.click(this.fields.bundles.bundleCheckBox);
          });
        } else {
          // Original actions for defendant
          await within(this.fields.witnessSelectionEvidenceRes.id, () => {
            I.click(this.fields.witnessSelectionEvidenceRes.witnessStatement);
          });
          await within(this.fields.expertSelectionEvidenceRes.id, () => {
            I.click(this.fields.expertSelectionEvidenceRes.expertReport);
          });
          await within(this.fields.trialSelectionEvidenceRes.id, () => {
            I.click(this.fields.trialSelectionEvidenceRes.authorities);
          });
          if(typeOfDoc === 'part36'){
            await within(this.fields.withoutPrejudiceSelectionEvidence.id, () => {
              I.click(this.fields.withoutPrejudiceSelectionEvidence.withoutPrejudice);
            });
          }
        }
      } else {
        if (isBundle) {
          // Bundle-specific actions for claimant
          await within(this.fields.bundles.id, () => {
            I.click(this.fields.bundles.bundleCheckBox);
          });
        } else {
          // Original actions for claimant
          await within(this.fields.witnessSelectionEvidence.id, () => {
            I.click(this.fields.witnessSelectionEvidence.witnessStatement);
          });
          await within(this.fields.expertSelectionEvidence.id, () => {
            I.click(this.fields.expertSelectionEvidence.expertReport);
          });
          await within(this.fields.trialSelectionEvidence.id, () => {
            I.click(this.fields.trialSelectionEvidence.authorities);
          });
          if(typeOfDoc === 'part36'){
            await within(this.fields.withoutPrejudiceSelectionEvidence.id, () => {
              I.click(this.fields.withoutPrejudiceSelectionEvidence.withoutPrejudice);
            });
          }
        }
      }
    await I.clickContinue();
  },

  async uploadYourDocument(file, defendant, isBundle = false, mpScenario = false, typeOfDoc = '') {
    const futureDate = incrementDate(new Date(), 0, 1, 0);
    const pastDate = decrementDate(new Date(), 0, 0, 1);
    await I.waitForText('Upload Your Documents');
    if (defendant) {
      if (isBundle) {
        // Bundle-specific actions for defendant
        await within(this.fields.bundleForm.id, () => {
          I.click(this.fields.bundleForm.addNewButton);
          if (mpScenario) {
            I.fillField(this.fields.bundleForm2.name, 'Test bundle name 1');
            I.fillField(this.fields.bundleForm2.day, futureDate.getDate());
            I.fillField(this.fields.bundleForm2.month, futureDate.getMonth() + 1);
            I.fillField(this.fields.bundleForm2.year, futureDate.getFullYear());
            I.attachFile(this.fields.bundleForm2.document, file);
          } else {
            I.fillField(this.fields.bundleForm.name, 'Test bundle name');
            I.fillField(this.fields.bundleForm.day, futureDate.getDate());
            I.fillField(this.fields.bundleForm.month, futureDate.getMonth() + 1);
            I.fillField(this.fields.bundleForm.year, futureDate.getFullYear());
            I.attachFile(this.fields.bundleForm.document, file);
          }
        });
        // Add any additional bundle-specific actions here
      } else {
        // Original actions for defendant
        await within(this.fields.documentWitnessStatementRes.id, () => {
          I.click(this.fields.documentWitnessStatementRes.button);
          I.fillField(this.fields.documentWitnessStatementRes.name, 'test name');
          I.fillField(this.fields.documentWitnessStatementRes.day, pastDate.getDate());
          I.fillField(this.fields.documentWitnessStatementRes.month, pastDate.getMonth() + 1);
          I.fillField(this.fields.documentWitnessStatementRes.year, pastDate.getFullYear());
          I.attachFile(this.fields.documentWitnessStatementRes.document, file);
        });
        await within(this.fields.documentExpertReportRes.id, () => {
          I.wait(6); // Wait to avoid rate limiting issues
          I.click(this.fields.documentExpertReportRes.button);
          I.fillField(this.fields.documentExpertReportRes.name, 'test name');
          I.fillField(this.fields.documentExpertReportRes.expertise, 'test expertise');
          I.fillField(this.fields.documentExpertReportRes.day, pastDate.getDate());
          I.fillField(this.fields.documentExpertReportRes.month, pastDate.getMonth() + 1);
          I.fillField(this.fields.documentExpertReportRes.year, pastDate.getFullYear());
          I.attachFile(this.fields.documentExpertReportRes.document, file);
        });
        await within(this.fields.documentAuthoritiesRes.id, () => {
          I.wait(6); // Wait to avoid rate limiting issues
          I.click(this.fields.documentAuthoritiesRes.button);
          I.attachFile(this.fields.documentAuthoritiesRes.document, file);
        });
        if(typeOfDoc === 'part36'){
          await within(this.fields.documentPart36RejectionRes.id, () => {
            I.wait(6); // Wait to avoid rate limiting issues
            I.click(this.fields.documentPart36RejectionRes.button);
            I.fillField(this.fields.documentPart36RejectionRes.name, 'test part36 name');
            I.attachFile(this.fields.documentPart36RejectionRes.document, file);
          });
        }
      }
    } else {
      if (isBundle) {
        // Bundle-specific actions for claimant
        await within(this.fields.bundleForm.id, () => {
          I.click(this.fields.bundleForm.addNewButton);
          I.fillField(this.fields.bundleForm.name, 'Test bundle name');
          I.fillField(this.fields.bundleForm.day, futureDate.getDate());
          I.fillField(this.fields.bundleForm.month, futureDate.getMonth() + 1);
          I.fillField(this.fields.bundleForm.year, futureDate.getFullYear());
          I.attachFile(this.fields.bundleForm.document, file);
        });
        // Add any additional bundle-specific actions here
      } else {
        // Original actions for claimant
        await within(this.fields.documentWitnessStatement.id, () => {
          I.click(this.fields.documentWitnessStatement.button);
          I.fillField(this.fields.documentWitnessStatement.name, 'test name');
          I.fillField(this.fields.documentWitnessStatement.day, pastDate.getDate());
          I.fillField(this.fields.documentWitnessStatement.month, pastDate.getMonth() + 1);
          I.fillField(this.fields.documentWitnessStatement.year, pastDate.getFullYear());
          I.attachFile(this.fields.documentWitnessStatement.document, file);
        });
        await within(this.fields.documentExpertReport.id, () => {
          I.wait(6); // Wait to avoid rate limiting issues
          I.click(this.fields.documentExpertReport.button);
          I.fillField(this.fields.documentExpertReport.name, 'test name');
          I.fillField(this.fields.documentExpertReport.expertise, 'test expertise');
          I.fillField(this.fields.documentExpertReport.day, pastDate.getDate());
          I.fillField(this.fields.documentExpertReport.month, pastDate.getMonth() + 1);
          I.fillField(this.fields.documentExpertReport.year, pastDate.getFullYear());
          I.attachFile(this.fields.documentExpertReport.document, file);
        });
        await within(this.fields.documentAuthorities.id, () => {
          I.wait(6); // Wait to avoid rate limiting issues
          I.click(this.fields.documentAuthorities.button);
          I.attachFile(this.fields.documentAuthorities.document, file);
        });
        if(typeOfDoc === 'part36'){
          await within(this.fields.documentPart36Rejection.id, () => {
            I.wait(6); // Wait to avoid rate limiting issues
            I.click(this.fields.documentPart36Rejection.button);
            I.fillField(this.fields.documentPart36Rejection.name, 'test part36 name');
            I.attachFile(this.fields.documentPart36Rejection.document, file);
          });
        }
      }
    }
    await I.clickContinue();
  },

  async uploadADocument(caseId, defendant) {
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
    await I.waitForText('Summary');
    if (defendant) {
      await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/trigger/EVIDENCE_UPLOAD_RESPONDENT/EVIDENCE_UPLOAD_RESPONDENT');
    } else {
      await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/trigger/EVIDENCE_UPLOAD_APPLICANT/EVIDENCE_UPLOAD_APPLICANT');
    }
    await I.waitForText('Upload Your Documents');
    await I.clickContinue();
  }
};
