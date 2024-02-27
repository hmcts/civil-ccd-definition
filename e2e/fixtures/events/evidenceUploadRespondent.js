const {listElement} = require('../../api/dataHelper');
const selectedOptionApp = listElement('Defendant 1 and 2');

module.exports = {
  createRespondentSmallClaimsEvidenceUpload: (mpScenario) => {
    switch (mpScenario) {
      case 'ONE_V_TWO_ONE_LEGAL_REP': {
        //Should see respondent 2 fields as they have case role RESPONDENTSOLICITORTWO
        console.log('respondent: one_v_two same solicitor, small claims');
        return {
          valid: {
            EvidenceUpload: {
              caseProgAllocatedTrack: 'SMALL_CLAIM'
            },
            SelectUploadOptions: {
              evidenceUploadOptions: {
                list_items: [
                  selectedOptionApp,
                  listElement('Defendant 1: Sir John Doe'),
                  listElement('Defendant 2: Dr Foo Bar')
                ],
                value: selectedOptionApp
              }
            },
            DocumentSelectionSmallClaim: {
              witnessSelectionEvidenceSmallClaimRes: ['WITNESS_SUMMARY'],
              expertSelectionEvidenceSmallClaimRes: ['EXPERT_REPORT'],
              trialSelectionEvidenceSmallClaimRes: ['AUTHORITIES'],
              witnessStatementFlag: 'do_not_show',
              trialAuthorityFlag: 'show_trial_authority',
              expertJointFlag: 'do_not_show',
              witnessReferredStatementFlag: 'do_not_show',
              expertReportFlag: 'show_expert_report',
              trialCostsFlag: 'do_not_show',
              witnessSummaryFlag: 'show_witness_summary',
              trialDocumentaryFlag: 'do_not_show'
            },
            DocumentUpload: {
              documentWitnessSummaryRes2:[{
                value: {
                  witnessOptionName:'test name',
                  witnessOptionUploadDate: '2023-02-06',
                  witnessOptionDocument:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
              documentExpertReportRes2:[{
                value: {
                  expertOptionName:'test name',
                  expertOptionExpertise:'expertise',
                  expertOptionUploadDate:'2023-02-06',
                  expertDocument:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
              documentAuthoritiesRes2:[{
                value: {
                  documentUpload:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
            }
          }
        };
      }
      case 'TWO_V_ONE': {
        console.log('respondent: two_v_one small claims');
        return {
          valid: {
            EvidenceUpload: {
              caseProgAllocatedTrack: 'SMALL_CLAIM'
            },
            DocumentSelectionSmallClaim: {
              witnessSelectionEvidenceSmallClaimRes: ['WITNESS_SUMMARY'],
              expertSelectionEvidenceSmallClaimRes: ['QUESTIONS_FOR_EXPERTS'],
              trialSelectionEvidenceSmallClaimRes: ['COSTS'],
              witnessStatementFlag: 'do_not_show',
              trialAuthorityFlag: 'do_not_show',
              expertJointFlag: 'do_not_show',
              witnessReferredStatementFlag: 'do_not_show',
              expertReportFlag: 'do_not_show',
              trialCostsFlag: 'show_trial_costs',
              witnessSummaryFlag: 'show_witness_summary',
              trialDocumentaryFlag: 'do_not_show'
            },
            DocumentUpload: {
              documentWitnessSummaryRes:[{
                value: {
                  witnessOptionName:'test name',
                  witnessOptionUploadDate: '2023-02-06',
                  witnessOptionDocument:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
              documentQuestionsRes:[{
                value: {
                  expertOptionName:'test name',
                  expertOptionOtherParty:'text',
                  expertDocumentQuestion:'question',
                  expertOptionUploadDate:'2023-02-06',
                  expertDocument:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
              documentAuthoritiesRes:[{
                value: {
                  documentUpload:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
            }
          }
        };
      }
      case 'ONE_V_ONE':
      default: {
        console.log('respondent: one_v_one small claims');
        return {
          valid: {
            EvidenceUpload: {
              caseProgAllocatedTrack: 'SMALL_CLAIM'
            },
            DocumentSelectionSmallClaim: {
              caseTypeFlag: 'do_not_show',
              witnessSelectionEvidenceSmallClaim: ['WITNESS_STATEMENT'],
              expertSelectionEvidenceSmallClaim: ['EXPERT_REPORT'],
              trialSelectionEvidenceSmallClaim: ['AUTHORITIES']
            },
            DocumentUpload: {
              documentWitnessSummaryRes:[{
                value: {
                  witnessOptionName: 'test name',
                  witnessOptionUploadDate: '2023-02-06',
                  witnessOptionDocument: {
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
              documentExpertReport: [{
                value: {
                  expertOptionName: 'test name',
                  expertOptionExpertise: 'expertise',
                  expertOptionUploadDate: '2023-02-06',
                  expertDocument: {
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
              documentAuthorities: [{
                value: {
                  documentUpload: {
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }]
            }
          }
        };
      }
    }
  },

  createRespondentFastClaimsEvidenceUpload: (mpScenario) => {
    switch (mpScenario) {
      case 'ONE_V_TWO_ONE_LEGAL_REP': {
        //Should see respondent 2 fields as they have case role RESPONDENTSOLICITORTWO
        console.log('respondent: one_v_two same solicitor, fast claims');
        return {
          valid: {
            EvidenceUpload: {
              caseProgAllocatedTrack: 'FAST_CLAIM'
            },
            SelectUploadOptions: {
              evidenceUploadOptions: {
                list_items: [
                  selectedOptionApp,
                  listElement('Defendant 1: Sir John Doe'),
                  listElement('Defendant 2: Dr Foo Bar')
                ],
                value: selectedOptionApp
              }
            },
            DocumentSelectionFastTrack: {
              disclosureSelectionEvidenceRes: ['DISCLOSURE_LIST'],
              witnessSelectionEvidenceRes: ['WITNESS_SUMMARY'],
              expertSelectionEvidenceRes: ['EXPERT_REPORT'],
              trialSelectionEvidenceRes: ['AUTHORITIES'],
              witnessStatementFlag: 'do_not_show',
              trialAuthorityFlag: 'show_trial_authority',
              expertJointFlag: 'do_not_show',
              witnessReferredStatementFlag: 'do_not_show',
              expertReportFlag: 'show_expert_report',
              trialCostsFlag: 'do_not_show',
              witnessSummaryFlag: 'show_witness_summary',
              trialDocumentaryFlag: 'do_not_show'
            },
            DocumentUpload: {
              documentDisclosureListRes2:[{
                value: {
                  documentUpload:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
              documentWitnessSummaryRes2:[{
                value: {
                  witnessOptionName:'test name',
                  witnessOptionUploadDate: '2023-02-06',
                  witnessOptionDocument:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
              documentExpertReportRes2:[{
                value: {
                  expertOptionName:'test name',
                  expertOptionExpertise:'expertise',
                  expertOptionUploadDate:'2023-02-06',
                  expertDocument:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
              documentAuthoritiesRes2:[{
                value: {
                  documentUpload:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
            }
          }
        };
      }
      case 'TWO_V_ONE': {
        console.log('respondent: two_v_one fast claims');
        // will see respondent fields, as they only have RESPONDENTSOLICITORONE
        return {
          valid: {
            EvidenceUpload: {
              caseProgAllocatedTrack: 'FAST_CLAIM'
            },
            DocumentSelectionFastTrack: {
              disclosureSelectionEvidenceRes: ['DISCLOSURE_LIST'],
              witnessSelectionEvidenceRes: ['WITNESS_SUMMARY'],
              expertSelectionEvidenceRes: ['QUESTIONS_FOR_EXPERTS'],
              trialSelectionEvidenceRes: ['COSTS'],
              witnessStatementFlag: 'do_not_show',
              trialAuthorityFlag: 'do_not_show',
              expertJointFlag: 'do_not_show',
              witnessReferredStatementFlag: 'do_not_show',
              expertReportFlag: 'do_not_show',
              trialCostsFlag: 'show_trial_costs',
              witnessSummaryFlag: 'show_witness_summary',
              trialDocumentaryFlag: 'do_not_show'
            },
            DocumentUpload: {
              documentDisclosureListRes:[{
                value: {
                  documentUpload:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
              documentWitnessSummaryRes:[{
                value: {
                  witnessOptionName:'test name',
                  witnessOptionUploadDate: '2023-02-06',
                  witnessOptionDocument:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
              documentQuestionsRes:[{
                value: {
                  expertOptionName:'test name',
                  expertOptionOtherParty:'text',
                  expertDocumentQuestion:'question',
                  expertOptionUploadDate:'2023-02-06',
                  expertDocument:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
              documentAuthoritiesRes:[{
                value: {
                  documentUpload:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
            }
          }
        };
      }
      case 'ONE_V_ONE':
      default: {
        console.log('respondent: one_v_one fast claims');
        return {
          valid: {
            EvidenceUpload: {
              caseProgAllocatedTrack: 'FAST_CLAIM'
            },
            DocumentSelectionFastTrack: {
              disclosureSelectionEvidenceRes: ['DISCLOSURE_LIST'],
              witnessSelectionEvidenceRes: ['WITNESS_SUMMARY'],
              expertSelectionEvidenceRes: ['QUESTIONS_FOR_EXPERTS'],
              trialSelectionEvidenceRes: ['COSTS'],
              witnessStatementFlag: 'do_not_show',
              trialAuthorityFlag: 'do_not_show',
              expertJointFlag: 'do_not_show',
              witnessReferredStatementFlag: 'do_not_show',
              expertReportFlag: 'do_not_show',
              trialCostsFlag: 'show_trial_costs',
              witnessSummaryFlag: 'show_witness_summary',
              trialDocumentaryFlag: 'do_not_show'
            },
            DocumentUpload: {
              documentDisclosureListRes:[{
                value: {
                  documentUpload:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
              documentWitnessSummaryRes:[{
                value: {
                  witnessOptionName:'test name',
                  witnessOptionUploadDate: '2023-02-06',
                  witnessOptionDocument:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
              documentQuestionsRes:[{
                value: {
                  expertOptionName:'test name',
                  expertOptionOtherParty:'text',
                  expertDocumentQuestion:'question',
                  expertOptionUploadDate:'2023-02-06',
                  expertDocument:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
              documentAuthoritiesRes:[{
                value: {
                  documentUpload:{
                    document_url: '${TEST_DOCUMENT_URL}',
                    document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                    document_filename: '${TEST_DOCUMENT_FILENAME}'
                  },
                  createdDatetime: '2023-02-06T13:11:52.466Z'
                }
              }],
            }
          }
        };
      }
    }
  }
};
