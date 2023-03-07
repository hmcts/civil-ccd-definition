const {date, element, buildAddress, listElement} = require('../../../api/dataHelper');

module.exports = {
  valid: {
    ConfirmDetails: {
      respondent1: {
        type: 'INDIVIDUAL',
        individualFirstName: 'John',
        individualLastName: 'Doe',
        individualTitle: 'Sir',
        individualDateOfBirth: date(-1),
        primaryAddress: buildAddress('respondent'),
        partyName: 'Sir John Doe',
        partyTypeDisplayValue: 'Individual',
        flags: {
          partyName: 'Sir John Doe',
          roleOnCase: 'Respondent 1'
       }
      },
    },
    RespondentResponseType: {
      respondent1ClaimResponseType: 'FULL_DEFENCE',
      respondent1ClaimResponseTypeToApplicant2: 'FULL_DEFENCE',
      multiPartyResponseTypeFlags: 'FULL_DEFENCE'
    },
    Upload: {
      respondent1ClaimResponseDocument: {
        file: {
          document_url: '${TEST_DOCUMENT_URL}',
          document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
          document_filename: '${TEST_DOCUMENT_FILENAME}'
        }
      }
    },
    FileDirectionsQuestionnaire: {
      respondent1DQFileDirectionsQuestionnaire: {
        explainedToClient: ['CONFIRM'],
        oneMonthStayRequested: 'Yes',
        reactionProtocolCompliedWith: 'Yes'
      }
    },
    DisclosureOfElectronicDocuments: {
      respondent1DQDisclosureOfElectronicDocuments: {
        reachedAgreement: 'No',
        agreementLikely: 'Yes'
      }
    },
    DisclosureOfNonElectronicDocuments: {
      respondent1DQDisclosureOfNonElectronicDocuments: {
        directionsForDisclosureProposed: 'Yes',
        standardDirectionsRequired: 'Yes',
        bespokeDirections: 'directions'
      }
    },
    Experts: {
      respondent1DQExperts: {
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
      respondent1DQWitnesses: {
        witnessesToAppear: 'Yes',
        details: [
          element({
            firstName: 'John',
            lastName: 'Smith',
            phoneNumber: '07012345678',
            emailAddress: 'johnsmith@email.com',
            reasonForWitness: 'None'
          })
        ]
      }
    },
    Language: {
      respondent1DQLanguage: {
        court: 'WELSH',
        documents: 'WELSH'
      }
    },
    Hearing: {
      respondent1DQHearing: {
        unavailableDatesRequired: 'Yes',
        unavailableDates: [
          element({
            unavailableDateType: 'SINGLE_DATE',
            date: date(10)
          }),
          element({
            fromDate: date(30),
            toDate: date(35),
            unavailableDateType: 'DATE_RANGE',
          })
        ]
      }
    },
    DraftDirections: {
      respondent1DQDraftDirections: {
        document_url: '${TEST_DOCUMENT_URL}',
        document_binary_url: '${TEST_DOCUMENT_BINARY_URL}',
        document_filename: '${TEST_DOCUMENT_FILENAME}'
      }
    },
    RequestedCourt: {
      respondent1DQRequestedCourt: {
        responseCourtLocations: {
          list_items: [
            listElement('Liverpool Civil and Family Court - 35, VERNON STREET, CITY SQUARE - L2 2BX')
          ],
          value: listElement('Liverpool Civil and Family Court - 35, VERNON STREET, CITY SQUARE - L2 2BX')
        },
        reasonForHearingAtSpecificCourt: 'No reasons',
        requestHearingAtSpecificCourt: 'Yes'
      }
    },
    HearingSupport: {
      respondent1DQHearingSupport: {
        supportRequirements: 'Yes',
        supportRequirementsAdditional: 'Additional support reasons'
      }
    },
    VulnerabilityQuestions: {
      respondent1DQVulnerabilityQuestions: {
        vulnerabilityAdjustmentsRequired: 'Yes',
        vulnerabilityAdjustments: 'Some reasons 2v1'
      }
    },
    FurtherInformation: {
      respondent1DQFurtherInformation: {
        futureApplications: 'Yes',
        otherInformationForJudge: 'Nope',
        reasonForFutureApplications: 'Nothing'
      }
    },
    StatementOfTruth: {
      uiStatementOfTruth: {
        name: 'John Doe',
        role: 'Tester'
      }
    }
  },
  midEventData: {
    // otherwise applicantSolicitor1ClaimStatementOfTruth: [undefined]
    StatementOfTruth: {
      applicantSolicitor1ClaimStatementOfTruth: {}
    },
  },
  invalid: {
    ConfirmDetails: {
      futureDateOfBirth: {
        respondent1: {
          type: 'INDIVIDUAL',
          individualFirstName: 'John',
          individualLastName: 'Doe',
          individualTitle: 'Sir',
          individualDateOfBirth: date(1),
          primaryAddress: buildAddress('respondent')
        }
      }
    },
    Experts: {
      emptyDetails: {
        respondent1DQExperts: {
          details: [],
          expertRequired: 'Yes',
          expertReportsSent: 'NOT_OBTAINED',
          jointExpertSuitable: 'Yes'
        }
      }
    },
    Hearing: {
      past: {
        respondent1DQHearing: {
          unavailableDatesRequired: 'Yes',
          unavailableDates: [
            element({
              date: date(-1),
              unavailableDateType: 'SINGLE_DATE',
            })
          ]
        }
      },
      moreThanYear: {
        respondent1DQHearing: {
          unavailableDatesRequired: 'Yes',
          unavailableDates: [
            element({
              date: date(367),
              unavailableDateType: 'SINGLE_DATE',
            })
          ]
        }
      },
      wrongDateRange: {
        respondent1DQHearing: {
          unavailableDatesRequired: 'Yes',
          unavailableDates: [
            element({
              fromDate: date(15),
              toDate: date(10),
              unavailableDateType: 'DATE_RANGE',
            })
          ]
        }
      }
    },
  }
};
