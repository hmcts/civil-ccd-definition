const {} = require('../../api/dataHelper');
module.exports = {
  createApplicantSmallClaimsEvidenceUpload: () => {
    console.log('Applicant small claims');
    return {
      valid: {
        EvidenceUpload: {
          caseProgAllocatedTrack: 'SMALL_CLAIM'
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
    console.log('Applicant fast claims');
    return {
      valid: {
        EvidenceUpload: {
          caseProgAllocatedTrack: 'FAST_CLAIM'
        },
        DocumentSelectionSmallClaim: {
          disclosureSelectionEvidence:['DISCLOSURE_LIST'],
          witnessSelectionEvidence: ['WITNESS_SUMMARY'],
          expertSelectionEvidence: ['JOINT_STATEMENT'],
          trialSelectionEvidence: ['SKELETON_ARGUMENT']
        },
        DocumentUpload: {
          documentDisclosureList:[],
          documentWitnessStatement: [],
          documentWitnessSummary:[],
          documentReferredInStatement:[]
        }
      }
    };
  }
};
