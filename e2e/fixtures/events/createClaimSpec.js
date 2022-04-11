const {listElement, buildAddress } = require('../../api/dataHelper');

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

let selectedPba = listElement('PBA0088192');
const validPba = listElement('PBA0088192');
const invalidPba = listElement('PBA0078095');

const createClaimData = (legalRepresentation, useValidPba, mpScenario = 'ONE_V_ONE') => {
  selectedPba = useValidPba ? validPba : invalidPba;
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
      },

      applicantSolicitor1UserDetails: {
        email: 'civilunspecified@gmail.com',
        id: 'c18d5f8d-06fa-477d-ac09-5b6129828a5b'
      }
    },

    ClaimantSolicitorOrganisation: {
      applicant1OrganisationPolicy: {
        OrgPolicyReference: 'Claimant policy reference',
        OrgPolicyCaseAssignedRole: '[APPLICANTSOLICITORONESPEC]',
        Organisation: {
          OrganisationID: 'Q1KOKP2'
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
            claimAmount: '11234'
          }
        }
      ],
      claimAmountBreakupSummaryObject: ' | Description | Amount | \n |---|---| \n | Test reason | £ 112.34 |\n  | **Total** | £ 112.34 | ',
      totalClaimAmount: 112.34
    },


    ClaimInterest: {
      claimInterest: 'No',
      calculatedInterest: ' | Description | Amount | \n |---|---| \n | Claim amount | £ 112.34 | \n | Interest amount | £ 0 | \n | Total amount | £ 112.34 |'
    },

    // why this is not need
    // InterestSummary: {
    // },

    PbaNumber: {
      applicantSolicitor1PbaAccounts:{
        value: selectedPba
      },
      claimFee: {
        calculatedAmountInPence: '150000',
        code: 'FEE0209'
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
  createClaim: (mpScenario = 'ONE_V_ONE') => {
    return {
      midEventData: {
        StatementOfTruth: {
          applicantSolicitor1ClaimStatementOfTruth: {}
        },
      },
      valid: {
        ...createClaimData('Yes', true, mpScenario),
      }
    };
  }
};
