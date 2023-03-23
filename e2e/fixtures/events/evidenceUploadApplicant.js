module.exports = {
  createApplicantSmallClaimsEvidenceUpload: () => {
    console.log('Applicant small claims');
    return {
      valid: {
        EvidenceUpload: {
          caseProgAllocatedTrack: 'SMALL_CLAIM'
        },
        DocumentSelectionSmallClaim: {
          witnessSelectionEvidenceSmallClaim:['WITNESS_STATEMENT'],
          expertSelectionEvidenceSmallClaim:['EXPERT_REPORT'],
          trialSelectionEvidenceSmallClaim:['AUTHORITIES']
        },
        DocumentUpload: {
          documentWitnessStatement:[{
            value: {
              witnessOptionName:'test name',
              witnessOptionUploadDate:'2023-02-06',
              witnessOptionDocument:{
                document_url: '${TEST_DOCUMENT_URL}',
                document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                document_filename: '${TEST_DOCUMENT_FILENAME}'
              },
              createdDatetime: '2023-02-06T13:11:52.466Z'
            }
          }],
          documentExpertReport:[{
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
          documentAuthorities:[{
            value: {
              documentUpload:{
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
  },

  createApplicantFastClaimsEvidenceUpload: () => {
    console.log('Applicant fast claims1');
    return {
      valid: {
        EvidenceUpload: {
          caseProgAllocatedTrack: 'FAST_CLAIM'
        },
        DocumentSelectionFastTrack: {
          disclosureSelectionEvidence:['DISCLOSURE_LIST'],
          witnessSelectionEvidence:['WITNESS_SUMMARY'],
          expertSelectionEvidence:['JOINT_STATEMENT'],
          trialSelectionEvidence:['DOCUMENTARY']
        },
        DocumentUpload: {
          documentDisclosureList:[{
            value: {
              documentUpload:{
                document_url: '${TEST_DOCUMENT_URL}',
                document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                document_filename: '${TEST_DOCUMENT_FILENAME}'
              },
              createdDatetime: '2023-02-06T13:11:52.466Z'
            }
          }],
          documentWitnessSummary:[{
            value: {
              witnessOptionName:'test name',
              witnessOptionDocument:{
                document_url: '${TEST_DOCUMENT_URL}',
                document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                document_filename: '${TEST_DOCUMENT_FILENAME}'
              },
              createdDatetime: '2023-02-06T13:11:52.466Z'
            }
          }],
          documentJointStatement:[{
            value: {
              expertOptionName:'test name',
              expertOptionExpertises:'expertise',
              expertOptionUploadDate:'2023-02-06',
              expertDocument:{
                document_url: '${TEST_DOCUMENT_URL}',
                document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                document_filename: '${TEST_DOCUMENT_FILENAME}'
              },
              createdDatetime: '2023-02-06T13:11:52.466Z'
            }
          }],
          documentEvidenceForTrial:[{
            value: {
              typeOfDocument:'images etc',
              documentIssuedDate:'2023-02-06',
              documentUpload:{
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
};
