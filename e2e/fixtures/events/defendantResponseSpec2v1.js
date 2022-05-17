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
        SingleResponse2v1: {
          defendantSingleResponseToBothClaimants: 'Yes'
        },
        RespondentResponseTypeSpec: {
          respondent1ClaimResponseTypeForSpec: 'FULL_DEFENCE'
        }
      },
    };

    switch (response) {
      case 'FULL_DEFENCE':
        responseData.userInput = {
          ...responseData.userInput,
          RespondentResponseTypeSpec: {
            respondent1ClaimResponseTypeForSpec: 'FULL_DEFENCE',
            claimant1ClaimResponseTypeForSpec: 'FULL_DEFENCE',
            claimant2ClaimResponseTypeForSpec: 'FULL_DEFENCE'
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
              oneMonthStayRequested: 'No',
              reactionProtocolCompliedWith: 'No',
              reactionProtocolNotCompliedWithReason: 'reason'
            }
          },
          DisclosureOfElectronicDocumentsLRspec: {
            specRespondent1DQDisclosureOfElectronicDocuments: {
              agreementLikely: 'No',
              reachedAgreement: 'No',
              reasonForNoAgreement: 'issue'
            }
          },
          DisclosureOfNonElectronicDocumentsLRspec: {
            specRespondent1DQDisclosureOfNonElectronicDocuments: {
              bespokeDirections: 'directions'
            }
          },
          DisclosureReport: {
            respondent1DQDisclosureReport: {
              disclosureFormFiledAndServed: 'Yes',
              disclosureProposalAgreed: 'Yes',
              draftOrderNumber: '123'
            }
          },
          Experts: {
            respondent1DQExperts: {
              expertRequired: 'No'
            },
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
            }
          },
          RequestedCourtLocationLRspec: {
            responseClaimCourtLocationRequired: 'No'
          },
          HearingSupport: {
            respondent1DQHearingSupport: {
              signLanguageRequired: null,
              languageToBeInterpreted: null,
              otherSupport: null,
              requirements: ['DISABLED_ACCESS', 'HEARING_LOOPS'],
            }
          },
          VulnerabilityQuestions: {
            respondent1DQVulnerabilityQuestions: {
              vulnerabilityAdjustmentsRequired: 'Yes',
              vulnerabilityAdjustments: 'test'
            }
          },
          Applications:{
            additionalInformationForJudge: 'information',
            respondent1DQFutureApplications: {
              intentionToMakeFutureApplications: 'No'
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
            multiPartyResponseTypeFlags: 'FULL_DEFENCE',
            respondentClaimResponseTypeForSpecGeneric: 'FULL_DEFENCE',
            sameSolicitorSameResponse: null,
            specFullAdmissionOrPartAdmission: 'No',
            specFullDefenceOrPartAdmission: 'Yes',
            specFullDefenceOrPartAdmission1V1: 'Yes',
            specDefenceFullAdmittedRequired: 'No',
            specPaidLessAmountOrDisputesOrPartAdmission: 'Yes'
          },

          defenceRoute: {
            responseClaimTrack: 'FAST_CLAIM',
            respondent1ClaimResponsePaymentAdmissionForSpec: 'DID_NOT_PAY',
            specDisputesOrPartAdmission: 'Yes'
          },

          Upload: {
            specDisputesOrPartAdmission: 'Yes'
          },

          ResponseConfirmNameAddress: {
            businessProcess: {
              status: 'FINISHED',
              camundaEvent: 'CREATE_CLAIM_SPEC'
            },
          }
        };
        break;
      case 'COUNTER_CLAIM':
        responseData.userInput = {
          ...responseData.userInput,
          RespondentResponseTypeSpec: {
            respondent1ClaimResponseTypeForSpec: 'COUNTER_CLAIM',
            claimant1ClaimResponseTypeForSpec: 'COUNTER_CLAIM'
          },
        };
        responseData.midEventData = {
          ...responseData.midEventData,
          RespondentResponseTypeSpec: {
            responseClaimTrack: null,
            sameSolicitorSameResponse: null,
            specFullAdmissionOrPartAdmission: 'No',
            specFullDefenceOrPartAdmission: 'No',
            specFullDefenceOrPartAdmission1V1: null,
            specPaidLessAmountOrDisputesOrPartAdmission: null,
            multiPartyResponseTypeFlags: 'NOT_FULL_DEFENCE',
            specDefenceFullAdmittedRequired: 'No',
            respondentClaimResponseTypeForSpecGeneric: 'COUNTER_CLAIM'
          },

          ResponseConfirmNameAddress: {
            businessProcess: {
              status: 'FINISHED',
              camundaEvent: 'CREATE_CLAIM_SPEC'
            }
          }
        };
        break;

      case 'FULL_ADMISSION':
        responseData.userInput = {
          ...responseData.userInput,
          SingleResponse2v1: {
            defendantSingleResponseToBothClaimants: 'Yes'
          },
          RespondentResponseTypeSpec: {
            respondent1ClaimResponseTypeForSpec: 'FULL_ADMISSION',
            claimant1ClaimResponseTypeForSpec: 'FULL_ADMISSION',
            claimant2ClaimResponseTypeForSpec: 'FULL_ADMISSION',
            respondentClaimResponseTypeForSpecGeneric: 'FULL_ADMISSION'
          },
          defenceAdmittedPartRoute: {
            responseClaimTrack: 'FAST_CLAIM',
            specDefenceFullAdmittedRequired: 'No',
            specDisputesOrPartAdmission: 'No'
          },
          WhenWillClaimBePaid: {
            defenceAdmitPartPaymentTimeRouteRequired: 'IMMEDIATELY'
          }
        };
        responseData.midEventData = {
          ...responseData.midEventData,
          RespondentResponseTypeSpec: {
            specFullDefenceOrPartAdmission: 'No',
            multiPartyResponseTypeFlags: 'COUNTER_ADMIT_OR_ADMIT_PART',
            specFullDefenceOrPartAdmission1V1: 'No',
            specDefenceFullAdmittedRequired: 'No',
            specFullAdmitPaid: 'No',
            specFullAdmissionOrPartAdmission: 'Yes',
            specPaidLessAmountOrDisputesOrPartAdmission: 'No'

          },
          ResponseConfirmNameAddress: {
            businessProcess: {
              status: 'FINISHED',
              camundaEvent: 'CREATE_CLAIM_SPEC'
            }
          },
        };
        break;

      case 'PART_ADMISSION':
        responseData.userInput = {
          ...responseData.userInput,
          SingleResponse2v1: {
            defendantSingleResponseToBothClaimants: 'Yes'
          },
          RespondentResponseTypeSpec: {
            respondent1ClaimResponseTypeForSpec: 'PART_ADMISSION',
            claimant1ClaimResponseTypeForSpec: 'PART_ADMISSION',
            claimant2ClaimResponseTypeForSpec: 'PART_ADMISSION',
            respondentClaimResponseTypeForSpecGeneric: 'PART_ADMISSION'
          },
          defenceAdmittedPartRoute: {
            specDefenceAdmittedRequired: 'No',
            respondToAdmittedClaimOwingAmount: '200000'
          },
          Upload: {
            detailsOfWhyDoesYouDisputeTheClaim: 'details'
          },
          HowToAddTimeline: {
            specClaimResponseTimelineList: 'MANUAL'
          },
          WhenWillClaimBePaid: {
            defenceAdmitPartPaymentTimeRouteRequired: 'IMMEDIATELY'
          },
          Mediation: {
            responseClaimMediationSpecRequired: 'No'
          },
          SmallClaimExperts: {
            respondToClaim_experts: {
              estimatedCost: '100',
              expertName: 'expert',
              fieldofExpertise: 'field'
            },
            responseClaimExpertSpecRequired: 'Yes'
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
              requirements: ['DISABLED_ACCESS', 'HEARING_LOOPS'],
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
            multiPartyResponseTypeFlags: 'COUNTER_ADMIT_OR_ADMIT_PART',
            specFullDefenceOrPartAdmission1V1: 'Yes',
            specDefenceFullAdmittedRequired: 'No',
            specPartAdmitPaid: 'No',
            specFullAdmissionOrPartAdmission: 'Yes',
            respondentClaimResponseTypeForSpecGeneric: 'PART_ADMISSION'
          },

          defenceAdmittedPartRoute: {
            specPaidLessAmountOrDisputesOrPartAdmission: 'Yes',
            responseClaimTrack: 'FAST_CLAIM',
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
            responseClaimTrack: 'FAST_CLAIM',
            specDisputesOrPartAdmission: 'Yes',
            specPaidLessAmountOrDisputesOrPartAdmission: 'Yes'
          }
        };
        break;
    }

    return responseData;
  }
};
