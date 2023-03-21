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
        DocumentSelectionFastTrack: {
          disclosureSelectionEvidence:['DISCLOSURE_LIST'],
        },
        DocumentUpload: {
          documentDisclosureList:[],
        }
      }
    };
  }
};
