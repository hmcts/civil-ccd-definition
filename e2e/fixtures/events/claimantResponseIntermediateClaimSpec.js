const {listElement, element} = require('../../api/dataHelper');
const config = require('../../config.js');
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
          FileDirectionsQuestionnaire: {
            applicant1DQFileDirectionsQuestionnaire: {
              explainedToClient: ['CONFIRM'],
              oneMonthStayRequested: 'No',
              reactionProtocolCompliedWith: 'No',
              reactionProtocolNotCompliedWithReason: 'test'
            }
          },
          FixedRecoverableCostsIntermediate: {
            applicant1DQFixedRecoverableCostsIntermediate: {
              isSubjectToFixedRecoverableCostRegime: 'Yes',
              agreedWithOtherParty:'Yes',
              band: 'BAND_4',
              reasons: 'some important reasons'
            }
          },
          DisclosureOfNonElectronicDocuments: {
            specApplicant1DQDisclosureOfNonElectronicDocuments: {
              bespokeDirections: 'directions'
            }
          },
          Experts: {
            applicant1DQExperts: {
              expertRequired: 'Yes',
              expertReportsSent: 'NOT_OBTAINED',
              jointExpertSuitable: 'Yes',
              details: [
                element({
                  firstName: 'John',
                  lastName: 'Doe',
                  emailAddress: 'john@doemail.com',
                  phoneNumber: '07111111111',
                  fieldOfExpertise: 'None',
                  whyRequired: 'Testing',
                  estimatedCost: '10000'
                })
              ]
            }
          },
          Witnesses: {
            applicant1DQWitnesses: {
              details: [
                element({
                  firstName: 'John',
                  lastName: 'Smith',
                  phoneNumber: '07012345678',
                  emailAddress: 'johnsmith@email.com',
                  reasonForWitness: 'None'
                })
              ],
              witnessesToAppear: 'Yes'}
          },
          Language: {
            applicant1DQLanguage: {
              court: 'ENGLISH',
              documents: 'ENGLISH'
            }
          },
          Hearing: {
            applicant1DQHearingLRspec: {
              hearingLength: 'ONE_DAY',
              unavailableDatesRequired: 'No',
            }
          },
          ApplicantCourtLocationLRspec: {
            applicant1DQRequestedCourt: {
              responseCourtLocations: {
                list_items: [
                  listElement(config.claimantSelectedCourt)
                ],
                value: listElement(config.claimantSelectedCourt)
              },
              reasonForHearingAtSpecificCourt: 'Reasons'
            },
            applicant1DQRemoteHearingLRspec: {
              remoteHearingRequested: 'Yes',
              reasonForRemoteHearing: 'Some reason'
            }
          },
          HearingSupport: {
            applicant1DQHearingSupport: {
              supportRequirements: 'Yes',
              supportRequirementsAdditional: 'Additional support reasons'
            }
          },
          VulnerabilityQuestions: {
            applicant1DQVulnerabilityQuestions: {
              vulnerabilityAdjustmentsRequired: 'Yes',
              vulnerabilityAdjustments: 'test'
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
            respondent1DQStatementOfTruth: {
              name: 'Test',
              role: 'Worker'
            }
          }
        };
        break;
      case 'PART_ADMISSION':
        responseData.userInput = {
          ...responseData.userInput,
          RespondentResponse: {
            applicant1ProceedWithClaim: 'Yes',
          },
          FixedRecoverableCostsIntermediate: {
            applicant1DQFixedRecoverableCostsIntermediate: {
              isSubjectToFixedRecoverableCostRegime: 'Yes',
              agreedWithOtherParty:'Yes',
              band: 'BAND_4',
              reasons: 'some important reasons'
            }
          },
        };
        responseData.midEventData = {
          ...responseData.midEventData,
        };
        break;
      case 'FULL_ADMISSION':
        responseData.userInput = {
          ...responseData.userInput
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
