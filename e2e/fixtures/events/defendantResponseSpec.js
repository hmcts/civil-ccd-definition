module.exports = {
  respondToClaim: (response = 'FULL_DEFENCE') => {
    const responseData = {
      userInput: {
        ResponseConfirmNameAddress: {
          specAoSApplicantCorrespondenceAddressRequired: 'Yes',
        },
        ResponseConfirmDetails: {
          specAoSRespondentCorrespondenceAddressRequired: 'Yes'
        },
      },
      midEventGeneratedData: {
        RespondentResponseTypeSpec: {
          showConditionFlags: 'object'
        },
        defenceAdmittedPartRoute: {
          showConditionFlags: 'object'
        },
        WhenWillClaimBePaid: {
          showConditionFlags: 'object'
        },
        ResponseConfirmDetails: {
          showConditionFlags: 'object'
        }
      }
    };

    switch (response) {
      case 'FULL_DEFENCE':
        responseData.userInput = {
          ...responseData.userInput,
          RespondentResponseTypeSpec: {
            respondent1ClaimResponseTypeForSpec: 'FULL_DEFENCE'
          },
          defenceRoute: {
            defenceRouteRequired: 'DISPUTES_THE_CLAIM'
          },
          Mediation: {
            responseClaimMediationSpecRequired: 'No'
          },
          SmallClaimExperts: {
            responseClaimExpertSpecRequired: 'No'
          },
          SmallClaimWitnesses: {
            responseClaimWitnesses: '10'
          },
          Language: {
            respondent1DQLanguage: {
              evidence: 'ENGLISH',
              court: 'ENGLISH',
              documents: 'ENGLISH'
            }
          },
          SmaillClaimHearing: {
            SmallClaimHearingInterpreterDescription: 'test',
            SmallClaimHearingInterpreterRequired: 'Yes',
            respondent1DQHearingSmallClaim: {
              unavailableDatesRequired: 'No',
            },
          },
          RequestedCourtLocationLRspec: {
            responseClaimCourtLocationRequired: 'No'
          },
          HearingSupport: {
            respondent1DQHearingSupport: {
              signLanguageRequired: null,
              languageToBeInterpreted: null,
              otherSupport: null,
              requirements: ['DISABLED_ACCESS', 'HEARING_LOOPS']
            }
          },
          VulnerabilityQuestions: {
            respondent1DQVulnerabilityQuestions: {
              vulnerabilityAdjustmentsRequired: 'Yes',
              vulnerabilityAdjustments: 'test'
            }
          },
          StatementOfTruth: {
            uiStatementOfTruth: {
              name: 'Test',
              role: 'Worker'
            },
            respondent1DQHearing: {
              unavailableDatesRequired: 'No'
            }
          }
        };
        responseData.midEventData = {
          ...responseData.midEventData,
          RespondentResponseTypeSpec: {
            specFullDefenceOrPartAdmission: 'Yes',
            multiPartyResponseTypeFlags: 'FULL_DEFENCE',
            specFullDefenceOrPartAdmission1V1: 'Yes',
            specDefenceFullAdmittedRequired: 'No',
            specFullAdmissionOrPartAdmission: 'No',
            respondentClaimResponseTypeForSpecGeneric: 'FULL_DEFENCE'
          },

          defenceRoute: {
            specPaidLessAmountOrDisputesOrPartAdmission: 'Yes',
            responseClaimTrack: 'SMALL_CLAIM',
            specDisputesOrPartAdmission: 'Yes',
            respondent1ClaimResponsePaymentAdmissionForSpec: 'DID_NOT_PAY'
          },

          ResponseConfirmNameAddress: {
            businessProcess: {
              status: 'FINISHED',
              camundaEvent: 'CREATE_CLAIM_SPEC'
            },
          },
        };
        break;
      case 'FULL_ADMISSION':
        responseData.userInput = {
          ...responseData.userInput,
          RespondentResponseTypeSpec: {
            respondent1ClaimResponseTypeForSpec: 'FULL_ADMISSION',
            respondentClaimResponseTypeForSpecGeneric: 'FULL_ADMISSION'
          },
          defenceAdmittedPartRoute: {
            specDefenceFullAdmittedRequired: 'No'
          },
          WhenWillClaimBePaid: {
            defenceAdmitPartPaymentTimeRouteRequired: 'IMMEDIATELY'
          },
          Upload: {
            detailsOfWhyDoesYouDisputeTheClaim: 'details'
          },
          HowToAddTimeline: {
            specClaimResponseTimelineList: 'MANUAL'
          },
          ResponseConfirmNameAddress: {
            businessProcess: {
              status: 'FINISHED',
              camundaEvent: 'CREATE_CLAIM_SPEC'
            },
          },
          defenceRoute: {
            specPaidLessAmountOrDisputesOrPartAdmission: 'No',
          }
        };
        responseData.midEventData = {
          ...responseData.midEventData,
          RespondentResponseTypeSpec: {
            specFullDefenceOrPartAdmission: 'No',
            multiPartyResponseTypeFlags: 'FULL_ADMISSION',
            specFullDefenceOrPartAdmission1V1: 'No',
            specDefenceFullAdmittedRequired: 'No',
            specFullAdmitPaid: 'No',
            specFullAdmissionOrPartAdmission: 'No',
            fullAdmissionAndFullAmountPaid: 'No',
            partAdmittedByEitherRespondents: 'No',
            defenceAdmitPartPaymentTimeRouteGeneric: 'IMMEDIATELY'
          },
          defenceAdmittedPartRoute: {
            specPaidLessAmountOrDisputesOrPartAdmission: 'No',
            responseClaimTrack: 'SMALL_CLAIM',
            specDisputesOrPartAdmission: 'No'
          },
          defenceRoute: {
            respondent1ClaimResponsePaymentAdmissionForSpec: 'DID_NOT_PAY',
            responseClaimTrack: 'SMALL_CLAIM',
            specDisputesOrPartAdmission: 'No'
          },
        };
        break;
      case 'PART_ADMISSION':
        responseData.userInput = {
          ...responseData.userInput,
          RespondentResponseTypeSpec: {
            respondent1ClaimResponseTypeForSpec: 'PART_ADMISSION'
          },
          defenceAdmittedPartRoute: {
            specDefenceAdmittedRequired: 'No',
            respondToAdmittedClaimOwingAmount: '200000'
          },
          WhenWillClaimBePaid: {
            defenceAdmitPartPaymentTimeRouteRequired: 'IMMEDIATELY'
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
          RequestedCourtLocationLRspec: {
            responseClaimCourtLocationRequired: 'No'
          },
          Applications: {
            respondent1DQFutureApplications: {
              intentionToMakeFutureApplications: 'No'
            }
          }
        };
        responseData.midEventData = {
          ...responseData.midEventData,
          RespondentResponseTypeSpec: {
            specFullDefenceOrPartAdmission: 'Yes',
            multiPartyResponseTypeFlags: 'NOT_FULL_DEFENCE',
            specFullDefenceOrPartAdmission1V1: 'Yes',
            specDefenceFullAdmittedRequired: 'No',
            specPartAdmitPaid: 'No',
            specFullAdmissionOrPartAdmission: 'No',
            respondentClaimResponseTypeForSpecGeneric: 'PART_ADMISSION',
            fullAdmissionAndFullAmountPaid: 'No',
            partAdmittedByEitherRespondents: 'No',
            defenceAdmitPartPaymentTimeRouteGeneric: 'IMMEDIATELY'
          },

          defenceAdmittedPartRoute: {
            specPaidLessAmountOrDisputesOrPartAdmission: 'Yes',
            responseClaimTrack: 'SMALL_CLAIM',
            specDisputesOrPartAdmission: 'Yes',
            respondToAdmittedClaimOwingAmountPounds: '2000.00'
          },

          ResponseConfirmNameAddress: {
            businessProcess: {
              status: 'FINISHED',
              camundaEvent: 'CREATE_CLAIM_SPEC'
            }
          },

          defenceRoute: {
            respondent1ClaimResponsePaymentAdmissionForSpec: 'DID_NOT_PAY',
            responseClaimTrack: 'SMALL_CLAIM',
            specDisputesOrPartAdmission: 'Yes',
            specPaidLessAmountOrDisputesOrPartAdmission: 'Yes'
          }
        };
        break;
      case 'COUNTER_CLAIM':
        responseData.userInput = {
          ...responseData.userInput,
          RespondentResponseTypeSpec: {
            respondent1ClaimResponseTypeForSpec: 'COUNTER_CLAIM'
          },
        };
        responseData.midEventData = {
          ...responseData.midEventData,
          RespondentResponseTypeSpec: {
            multiPartyResponseTypeFlags: 'COUNTER_ADMIT_OR_ADMIT_PART',
            specAoSApplicantCorrespondenceAddressRequired: 'Yes',
            specAoSRespondentCorrespondenceAddressRequired: 'Yes',
            specFullAdmissionOrPartAdmission: 'No',
            specFullDefenceOrPartAdmission: 'No',
            specFullDefenceOrPartAdmission1V1: null,
            specPaidLessAmountOrDisputesOrPartAdmission: null,
            specDefenceFullAdmittedRequired: 'No',
            specApplicantCorrespondenceAddressRequired: 'No',
            specRespondent1Represented: 'Yes',
            respondentClaimResponseTypeForSpecGeneric: 'COUNTER_CLAIM',
            fullAdmissionAndFullAmountPaid: 'No',
            partAdmittedByEitherRespondents: 'No',
            defenceAdmitPartPaymentTimeRouteGeneric: 'IMMEDIATELY'
          },

          ResponseConfirmNameAddress: {
            businessProcess: {
              status: 'FINISHED',
              camundaEvent: 'CREATE_CLAIM_SPEC'
            }
          },

          defenceRoute: {
            respondent1ClaimResponsePaymentAdmissionForSpec: 'DID_NOT_PAY',
            responseClaimTrack: 'SMALL_CLAIM',
            specDisputesOrPartAdmission: 'Yes',
            specPaidLessAmountOrDisputesOrPartAdmission: 'Yes'
          }
        };
        break;

    }

    return responseData;
  }
};
