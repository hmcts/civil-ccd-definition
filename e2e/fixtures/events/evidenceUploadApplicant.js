const {} = require('../../api/dataHelper');
module.exports = {
  createApplicantSmallClaimsEvidenceUpload: () => {
    console.log('Applicant small claims');
    const responseData =  {
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
    return responseData;
  },

  createApplicantFastClaimsEvidenceUpload: () => {
    console.log('Applicant fast claims');
    const responseData =   {
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
    return responseData;
  }
};
