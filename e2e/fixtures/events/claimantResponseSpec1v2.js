module.exports = {
  claimantResponse: (response = 'FULL_DEFENCE') => {
    const responseData = {
      userInput: {
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
          applicant1ClaimWitnesses: '1'
        },

        Language: {
          applicant1DQLanguage: {
            court: 'ENGLISH',
            documents: 'ENGLISH',
            evidence: 'ENGLISH'
          }
        },

        Hearing: {
          applicant1DQSmallClaimHearing: {
            unavailableDatesRequired: 'No'
          }
        },

        ApplicantCourtLocationLRspec: {
          applicant1DQRequestedCourt: {
            requestHearingAtSpecificCourt: 'No'
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

      },
      midEventData: {
        Hearing: {
          respondent1DQHearing: {
            unavailableDatesRequired: 'No'
          },
          respondent1DQVulnerabilityQuestions: {
            vulnerabilityAdjustmentsRequired: 'No'
          },
          respondent1DQStatementOfTruth: {
            name: 'name',
            role: 'role'
          },
          businessProcess: {
            status: 'FINISHED',
            camundaEvent: 'DEFENDANT_RESPONSE_SPEC'
          }
        },
      },
      midEventGeneratedData: {}
    };

    switch (response) {
      case 'FULL_DEFENCE':
        responseData.userInput = {
          ...responseData.userInput,
          Experts: {
            respondent1DQDisclosureReport: {
              disclosureFormFiledAndServed: 'Yes',
              disclosureProposalAgreed: 'Yes',
              draftOrderNumber: '123'
            },

          },

          Witnesses: {
            respondent1DQHearing: {
              hearingLength: 'ONE_DAY',
              unavailableDatesRequired: 'No'
            },
          },
          StatementOfTruth: {
            respondent1DQVulnerabilityQuestions: {
              vulnerabilityAdjustmentsRequired: 'Yes',
              vulnerabilityAdjustments: 'test'
            },

            applicant1DQHearing: {
              hearingLength: 'ONE_DAY',
              unavailableDatesRequired: 'No'
            },

            uiStatementOfTruth: {
              name: 'John Doe',
              role: 'Test Solicitor'
            },
            respondent1DQStatementOfTruth: {
              name: 'Test',
              role: 'Worker'
            },

            businessProcess: {
              status: 'FINISHED'
            }

          },

          FileDirectionsQuestionnaire: {
            respondent1DQFileDirectionsQuestionnaire: {
              explainedToClient: ['CONFIRM'],
              oneMonthStayRequested: 'No',
              reactionProtocolCompliedWith: 'No',
              reactionProtocolNotCompliedWithReason: 'reason'
            },
          }
        };

        responseData.midEventData = {
          ...responseData.midEventData,
          Experts: {
            respondent1DQFileDirectionsQuestionnaire: {
              oneMonthStayRequested: 'No'
            },

            respondent1DQExperts: {
              expertRequired: 'No'
            }
          },
          StatementOfTruth: {
            respondent1DQDisclosureReport: {
              disclosureFormFiledAndServed: 'Yes',
              disclosureProposalAgreed: 'Yes',
              draftOrderNumber: '123'
            }
          }
        };

        break;
    }

    return responseData;
  }
};
