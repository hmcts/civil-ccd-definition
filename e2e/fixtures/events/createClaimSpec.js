const { buildAddress } = require('../../api/dataHelper');

const respondent1 = {
  type: 'INDIVIDUAL',
  individualFirstName: 'John',
  individualLastName: 'Doe',
  individualTitle: 'Sir',
  primaryAddress: buildAddress('respondent')
};

const respondent1WithPartyName = {
  ...respondent1,
  partyName: 'Sir John Doe',
  partyTypeDisplayValue: 'Individual'
};

const applicant1 = {
  type: 'COMPANY',
  companyName: 'Test Inc',
  primaryAddress: buildAddress('applicant')
};
const applicant1WithPartyName = {
  ...applicant1,
  partyName: 'Test Inc',
  partyTypeDisplayValue: 'Company',
};

const createClaimData = (legalRepresentation, useValidPba, mpScenario = 'ONE_V_ONE') => {
  const claimData = {
    References: {
      solicitorReferences: {
        applicantSolicitor1Reference: 'Applicant reference',
        respondentSolicitor1Reference: 'Respondent reference'
      }
    },

    Claimant: {
      applicant1: applicant1WithPartyName
    },

    AddAnotherClaimant: {
      addApplicant2: 'No'
    },

    Notifications: {
      applicantSolicitor1CheckEmail: {
        email: 'hmcts.civil+organisation.1.solicitor.1@gmail.com',
      }
    },

    ClaimantSolicitorOrganisation: {
      applicant1OrganisationPolicy: {
        OrgPolicyReference: 'Claimant policy reference',
        OrgPolicyCaseAssignedRole: '[APPLICANTSOLICITORONESPEC]',
        Organisation: {
          OrganisationID: 'Q1KOKP2',
        }
      }
    },

    Defendant: {
      respondent1: respondent1WithPartyName
    },

    DefendantSolicitorOrganisation: {
      respondent1OrgRegistered: 'Yes',
      respondent1OrganisationPolicy: {
        OrgPolicyReference: 'Defendant policy reference',
        OrgPolicyCaseAssignedRole: '[RESPONDENTSOLICITORONESPEC]',
        Organisation: {
          OrganisationID: '79ZRSOU'
        }
      }
    },

    DefendantSolicitorEmail: {
      respondentSolicitor1EmailAddress: 'civilunspecified@gmail.com'
    },

    ClaimAmount: {
      claimAmountBreakup: [
        {
          id: 'c18d5f8d-06fa-477d-ac09-5b6129828a5b',
          value: {
            claimReason: 'Test reason',
            claimAmount: '11222'
          }
        }
      ]
    },

    ClaimAmountDetails: {
      claimAmountBreakupSummaryObject: ' | Description | Amount | \n |---|---| \n | Test reason | £ 11222 |\n  | **Total** | £ 11222 | ',
      superClaimType: 'SPEC_CLAIM',
      totalClaimAmount: '11222'
    },

    ClaimInterest: {
      claimInterests: 'No'
    },

    PbaNumber: {
      applicantSolicitor1PbaAccounts:{
        value: {
          code: '4fe1e47c-d40c-4c3c-bd71-60eab54418cd',
          label: 'PBA0088192'
        }
      },
      claimFee: {
        calculatedAmountInPence: '150000',
        code: 'FEE0209',
      }
    },

    PaymentReference: {
      claimIssuedPaymentDetails: {
        customerReference: 'Applicant references'
      }
    },

    StatementOfTruth: {
      uiStatementOfTruth: {
        name: 'John Doe',
        role: 'Test Solicitor'
      }
    }
  };
  switch(mpScenario){
    case 'ONE_V_ONE':
    default:
      return claimData;
  }
};

module.exports = {
  createClaim: () => {
    return {
      midEventData: {
        ...createClaimData('Yes', true),
        ClaimAmountDetails: {
          claimAmountBreakupSummaryObject: ' | Description | Amount | \n |---|---| \n | Test reason | £ 11222 |\n  | **Total** | £ 11222 | ',
          superClaimType: 'SPEC_CLAIM',
          totalClaimAmount: '11222'
        },
      },
    };
  }
};
