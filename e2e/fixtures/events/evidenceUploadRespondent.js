const {date, dateTime} = require('../../api/dataHelper');
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
              trialSelectionEvidenceSmallClaimRes: ['AUTHORITIES']
            },
            DocumentUpload: {
              caseTypeFlag: 'RespondentTwoFields',
              witnessStatementFlag: 'show_witness_summary',
              expertReportFlag: 'show_expert_report',
              trialAuthorityFlag: 'show_trial_authority',
              documentWitnessSummaryRes2: [],
              documentExpertReportRes2: [],
              documentAuthoritiesRes2: []
            }
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
              trialSelectionEvidenceSmallClaimRes: ['AUTHORITIES']
            },
            DocumentUpload: {
              caseTypeFlag: 'NotRespondentTwoFields',
              witnessStatementFlag: 'show_witness_summary',
              expertReportFlag: 'show_expert_report',
              trialAuthorityFlag: 'show_trial_authority',
              documentWitnessSummaryRes: [],
              documentExpertReportRes: [],
              documentAuthoritiesRes: []
            }
          }
        };
      }
      case 'TWO_V_ONE': {
        console.log('respondent: two_v_one small claims');
        return {
          valid: {
            EvidenceUpload: {
              allocatedTrack: 'SMALL_CLAIM'
            },
            DocumentSelectionSmallClaim: {
              witnessSelectionEvidenceSmallClaimRes: ['WITNESS_SUMMARY'],
              expertSelectionEvidenceSmallClaimRes: ['EXPERT_REPORT'],
              trialSelectionEvidenceSmallClaimRes: ['AUTHORITIES']
            },
            DocumentUpload: {
              caseTypeFlag: 'NotRespondentTwoFields',
              witnessStatementFlag: 'show_witness_summary',
              expertReportFlag: 'show_expert_report',
              trialAuthorityFlag: 'show_trial_authority',
              documentWitnessSummaryRes: [],
              documentExpertReportRes: [],
              documentAuthoritiesRes: []
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
              allocatedTrack: 'SMALL_CLAIM'
            },
            DocumentSelectionSmallClaim: {
              witnessSelectionEvidenceSmallClaimRes: ['WITNESS_SUMMARY'],
              expertSelectionEvidenceSmallClaimRes: ['EXPERT_REPORT'],
              trialSelectionEvidenceSmallClaimRes: ['AUTHORITIES']
            },
            DocumentUpload: {
              caseTypeFlag: 'NotRespondentTwoFields',
              witnessStatementFlag: 'show_witness_summary',
              expertReportFlag: 'show_expert_report',
              trialAuthorityFlag: 'show_trial_authority',
              documentWitnessSummaryRes: [],
              documentExpertReportRes: [],
              documentAuthoritiesRes: []
            }
          }
        };
      }
    }
  },

  createRespondentFastClaimsEvidenceUpload: () => {
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
              trialSelectionEvidenceRes: ['AUTHORITIES']
            },
            DocumentUpload: {
              caseTypeFlag: 'RespondentTwoFields',
              witnessStatementFlag: 'show_witness_summary',
              expertReportFlag: 'show_expert_report',
              trialAuthorityFlag: 'show_trial_authority',
              documentDisclosureListRes2:[],
              documentWitnessSummaryRes2: [],
              documentExpertReportRes2: [],
              documentAuthoritiesRes2: []
            }
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
              trialSelectionEvidenceRes: ['AUTHORITIES']
            },
            DocumentUpload: {
              caseTypeFlag: 'NotRespondentTwoFields',
              witnessStatementFlag: 'show_witness_summary',
              expertReportFlag: 'show_expert_report',
              trialAuthorityFlag: 'show_trial_authority',
              documentDisclosureListRes: [],
              documentWitnessSummaryRes: [],
              documentExpertReportRes: [],
              documentAuthoritiesRes: []
            }
          }
        };
      }
      case 'TWO_V_ONE': {
        console.log('respondent: two_v_one fast claims');
        return {
          valid: {
            EvidenceUpload: {
              allocatedTrack: 'FAST_CLAIM'
            },
            DocumentSelectionFastTrack: {
              disclosureSelectionEvidenceRes: ['DISCLOSURE_LIST'],
              witnessSelectionEvidenceRes: ['WITNESS_SUMMARY'],
              expertSelectionEvidenceRes: ['EXPERT_REPORT'],
              trialSelectionEvidenceRes: ['AUTHORITIES']
            },
            DocumentUpload: {
              caseTypeFlag: 'NotRespondentTwoFields',
              witnessStatementFlag: 'show_witness_summary',
              expertReportFlag: 'show_expert_report',
              trialAuthorityFlag: 'show_trial_authority',
              documentDisclosureListRes:[],
              documentWitnessSummaryRes: [],
              documentExpertReportRes: [],
              documentAuthoritiesRes: []
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
              allocatedTrack: 'FAST_CLAIM'
            },
            DocumentSelectionFastTrack: {
              disclosureSelectionEvidenceRes: ['DISCLOSURE_LIST'],
              witnessSelectionEvidenceRes: ['WITNESS_SUMMARY'],
              expertSelectionEvidenceRes: ['EXPERT_REPORT'],
              trialSelectionEvidenceRes: ['AUTHORITIES']
            },
            DocumentUpload: {
              caseTypeFlag: 'NotRespondentTwoFields',
              witnessStatementFlag: 'show_witness_summary',
              expertReportFlag: 'show_expert_report',
              trialAuthorityFlag: 'show_trial_authority',
              documentDisclosureListRes:[],
              documentWitnessSummaryRes: [],
              documentExpertReportRes: [],
              documentAuthoritiesRes: []
            }
          }
        };
      }
    }
  }
}
