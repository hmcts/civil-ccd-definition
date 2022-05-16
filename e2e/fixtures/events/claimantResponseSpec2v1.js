module.exports = {
  claimantResponse: () => {
    return {
      userInput: {
        RespondentResponse: {
          applicant1ProceedWithClaimSpec2v1: 'Yes',
        },
        Mediation: {
          applicantMPClaimMediationSpecRequired: {
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
          claimant1ClaimResponseTypeForSpec: 'FULL_DEFENCE',
          claimant2ClaimResponseTypeForSpec: 'FULL_DEFENCE',
          respondent1DQHearing: {
            unavailableDatesRequired: 'No'
          },
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
        },
        StatementOfTruth: {
          applicant1DQHearing: {
            unavailableDatesRequired: 'No'
          }
        }
      },
      midEventGeneratedData: {}
    };
  }
}
;
;
