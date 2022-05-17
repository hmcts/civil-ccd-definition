module.exports = {
  respondToClaim: (response = 'FULL_DEFENCE') => {
    const responseData = {
      userInput: {
        ResponseConfirmNameAddress: {
          specAoSApplicantCorrespondenceAddressRequired: 'Yes',
          specAoSRespondent2HomeAddressRequired: 'Yes'
        },
        ResponseConfirmDetails: {
          specAoSRespondentCorrespondenceAddressRequired: 'Yes',
        },
        SingleResponse: {
          respondentResponseIsSame: 'Yes'
        },
        HowToAddTimeline: {
          specClaimResponseTimelineList: 'MANUAL'
        },
        Mediation: {
          responseClaimMediationSpecRequired: 'Yes'
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
        SmallClaimExperts: {
          responseClaimExpertSpecRequired: 'No'
        },
        SmallClaimWitnesses: {
          responseClaimWitnesses: '1'
        },
        Language: {
          respondent1DQLanguage: {
            evidence: 'ENGLISH',
            court: 'ENGLISH',
            documents: 'ENGLISH'
          }
        },
        SmallClaimHearing: {
          respondent1DQHearingSmallClaim: {
            unavailableDatesRequired: 'No'
          },
          SmallClaimHearingInterpreterRequired: 'No'
        },
        RequestedCourtLocationLRspec: {
          responseClaimCourtLocationRequired: 'No'
        },
        VulnerabilityQuestions: {
          respondent1DQVulnerabilityQuestions: {
            vulnerabilityAdjustmentsRequired: 'No'
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
        ResponseConfirmDetails: {
          sameSolicitorSameResponse: 'Yes'
        },
        StatementOfTruth: {
          respondent1DQHearing: {
            unavailableDatesRequired: 'No'
          }
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
            defenceRouteRequired: 'DISPUTES_THE_CLAIM',
          },
          Upload: {
            detailsOfWhyDoesYouDisputeTheClaim: 'details'
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
          }
        };
        break;
      case 'FULL_ADMISSION':
        responseData.userInput = {
          ...responseData.userInput,
          RespondentResponseTypeSpec: {
            respondent1ClaimResponseTypeForSpec: 'FULL_ADMISSION',
            respondentClaimResponseTypeForSpecGeneric: 'FULL_ADMISSION',
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
            multiPartyResponseTypeFlags: 'NOT_FULL_DEFENCE',
            specFullDefenceOrPartAdmission1V1: 'No',
            specDefenceFullAdmittedRequired: 'No',
            specFullAdmitPaid: 'No',
            specFullAdmissionOrPartAdmission: 'Yes'
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
          }
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
            respondToAdmittedClaimOwingAmount: '20000'
          },
          WhenWillClaimBePaid: {
            defenceAdmitPartPaymentTimeRouteRequired: 'IMMEDIATELY'
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
            specFullAdmissionOrPartAdmission: 'Yes',
            respondentClaimResponseTypeForSpecGeneric: 'PART_ADMISSION'
          },

          defenceAdmittedPartRoute: {
            specPaidLessAmountOrDisputesOrPartAdmission: 'Yes',
            responseClaimTrack: 'SMALL_CLAIM',
            specDisputesOrPartAdmission: 'Yes',
            respondToAdmittedClaimOwingAmountPounds: '200.00'
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
          }
        };
        responseData.midEventData = {
          ...responseData.midEventData,
          RespondentResponseTypeSpec: {
            multiPartyResponseTypeFlags: 'NOT_FULL_DEFENCE',
            specAoSApplicantCorrespondenceAddressRequired: 'Yes',
            specAoSRespondentCorrespondenceAddressRequired: 'Yes',
            specFullAdmissionOrPartAdmission: 'No',
            specFullDefenceOrPartAdmission: 'No',
            specFullDefenceOrPartAdmission1V1: null,
            specPaidLessAmountOrDisputesOrPartAdmission: null,
            specDefenceFullAdmittedRequired: 'No',
            specApplicantCorrespondenceAddressRequired: 'No',
            specRespondent1Represented: 'Yes',
            respondentClaimResponseTypeForSpecGeneric: 'COUNTER_CLAIM'
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
