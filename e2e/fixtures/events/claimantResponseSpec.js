module.exports = {
  claimantResponse: () => {
    return {
      userInput: {
        RespondentResponse: {
          applicant1ProceedWithClaim: 'Yes',
        },
        FileDirectionsQuestionnaire: {
          applicant1DQFileDirectionsQuestionnaire: {
            explainedToClient: ['CONFIRM'],
            oneMonthStayRequested: 'Yes',
            reactionProtocolCompliedWith: 'Yes'
          }
        },
        DisclosureOfElectronicDocuments: {
          applicant1DQDisclosureOfElectronicDocuments: {
            reachedAgreement: 'Yes'
          }
        },
        Experts: {
          applicant1DQExperts: {
            expertRequired: 'No'
          }
        },
        Witnesses: {
          applicant1DQWitnesses: {
            witnessesToAppear: 'No'
          }
        },
        Language: {
          applicant1DQLanguage: {
            evidence: 'ENGLISH',
            court: 'ENGLISH',
            documents: 'ENGLISH'
          }
        },
        Hearing: {
          applicant1DQHearingLRspec: {
            hearingLength: 'ONE_DAY',
            unavailableDatesRequired: 'No'
          }
        },
        ApplicantCourtLocationLRspec: {
          applicant1DQRequestedCourt: {
            requestHearingAtSpecificCourt: 'No'
          }
        },
        Applications: {
          applicant1DQFutureApplications: {
            intentionToMakeFutureApplications: 'No'
          }
        },
        StatementOfTruth: {
          uiStatementOfTruth: {
            name: 'Solicitor name',
            role: 'Solicitor role'
          }
        }
      },
      midEventData: {},
      midEventGeneratedData: {}
    };
  }
}
;
