const {listElement, buildAddress} = require('../../api/dataHelper');
const config = require('../../config.js');

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
  partyTypeDisplayValue: 'Individual',
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

const validPba = listElement('PBA0088192');
const invalidPba = listElement('PBA0078095');

module.exports = {
  createClaim: () => {
    /**
     * information input by the user.
     * each element within "valid" is in the form
     * pageId: {
     *   fieldId: fieldValue
     * }
     *
     * although fields can be nested as they are in the screens.
     */
    const sentData = {
      References: {
        superClaimType: 'SPEC_CLAIM',
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
          correct: 'No',
        },
        applicantSolicitor1UserDetails: {
          email: 'hmcts.civil+organisation.1.solicitor.1@gmail.com'
        }
      },
      ClaimantSolicitorOrganisation: {
        applicant1OrganisationPolicy: {
          OrgPolicyReference: 'Claimant policy reference',
          OrgPolicyCaseAssignedRole: '[APPLICANTSOLICITORONESPEC]',
          Organisation: {
            OrganisationID: config.runningEnv === 'demo' ? 'B04IXE4' : 'Q1KOKP2'
          }
        }
      },
      specCorrespondenceAddress: {
        specApplicantCorrespondenceAddressRequired: 'No'
      },
      Defendant: {
        respondent1: respondent1WithPartyName
      },
      LegalRepresentation: {
        specRespondent1Represented: 'Yes'
      },
      DefendantSolicitorOrganisation: {
        respondent1OrgRegistered: 'Yes',
        respondent1OrganisationPolicy: {
          OrgPolicyReference: 'Defendant policy reference',
          OrgPolicyCaseAssignedRole: '[RESPONDENTSOLICITORONESPEC]',
          Organisation: {
            OrganisationID: config.runningEnv === 'demo' ? 'DAWY9LJ' : '79ZRSOU'
          },
        },
      },
      DefendantSolicitorEmail: {
        respondentSolicitor1EmailAddress: 'civilunspecified@gmail.com'
      },
      specRespondentCorrespondenceAddress: {
        specRespondentCorrespondenceAddressRequired: 'No'
      },
      AddAnotherDefendant: {
        addRespondent2: 'No'
      },
      Details: {
        detailsOfClaim: 'Test details of claim'
      },
      ClaimTimeline: {
        timelineOfEvents: [{
          value: {
            timelineDate: '2021-02-01',
            timelineDescription: 'event 1'
          }
        }]
      },
      EvidenceList: {
        speclistYourEvidenceList: [{
          value: {
            evidenceType: 'CONTRACTS_AND_AGREEMENTS',
            contractAndAgreementsEvidence: 'evidence details'
          }
        }]
      },
      ClaimAmount: {
        claimAmountBreakup: [{
          value: {
            claimReason: 'amount reason',
            claimAmount: '1500000'
          }
        }]
      },
      ClaimInterest: {
        claimInterest: 'No'
      },
      InterestSummary: {
        // no user input, placeholder bc calculated fields
        claimIssuedPaymentDetails: {
          customerReference: 'Applicant reference'
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
      StatementOfTruth: {
        uiStatementOfTruth: {
          name: 'John Doe',
          role: 'Test Solicitor'
        }
      },
    };

    /**
     * Each time we press the continue button caseData is sent to backend and it comes back possibly modified.
     * Each key in this object describes the foreseeable modifications on caseData that backend does, like:
     * pageId: {
     *   fieldId: valueId // may be nested
     * }
     */
    const midEventData = {
      Notifications: {
        applicantSolicitor1CheckEmail: {
          email: sentData.Notifications.applicantSolicitor1UserDetails.email
        }
      },
      ClaimAmount: {
        totalClaimAmount: (+sentData.ClaimAmount.claimAmountBreakup[0].value.claimAmount)/100
      },
      ClaimAmountDetails: {
        superClaimType: 'SPEC_CLAIM'
      },
      InterestSummary: {
        totalInterest: 0,
        applicantSolicitor1PbaAccountsIsEmpty: 'No',
        claimFee: {
          calculatedAmountInPence: '150000',
          code: 'FEE0209',
          version: '3'
        }
      }
    };

    /**
     * Some modifications by backend are not foreseeable. For instance, lists of elements may come with an
     * assigned, generated id. Each key in this object describes the generated modifications on caseData like:
     * pageId: {
     *   fieldId: null  // may be nested
     * }
     */
    const midEventGeneratedData = {
      ClaimAmount: {
        speclistYourEvidenceList: {
          id: 'string'
        },
        claimAmountBreakupSummaryObject: 'string',
        timelineOfEvents: {
          id: 'string'
        },
        claimAmountBreakup: {
          id: 'string'
        }
      },
      ClaimInterest: {
        calculatedInterest: 'string'
      },
      InterestSummary: {
        applicantSolicitor1PbaAccounts: {
          list_items: 'object'
        }
      }
    };

    return {
      userInput: sentData,
      midEventData: midEventData,
      midEventGeneratedData: midEventGeneratedData
    };
  }
};
