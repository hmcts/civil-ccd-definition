const {date, dateTime} = require('../../api/dataHelper');
module.exports = {
  createApplicantSmallClaimsEvidenceUpload: () => {
    console.log('Applicant small claims')
    return {
      valid: {
        EvidenceUpload: {
          allocatedTrack: 'SMALL_CLAIM'
        },
        DocumentSelectionSmallClaim: {
          witnessSelectionEvidenceSmallClaim: ['WITNESS_STATEMENT'],
          expertSelectionEvidenceSmallClaim: ['EXPERT_REPORT'],
          trialSelectionEvidenceSmallClaim: ['DOCUMENTARY']
        },
        DocumentUpload: {
          documentWitnessStatement: [],
          documentWitnessSummary:[],
          documentReferredInStatement:[]
        }
      }
    };
  },

  createApplicantFastClaimsEvidenceUpload: () => {
    console.log('Applicant fast claims')
    return {
      valid: {
        EvidenceUpload: {
          allocatedTrack: 'FAST_CLAIM'
        },
        DocumentSelectionFastTrack: {
          witnessSelectionEvidence: ['WITNESS_SUMMARY'],
          expertSelectionEvidence: ['JOINT_STATEMENT'],
          trialSelectionEvidence: ['SKELETON_ARGUMENT']
        },
        DocumentUpload: {
          documentWitnessStatement: [],
          documentWitnessSummary:[],
          documentReferredInStatement:[]
        }
      }
    };
  }
}
