const {date, element, buildAddress} = require('../../api/dataHelper');
module.exports = {
  userInput: {
    ResponseConfirmNameAddress: {
      specAoSApplicantCorrespondenceAddressRequired: 'Yes'
    },
    ResponseConfirmDetails: {
      specAoSRespondentCorrespondenceAddressRequired: 'Yes'
    },
    RespondentResponseTypeSpec: {
      respondent1ClaimResponseTypeForSpec: 'FULL_DEFENCE'
    },
    defenceRoute: {
      defenceRouteRequired: 'DISPUTES_THE_CLAIM'
    },
    Upload: {
      detailsOfWhyDoesYouDisputeTheClaim: 'details'
    },
    HowToAddTimeline: {
      specClaimResponseTimelineList: 'MANUAL'
    },
    FileDirectionsQuestionnaire: {
      respondent1DQFileDirectionsQuestionnaire: {
        explainedToClient: ['CONFIRM'],
        oneMonthStayRequested: 'Yes',
        reactionProtocolCompliedWith: 'Yes'
      }
    },
    DisclosureOfElectronicDocumentsLRspec: {
      specRespondent1DQDisclosureOfElectronicDocuments: {
        reachedAgreement: 'Yes'
      }
    },
    Experts: {
      respondent1DQExperts: {
        expertRequired: 'No'
      }
    },
    Witnesses: {
      respondent1DQWitnesses: {
        witnessesToAppear: 'No'
      }
    },
    Language: {
      respondent1DQLanguage: {
        evidence: 'ENGLISH',
        court: 'ENGLISH',
        documents: 'ENGLISH'
      }
    },
    HearingLRspec: {
      respondent1DQHearing: {
        hearingLength: 'ONE_DAY',
        unavailableDatesRequired: 'No'
      },
    },
    RequestedCourtLocationLRspec: {
      responseClaimCourtLocationRequired: 'No'
    },
    Applications: {
      respondent1DQFutureApplications: {
        intentionToMakeFutureApplications: 'No'
      }
    },
    StatementOfTruth: {
      uiStatementOfTruth: {
        name: 'name',
        role: 'role'
      }
    }
  },
  midEventData: {
    RespondentResponseTypeSpec: {
      specFullDefenceOrPartAdmission: 'Yes',
      multiPartyResponseTypeFlags: 'FULL_DEFENCE',
      specFullDefenceOrPartAdmission1V1: 'Yes',
      specDefenceFullAdmittedRequired: 'No'
    },
    defenceRoute: {
      specPaidLessAmountOrDisputesOrPartAdmission: 'Yes',
      responseClaimTrack: 'FAST_CLAIM',
      specDisputesOrPartAdmission: 'Yes'
    }
  },
  midEventGeneratedData: {}
};
