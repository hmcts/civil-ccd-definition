const {} = require('../../api/dataHelper');
module.exports = {
  createRespondentSmallClaimsEvidenceUpload: (mpScenario) => {
    switch (mpScenario) {
      case 'ONE_V_TWO_TWO_LEGAL_REP': {
        console.log('respondent: one_v_two different solicitor, small claims');
        return {
          valid: {
            EvidenceUpload: {
              allocatedTrack: 'SMALL_CLAIM'
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
            // DocumentUpload: {
            // }
          }
        };
      }
      case 'ONE_V_TWO_ONE_LEGAL_REP': {
        console.log('respondent: one_v_two same solicitor, small claims');
        return {
          valid: {
            EvidenceUpload: {
              allocatedTrack: 'SMALL_CLAIM'
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
            // DocumentUpload: {
            // }
          }
        };
      }
      case 'TWO_V_ONE': {
        console.log('respondent: two_v_one small claims');
        return {
          valid: {
            EvidenceUpload: {
              caseProgAllocatedTrack: 'SMALL_CLAIM',
              caseTypeFlag: 'do_not_show',
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
            // DocumentUpload: {
            // }
          }
        };
      }
      case 'ONE_V_ONE':
      default: {
        console.log('respondent: one_v_one small claims');
        return {
          valid: {
            EvidenceUpload: {
              caseProgAllocatedTrack: 'SMALL_CLAIM',
              caseTypeFlag: 'do_not_show',
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
            // DocumentUpload: {
            // }
          }
        };
      }
    }
  },

  createRespondentFastClaimsEvidenceUpload: (mpScenario) => {
    switch (mpScenario) {
      case 'ONE_V_TWO_TWO_LEGAL_REP': {
        console.log('respondent: one_v_two different solicitor, fast claims');
        return {
          valid: {
            EvidenceUpload: {
              allocatedTrack: 'FAST_CLAIM'
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
            // DocumentUpload: {
            // }
          }
        };
      }
      case 'ONE_V_TWO_ONE_LEGAL_REP': {
        console.log('respondent: one_v_two same solicitor, fast claims');
        return {
          valid: {
            EvidenceUpload: {
              allocatedTrack: 'FAST_CLAIM'
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
            // DocumentUpload: {
            // }
          }
        };
      }
      case 'TWO_V_ONE': {
        console.log('respondent: two_v_one fast claims');
        return {
          valid: {
            EvidenceUpload: {
              caseProgAllocatedTrack: 'FAST_CLAIM'
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
            // DocumentUpload: {
            // }
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
            }
          }
        };
      }
    }
  }
}
