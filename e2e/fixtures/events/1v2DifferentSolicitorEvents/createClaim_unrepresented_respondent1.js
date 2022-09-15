const {
  applicant1WithPartyName, applicant1LitigationFriend, respondent1WithPartyName, validPba, invalidPba,
  respondent2WithPartyName
} = require('../common');
const {applicantSolicitorUser, secondDefendantSolicitorUser} = require('../../../config');
const uuid = require('uuid');
const {buildAddress} = require('../../../api/dataHelper');

const docUuid = uuid.v1();

module.exports = {
  createClaim1v2Res1Unrepresented: {
    midEventData: {
      ClaimValue: {
        applicantSolicitor1PbaAccounts: {
          list_items: [
            validPba,
            invalidPba
          ]
        },
        applicantSolicitor1PbaAccountsIsEmpty: 'No',
        claimFee: {
          calculatedAmountInPence: '150000',
          code: 'FEE0209',
          version: '3'
        },
        claimIssuedPaymentDetails: {
          customerReference: 'Applicant reference'
        },
        applicant1: applicant1WithPartyName,
        respondent1: respondent1WithPartyName,
      },
      ClaimantLitigationFriend: {
        applicant1: applicant1WithPartyName,
        applicant1LitigationFriend: applicant1LitigationFriend,
        applicantSolicitor1CheckEmail: {
          email: 'hmcts.civil+organisation.1.solicitor.1@gmail.com',
        },
      },
      StatementOfTruth: {
        applicantSolicitor1ClaimStatementOfTruth: {}
      },
    },
    valid: {
      References: {
        solicitorReferences: {
          applicantSolicitor1Reference: 'Applicant reference',
          respondentSolicitor1Reference: 'Respondent reference'
        }
      },
      Court: {
        courtLocation: {
          applicantPreferredCourt: '344'
        }
      },
      Claimant: {
        applicant1: applicant1WithPartyName
      },
      ClaimantLitigationFriendRequired: {
        applicant1LitigationFriendRequired: 'Yes',
      },
      ClaimantLitigationFriend: {
        applicant1LitigationFriend: applicant1LitigationFriend
      },
      Notifications: {
        applicantSolicitor1CheckEmail: {
          email: 'hmcts.civil+organisation.1.solicitor.1@gmail.com',
          correct: 'No'
        },
        applicantSolicitor1UserDetails: {
          email: 'civilunspecified@gmail.com',
          id: 'c18d5f8d-06fa-477d-ac09-5b6129828a5b'
        }
      },
      ClaimantSolicitorOrganisation: {
        applicant1OrganisationPolicy: {
          OrgPolicyReference: 'Claimant policy reference',
          OrgPolicyCaseAssignedRole: '[APPLICANTSOLICITORONE]',
          Organisation: {
            OrganisationID: applicantSolicitorUser.orgId,
          }
        }
      },
      ClaimantSolicitorServiceAddress: {
        applicantSolicitor1ServiceAddress: buildAddress('service')
      },
      AddAnotherClaimant: {
        addApplicant2: 'No'
      },
      Defendant: {
        respondent1: respondent1WithPartyName
      },
      LegalRepresentation: {
        respondent1Represented: 'No'
      },
      AddAnotherDefendant: {
        addRespondent2: 'Yes'
      },
      SecondDefendant: {
        respondent2: respondent2WithPartyName,
      },
      SecondDefendantLegalRepresentation: {
        respondent2Represented: 'Yes',
        respondent2SameLegalRepresentative: 'No'
      },
      SecondDefendantSolicitorOrganisation: {
        respondent2OrgRegistered: 'Yes',
        respondent2OrganisationPolicy: {
          OrgPolicyReference: 'Defendant policy reference 2',
          OrgPolicyCaseAssignedRole: '[RESPONDENTSOLICITORTWO]',
          Organisation:

            {OrganisationID: secondDefendantSolicitorUser.orgId}
          ,
        },
      },
      SecondDefendantSolicitorServiceAddress: {
        respondentSolicitor2ServiceAddress: buildAddress('service')
      },
      SecondDefendantSolicitorReference: {
        respondentSolicitor2Reference: 'sol2reference'
      },
      SecondDefendantSolicitorEmail: {
        respondentSolicitor2EmailAddress: 'civilunspecified@gmail.com'
      },
      ClaimType: {
        claimType: 'PERSONAL_INJURY'
      },
      PersonalInjuryType: {
        personalInjuryType: 'ROAD_ACCIDENT'
      },
      Details: {
        detailsOfClaim: 'Test details of claim'
      },
      Upload: {
        servedDocumentFiles: {
          particularsOfClaimDocument: [
            {
              id: docUuid,
              value: {
                document_url: '${TEST_DOCUMENT_URL}',
                document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
                document_filename: '${TEST_DOCUMENT_FILENAME}'
              }
            }
          ]
        }
      },
      ClaimValue: {
        claimValue: {
          statementOfValueInPennies: '3000000'
        }
      },
      PbaNumber: {
        applicantSolicitor1PbaAccounts: {
          list_items: [
            validPba,
            invalidPba
          ],
          value: validPba
        }
      },
      PaymentReference: {
        claimIssuedPaymentDetails: {
          customerReference: 'Applicant reference'
        }
      },
      StatementOfTruth: {
        uiStatementOfTruth: {
          name: 'John Doe',
          role: 'Test Solicitor'
        }
      }
    }
  },
  invalid: {
    Upload: {
      servedDocumentFiles: {
        particularsOfClaimDocument: [
          {
            id: docUuid,
            value: {
              document_url: '${TEST_DOCUMENT_URL}',
              document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
              document_filename: '${TEST_DOCUMENT_FILENAME}'
            }
          },
          {
            id: docUuid,
            value: {
              document_url: '${TEST_DOCUMENT_URL}',
              document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
              document_filename: '${TEST_DOCUMENT_FILENAME}'
            }
          }
        ]
      }
    },
    Court: {
      courtLocation: {
        applicantPreferredCourt: ['3a3', '21', '3333']
      }
    }
  }
};


