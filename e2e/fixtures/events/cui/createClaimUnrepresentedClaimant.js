const {date} = require('../../../api/dataHelper');
module.exports = {
  createClaimUnrepresentedClaimant: (claimAmount, userId) => {
    const createClaimData = {
      event: 'CREATE_LIP_CLAIM',
      caseDataUpdate: {
        applicant1: {
          individualDateOfBirth: null,
          organisationName: 'Test Inc',
          partyEmail: 'civilmoneyclaimsdemo@gmail.com',
          partyPhone: '07777777777',
          primaryAddress: {
            AddressLine1: '1',
            AddressLine2: '',
            AddressLine3: '',
            PostCode: 'E1 6AN',
            PostTown: 'London'
          },
          soleTraderDateOfBirth: null,
          type: 'ORGANISATION'
        },
        respondent1: {
          individualDateOfBirth: null,
          organisationName: 'Sir John Doe',
          partyEmail: 'citizen@gmail.com',
          partyPhone: '07777777777',
          primaryAddress: {
            AddressLine1: '1',
            AddressLine2: '',
            AddressLine3: '',
            PostCode: 'E1 6AN',
            PostTown: 'London'
          },
          soleTraderDateOfBirth: null,
          type: 'ORGANISATION'
        },
        applicant1Represented: 'No',
        totalClaimAmount: claimAmount,
        claimAmountBreakup: [
          {
            id: '0',
            value: {
              claimAmount: '100000',
              claimReason: 'sdf'
            }
          }
        ],
        detailsOfClaim: 'asd',
        speclistYourEvidenceList: [
          {
            id: '0',
            value: {
              evidenceType: 'CONTRACTS_AND_AGREEMENTS',
              contractAndAgreementsEvidence: 'asd'
            }
          }
        ],
        claimInterest: 'No',
        claimantUserDetails: {
          email: 'civilmoneyclaimsdemo@gmail.com',
          id: userId
        },
        respondent1LiPResponse: {
          respondent1DQExtraDetails: {
            whyPhoneOrVideoHearing: '',
            determinationWithoutHearingReason: '',
            considerClaimantDocumentsDetails: '',
            respondent1DQLiPExpert: {
              expertCanStillExamineDetails: ''
            }
          },
          respondent1DQHearingSupportLip: {},
          respondent1LiPContactPerson: ''
        },
        specRespondent1Represented: 'No',
        helpWithFees: {
          helpWithFee: 'No',
          helpWithFeesReferenceNumber: ''
        },
        respondent1AdditionalLipPartyDetails: {
          correspondenceAddress: {},
          contactPerson: ''
        },
        applicant1AdditionalLipPartyDetails: {
          correspondenceAddress: {
            AddressLine1: '',
            AddressLine2: '',
            AddressLine3: '',
            PostCode: '',
            PostTown: ''
          },
          contactPerson: ''
        },
        claimFee: {
          calculatedAmountInPence: '3500',
          code: 'FEE0202',
          version: '4'
        }
      }
    };
    return createClaimData;
  },

  issueClaim: () => {
    const claimIssueData = {
      event: 'CREATE_CLAIM_SPEC_AFTER_PAYMENT',
      caseDataUpdate: {
        issueDate: date(0)
      }
    };
    return claimIssueData;
  },
};
