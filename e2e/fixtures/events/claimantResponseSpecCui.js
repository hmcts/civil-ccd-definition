const {listElement} = require('../../api/dataHelper');
module.exports = {
  claimantResponse: (response = 'FULL_DEFENCE') => {
    const responseData = {
    };
    switch (response) {
      case 'FULL_DEFENCE':
        responseData.userInput = {
          ...responseData.userInput,
          RespondentResponse: {
            applicant1ProceedWithClaim: 'Yes',
          },
          Mediation: {
            applicant1ClaimMediationSpecRequired: {
              hasAgreedFreeMediation: 'Yes'
            }
          },
          SmallClaimExperts: {
            applicant1ClaimExpertSpecRequired: 'No'
          },
          SmallClaimWitnesses: {
            applicant1ClaimWitnesses: '10'
          },
          Language: {
            applicant1DQLanguage: {
              evidence: 'ENGLISH',
              court: 'ENGLISH',
              documents: 'ENGLISH'
            }
          },
          Hearing: {
            applicant1DQSmallClaimHearing: {
              unavailableDatesRequired: 'No'
            }
          },
          ApplicantCourtLocationLRspec: {
            applicant1DQRequestedCourt: {
              responseCourtLocations: {
                list_items: [
                  listElement('Barnet Civil and Family Centre - ST MARY\'S COURT, REGENTS PARK ROAD - N3 1BQ')
                ],
                value: listElement('Barnet Civil and Family Centre - ST MARY\'S COURT, REGENTS PARK ROAD - N3 1BQ')
              },
              reasonForHearingAtSpecificCourt: 'Reasons'
            }
          },
          VulnerabilityQuestions: {
            applicant1DQVulnerabilityQuestions: {
              vulnerabilityAdjustmentsRequired: 'No'
            }
          },
          StatementOfTruth: {
            uiStatementOfTruth: {
              name: 'Solicitor name',
              role: 'Solicitor role'
            }
          }
        };
        responseData.midEventData = {
          ...responseData.midEventData,
          Hearing: {
            respondent1DQVulnerabilityQuestions: {
              vulnerabilityAdjustmentsRequired: 'Yes',
              vulnerabilityAdjustments: 'test'
            },
            respondent1DQStatementOfTruth: {
              name: 'Test',
              role: 'Worker'
            },
            businessProcess: {
              status: 'FINISHED',
              camundaEvent: 'DEFENDANT_RESPONSE_SPEC'
            }
          }
        };
        break;
      case 'PART_ADMISSION':
        responseData.userInput = {
          ...responseData.userInput,
          RespondentResponse: {
            applicant1ProceedWithClaim: 'Yes',
            applicant1AcceptAdmitAmountPaidSpec: 'Yes',

            applicant1AcceptPartAdmitPaymentPlanSpec: 'No',
            applicant1FullAdmitConfirmAmountPaidSpec: 'Yes'
          },
          CcjPaymentPaidSome: {
            ccjPaymentPaidSomeOption: 'Yes',
            ccjPaymentPaidSomeAmount: '1000',
          },
          FixedCost: {
            ccjJudgmentFixedCostOption: 'Yes',
          },
          CcjJudgmentSummary: {
            ccjJudgmentAmountClaimAmount: '1000',
            ccjJudgmentAmountInterestToDate: '35',
            ccjJudgmentAmountClaimFee: '100',
            ccjJudgmentFixedCostAmount: '40',
            ccjJudgmentAmountSubtotal: '1175',
            ccjPaymentPaidSomeAmountInPounds: '10',
            ccjJudgmentTotalStillOwed: '1165'
          },
          IntentionToSettleClaim: {
            applicant1PartAdmitIntentionToSettleClaimSpec: 'No',
            applicant1PartAdmitRejectReasonSpec: 'test'
          },
          Mediation: {
            applicantMPClaimMediationSpecRequired: {
              hasAgreedFreeMediation: 'Yes'
            }
          }
        };
        responseData.midEventData = {
          ...responseData.midEventData,
        };
        break;

      case 'FULL_ADMISSION':
        responseData.userInput = {
          ...responseData.userInput,
          RespondentResponse: {
            applicant1AcceptFullAdmitPaymentPlanSpec: 'Yes',
            applicant1ProceedWithClaim: 'Yes',
          },
          RespondentProposedRepayment: {
            applicant1RepaymentOptionForDefendantSpec: 'SET_DATE',
          },
          PaymentDate: {
            applicant1RequestedPaymentDateForDefendantSpec : '2220-01-01'
          },
          SuggestInstalments: {
            applicant1SuggestInstalmentsFirstRepaymentDateForDefendantSpec : '2220-01-01',
            applicant1SuggestInstalmentsRepaymentFrequencyForDefendantSpec: 'ONCE_ONE_WEEK',
            applicant1SuggestInstalmentsPaymentAmountForDefendantSpec: '3'
          },
          Mediation: {
            applicantMPClaimMediationSpecRequired: {
              hasAgreedFreeMediation: 'Yes'
            }
          }
        };
        responseData.midEventData = {
          ...responseData.midEventData,
        };
        break;

      case 'NOT_PROCEED':
        responseData.userInput = {
          ...responseData.userInput,
          RespondentResponse: {
            applicant1ProceedWithClaim: 'No',
          },
        };
        responseData.midEventData = {
          ...responseData.midEventData,
        };
        break;
    }
    return responseData;
  }
};
