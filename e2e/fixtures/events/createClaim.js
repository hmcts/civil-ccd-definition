const {listElement, buildAddress } = require('../../api/dataHelper');
const uuid = require('uuid');
const config = require('../../config.js');

const docUuid = uuid.v1();

const respondent1 = {
  type: 'INDIVIDUAL',
  individualFirstName: 'John',
  individualLastName: 'Doe',
  individualTitle: 'Sir',
  primaryAddress: buildAddress('respondent'),
  partyEmail: 'johndoe@example.com',
  partyPhone: '07898678902',
  /* type: 'SOLE_TRADER',
  soleTraderFirstName: 'John',
  soleTraderLastName: 'Doe',
  soleTraderTitle: 'Sir',
  primaryAddress: buildAddress('respondent') */

  /* type: 'COMPANY',
  companyName: 'KGF Limited Inc',
  primaryAddress: buildAddress('respondent') */

  /* type: 'ORGANISATION',
  organisationName: 'KGF Limited Inc',
  primaryAddress: buildAddress('respondent') */
};
const respondent2 = {
  type: 'INDIVIDUAL',
  individualFirstName: 'Foo',
  individualLastName: 'Bar',
  individualTitle: 'Dr',
  primaryAddress: buildAddress('second respondent'),
  partyEmail: 'foo.bar@example.com',
  partyPhone: '07898678912',

  /* type: 'SOLE_TRADER',
  soleTraderFirstName: 'John',
  soleTraderLastName: 'Doe',
  soleTraderTitle: 'Sir',
  primaryAddress: buildAddress('respondent') */

  /* type: 'COMPANY',
  companyName: 'RRR Limited Inc',
  primaryAddress: buildAddress('respondent') */

  /* type: 'ORGANISATION',
  organisationName: 'RRR Limited Inc',
  primaryAddress: buildAddress('respondent') */
};
const respondent1WithPartyName = {
  ...respondent1,
  partyName: 'Sir John Doe',
  partyTypeDisplayValue: 'Individual',
  // partyTypeDisplayValue: 'Organisation',
  // partyTypeDisplayValue: 'Sole trader',
  // partyTypeDisplayValue: 'Company',
};
const respondent2WithPartyName = {
  ...respondent2,
  partyName: 'Dr Foo Bar',
  partyTypeDisplayValue: 'Individual',
  // partyTypeDisplayValue: 'Sole trader',
  // partyTypeDisplayValue: 'Company',
  // partyTypeDisplayValue: 'Organisation',
};
const applicant1 = {
  type: 'COMPANY',
  companyName: 'Test Inc',
  primaryAddress: buildAddress('applicant')
  /* type: 'INDIVIDUAL',
  individualFirstName: 'Foo',
  individualLastName: 'Bar',
  individualTitle: 'Dr',
  primaryAddress: buildAddress('second respondent') */

  /* type: 'SOLE_TRADER',
  soleTraderFirstName: 'krishna',
  soleTraderLastName: 'Doe',
  soleTraderTitle: 'Sir',
  primaryAddress: buildAddress('respondent') */

  /* type: 'ORGANISATION',
  organisationName: 'KGF Limited Inc',
  primaryAddress: buildAddress('respondent') */
};
const applicant1WithPartyName = {
  ...applicant1,
  partyName: 'Test Inc',
  partyTypeDisplayValue: 'Company',
  // partyTypeDisplayValue: 'Sole trader',
  // partyTypeDisplayValue: 'Individual',
  // partyTypeDisplayValue: 'Organisation',
};

const applicant2 = {
  type: 'INDIVIDUAL',
  individualFirstName: 'Jane',
  individualLastName: 'Doe',
  individualTitle: 'Dr',
  primaryAddress: buildAddress('second applicant')

  /* type: 'INDIVIDUAL',
 individualFirstName: 'Foo',
 individualLastName: 'Bar',
 individualTitle: 'Dr',
 primaryAddress: buildAddress('second respondent') */

  /* type: 'SOLE_TRADER',
  soleTraderFirstName: 'krishna',
  soleTraderLastName: 'Doe',
  soleTraderTitle: 'Sir',
  primaryAddress: buildAddress('respondent') */

  /* type: 'ORGANISATION',
  organisationName: 'KGF Limited Inc',
  primaryAddress: buildAddress('respondent') */

};

const applicant2WithPartyName = {
  ...applicant2,
  partyName: 'Dr Jane Doe',
  partyTypeDisplayValue: 'Individual',
  // partyTypeDisplayValue: 'Sole trader',
  // partyTypeDisplayValue: 'Company',
  // partyTypeDisplayValue: 'Organisation',
};

const applicant1LitigationFriend = {
  firstName: 'Bob',
  lastName: 'the litigant friend',
  emailAddress: 'bobthelitigant@litigants.com',
  phoneNumber: '07123456789',
  hasSameAddressAsLitigant: 'No',
  primaryAddress: buildAddress('litigant friend')
};

let selectedPba = listElement('PBA0088192');
const validPba = listElement('PBA0088192');
const invalidPba = listElement('PBA0078095');

const createClaimData = (legalRepresentation, useValidPba, mpScenario) => {
  selectedPba = useValidPba ? validPba : invalidPba;
  const claimData = {
    References: {
      CaseAccessCategory: 'UNSPEC_CLAIM',
      solicitorReferences: {
        applicantSolicitor1Reference: 'Applicant reference',
        respondentSolicitor1Reference: 'Respondent reference'
      }
    },
    Court: {
      courtLocation: {
        applicantPreferredCourtLocationList: {
          list_items: [
            listElement(config.claimantSelectedCourt)
          ],
          value: listElement(config.claimantSelectedCourt)
        }
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
          OrganisationID: config.claimantSolicitorOrgId,
        }
      }
    },
    ClaimantSolicitorServiceAddress: {
      applicantSolicitor1ServiceAddressRequired: 'Yes',
      applicantSolicitor1ServiceAddress:  buildAddress('service')
    },
    AddAnotherClaimant: {
      addApplicant2: 'No'
    },
    ...(mpScenario === 'TWO_V_ONE') ? {
      SecondClaimant: {
        applicant2: applicant2WithPartyName
      },
      SecondClaimantLitigationFriendRequired: {
        applicant2LitigationFriendRequired: 'No'
      },
    }: {},
    Defendant: {
      respondent1: respondent1WithPartyName
    },
    LegalRepresentation: {
      respondent1Represented: `${legalRepresentation}`
    },
    ...(legalRepresentation === 'Yes') ? {
      DefendantSolicitorOrganisation: {
        respondent1OrgRegistered: 'Yes',
        respondent1OrganisationPolicy: {
          OrgPolicyReference: 'Defendant policy reference',
          OrgPolicyCaseAssignedRole: '[RESPONDENTSOLICITORONE]',
          Organisation: {
            OrganisationID: config.defendant1SolicitorOrgId
          },
        },
      },
      DefendantSolicitorServiceAddress: {
        respondentSolicitor1ServiceAddress: buildAddress('service')
      },
      DefendantSolicitorEmail: {
        respondentSolicitor1EmailAddress: 'civilunspecified@gmail.com'
      },
    }: {},
    AddAnotherDefendant: {
      addRespondent2: 'No'
    },
    ...hasRespondent2(mpScenario) ? {
        SecondDefendant: {},
        SecondDefendantLegalRepresentation: {},
        SecondDefendantSolicitorOrganisation: {},
        SecondDefendantSolicitorServiceAddress: {},
        SecondDefendantSolicitorReference: {},
        SecondDefendantSolicitorEmail: {},
        SameLegalRepresentative: {},
      } : {},
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
       // statementOfValueInPennies: '300000'
        // statementOfValueInPennies: '15000'
      }
    },
    PbaNumber: {
      applicantSolicitor1PbaAccounts: {
        list_items: [
          validPba,
          invalidPba
        ],
        value: selectedPba

      }
    },
    PaymentReference: {
      claimIssuedPaymentDetails:  {
        customerReference: 'Applicant reference'
      }
    },
    StatementOfTruth: {
      uiStatementOfTruth: {
        name: 'John Doe',
        role: 'Test Solicitor'
      }
    },
  };
  switch (mpScenario){
    case 'ONE_V_TWO_ONE_LEGAL_REP': {
      return {
        ...claimData,
        AddAnotherClaimant: {
          addApplicant2: 'No'
        },
        AddAnotherDefendant: {
          addRespondent2: 'Yes'
        },
        SecondDefendant: {
          respondent2: respondent2WithPartyName
        },
        SecondDefendantLegalRepresentation: {
          respondent2Represented: 'Yes'
        },
        SameLegalRepresentative: {
          respondent2SameLegalRepresentative: 'Yes'
        },
      };
    }
    case 'ONE_V_TWO_TWO_LEGAL_REP': {
      return {
        ...claimData,
        AddAnotherClaimant: {
          addApplicant2: 'No'
        },
        AddAnotherDefendant: {
          addRespondent2: 'Yes'
        },
        SecondDefendant: {
          respondent2: respondent2WithPartyName,
        },
        SecondDefendantLegalRepresentation: {
          respondent2Represented: 'Yes'
        },
        SameLegalRepresentative: {
          respondent2SameLegalRepresentative: 'No'
        },
        SecondDefendantSolicitorOrganisation: {
          respondent2OrgRegistered: 'Yes',
          respondent2OrganisationPolicy: {
            OrgPolicyReference: 'Defendant policy reference 2',
            OrgPolicyCaseAssignedRole: '[RESPONDENTSOLICITORTWO]',
            Organisation:

              {OrganisationID: config.defendant2SolicitorOrgId}
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
        }
      };
    }
    case 'TWO_V_ONE': {
      return {
        ...claimData,
        AddAnotherClaimant: {
          addApplicant2: 'Yes'
        }
      };
    }
    case 'ONE_V_ONE':
    default: {
      return claimData;
    }
  }
};

const hasRespondent2 = (mpScenario) => {
  return mpScenario === 'ONE_V_TWO_ONE_LEGAL_REP'
      || mpScenario ===  'ONE_V_TWO_TWO_LEGAL_REP';
};

module.exports = {
  createClaim: (mpScenario = 'ONE_V_ONE') => {
    return {
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

            /* calculatedAmountInPence: '11500',
            code: 'FEE0206',
            version: '6' */

            /* calculatedAmountInPence: '3500',
            code: 'FEE0202',
            version: '6' */
          },
          claimIssuedPaymentDetails: {
            customerReference: 'Applicant reference'
          },
          applicant1: applicant1WithPartyName,
          respondent1: respondent1WithPartyName,
          ...hasRespondent2(mpScenario) ? {
            respondent2: respondent2WithPartyName
          } : {}
        },
        ClaimantLitigationFriend: {
          applicant1: applicant1WithPartyName,
          applicant1LitigationFriend: applicant1LitigationFriend,
          applicantSolicitor1CheckEmail: {
            email: 'hmcts.civil+organisation.1.solicitor.1@gmail.com',
          },
        },
        // otherwise applicantSolicitor1ClaimStatementOfTruth: [undefined]
        StatementOfTruth: {
          applicantSolicitor1ClaimStatementOfTruth: {}
        }
      },
      valid: {
        ...createClaimData('Yes', true, mpScenario),
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
  },

  createClaimLitigantInPerson: {
    valid: createClaimData('No', true)
  },
  createClaimWithTerminatedPBAAccount: {
    valid: createClaimData('Yes', false)
  },
  createClaimRespondentSolFirmNotInMyHmcts: {
    valid: {
      ...createClaimData('Yes', true),
      DefendantSolicitorOrganisation: {
        respondent1OrgRegistered: 'No'
      },
      UnRegisteredDefendantSolicitorOrganisation: {
        respondentSolicitor1OrganisationDetails: {
          organisationName: 'Test org',
          phoneNumber: '0123456789',
          email: 'test@example.com',
          dx: 'test dx',
          fax: '123123123',
          address: buildAddress('org')
        }
      },
    }
  }
};
