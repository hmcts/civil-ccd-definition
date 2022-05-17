module.exports = {
  respondToClaim: (response = 'FULL_DEFENCE') => {
    const responseData = {
      userInput: {
        ResponseConfirmNameAddress: {
          specAoSApplicantCorrespondenceAddressRequired: 'Yes',
          specAoSRespondent2HomeAddressRequired: 'Yes'
        },
        ResponseConfirmDetails: {
          specAoSRespondentCorrespondenceAddressRequired: 'Yes'
        },
      },
    };
        // RespondentResponseTypeSpec: {
        //   respondent1ClaimResponseTypeForSpec: 'FULL_DEFENCE'
        // },
        // defenceRoute: {
        //   defenceRouteRequired: 'DISPUTES_THE_CLAIM'
        // },
        // Upload: {
        //   detailsOfWhyDoesYouDisputeTheClaim: 'details'
        // },
        // HowToAddTimeline: {
        //   specClaimResponseTimelineList: 'MANUAL'
        // },
        // FileDirectionsQuestionnaire: {
        //   respondent1DQFileDirectionsQuestionnaire: {
        //     explainedToClient: ['CONFIRM'],
        //     oneMonthStayRequested: 'Yes',
        //     reactionProtocolCompliedWith: 'Yes'
        //   }
        // },
        // DisclosureOfElectronicDocumentsLRspec: {
        //   specRespondent1DQDisclosureOfElectronicDocuments: {
        //     reachedAgreement: 'Yes'
        //   }
        // },
        // Experts: {
        //   respondent1DQExperts: {
        //     expertRequired: 'No'
        //   },
        // },
        // Witnesses: {
        //   respondent1DQWitnesses: {
        //     witnessesToAppear: 'No'
        //   }
        // },
        // Language: {
        //   respondent1DQLanguage: {
        //     evidence: 'ENGLISH',
        //     court: 'ENGLISH',
        //     documents: 'ENGLISH'
        //   }
        // },
        // HearingLRspec: {
        //   respondent1DQHearing: {
        //     hearingLength: 'ONE_DAY',
        //     unavailableDatesRequired: 'No'
        //   }
        // },
        // StatementOfTruth: {
        //   uiStatementOfTruth: {
        //     name: 'name',
        //     role: 'role'
        //   }
        // }
      // },
    // };

    switch (response) {
      case 'FULL_DEFENCE':
        responseData.userInput = {
          ...responseData.userInput,
          SingleResponse: {
            respondentResponseIsSame: 'Yes'
          },
          RespondentResponseTypeSpec: {
            respondent1ClaimResponseTypeForSpec: 'FULL_DEFENCE'
          },
          defenceRoute: {
            defenceRouteRequired: 'DISPUTES_THE_CLAIM',
          },
          Upload: {
            detailsOfWhyDoesYouDisputeTheClaim: 'details'
          },
          HowToAddTimeline: {
            specClaimResponseTimelineList: 'MANUAL'
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
            respondentClaimResponseTypeForSpecGeneric: 'FULL_DEFENCE',
            specRespondent1Represented: 'Yes',
            specRespondent2Represented: 'Yes',
            respondent2SameLegalRepresentative: 'Yes',
            respondentResponseIsSame: 'Yes'
          },

          defenceRoute: {
            specPaidLessAmountOrDisputesOrPartAdmission: 'Yes',
            responseClaimTrack: 'SMALL_CLAIM',
            specDisputesOrPartAdmission: 'Yes',
            respondent1ClaimResponsePaymentAdmissionForSpec: 'DID_NOT_PAY'
          },

          ResponseConfirmDetails: {
            sameSolicitorSameResponse: 'Yes'
          },

          Upload: {
            specDisputesOrPartAdmission: 'Yes'
          },

          ResponseConfirmNameAddress: {
            businessProcess: {
              status: 'FINISHED',
              camundaEvent: 'CREATE_CLAIM_SPEC'
            },
          },
        };
        responseData.userInput = {
          ...responseData.userInput,
          RespondentResponseTypeSpec: {
            respondent1ClaimResponseTypeForSpec: 'FULL_DEFENCE'
          },
          defenceRoute: {
            defenceRouteRequired: 'DISPUTES_THE_CLAIM',
          },

          ResponseConfirmDetails: {
            sameSolicitorSameResponse: 'Yes'
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
          SingleResponse: {
            respondentResponseIsSame: 'Yes'
          },
          RespondentResponseTypeSpec: {
            respondent1ClaimResponseTypeForSpec: 'FULL_ADMISSION'
          },
          defenceAdmittedPartRoute: {
            specDefenceFullAdmittedRequired: 'No'
          },
          WhenWillClaimBePaid: {
            defenceAdmitPartPaymentTimeRouteRequired: 'SUGGESTION_OF_REPAYMENT_PLAN'
          },
          DisabilityPremiumPayments: {
            disabilityPremiumPayments: 'Yes',
            severeDisabilityPremiumPayments: 'Yes',
          },
          defendantHomeOptions: {
            respondent1DQHomeDetails: {
              type: 'PRIVATE_RENTAL'
            }
          },
          DefendantPartnersAndDependents: {
            respondent1PartnerAndDependent: {
              haveAnyChildrenRequired: 'Yes',
              howManyChildrenByAgeGroup: {
                numberOfUnderEleven: '1',
                numberOfElevenToFifteen: '1',
                numberOfSixteenToNineteen: '0'
              },
              liveWithPartnerRequired: 'Yes',
              partnerAgedOver: 'Yes',
              receiveDisabilityPayments: 'Yes',
              supportPeopleDetails: 'details',
              supportPeopleNumber: '2',
              supportedAnyoneFinancialRequired: 'Yes'
            }
          },
          EmploymentDeclaration:{
            defenceAdmitPartEmploymentTypeRequired: 'No',
            respondToClaimAdmitPartUnemployedLRspec: {
              unemployedComplexTypeRequired: 'RETIRED'
            }
          },
          DetailsOfPayingMoneyRepaymentPlan: {
            respondent1CourtOrderPaymentOption: 'No'
          },
          DefendantDebts: {
            respondent1LoanCreditOption: 'No'
          },
          DefendantIncomeExpensesFullAdmission: {
            respondent1DQCarerAllowanceCreditFullAdmission: 'No',
            respondent1DQRecurringExpensesFA: [],
            respondent1DQRecurringIncomeFA: []
          },
          WhyDoesNotPayImmediately: {
            responseToClaimAdmitPartWhyNotPayLRspec: 'reasons'
          },
          WhyDoesNotPayImmediatelyRespondent2: {
            responseToClaimAdmitPartWhyNotPayLRspec2: 'reasons 2'
          },
          RepaymentPlan: {
            respondent1RepaymentPlan: {
              firstRepaymentDate: '2022-11-11',
              paymentAmount: '100',
              repaymentFrequency: 'ONCE_ONE_MONTH'
            }
          },
          RepaymentPlanRespondent2: {
            respondent2RepaymentPlan: {
              firstRepaymentDate: '2022-11-11',
              paymentAmount: '200',
              repaymentFrequency: 'ONCE_TWO_WEEKS'
            }
          },
          StatementOfTruth: {
            uiStatementOfTruth: {
              name: 'name',
              role: 'role'
            }
          },

          ResponseConfirmNameAddress: {
            businessProcess: {
              status: 'FINISHED',
              camundaEvent: 'CREATE_CLAIM_SPEC'
            },
          },
          defenceRoute: {
            specPaidLessAmountOrDisputesOrPartAdmission: 'No',
          },
          ResponseConfirmDetails: {
            sameSolicitorSameResponse: 'Yes'
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
            specFullAdmissionOrPartAdmission: 'Yes',
            respondentClaimResponseTypeForSpecGeneric: 'FULL_ADMISSION',
            respondentResponseIsSame: 'Yes',
            specRespondent1Represented: 'Yes',
            specRespondent2Represented: 'Yes',
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
          SingleResponse: {
            respondentResponseIsSame: 'Yes'
          },
          RespondentResponseTypeSpec: {
            respondent1ClaimResponseTypeForSpec: 'PART_ADMISSION'
          },
          defenceAdmittedPartRoute: {
            specDefenceAdmittedRequired: 'No',
            respondToAdmittedClaimOwingAmount: '1000'
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
          ResponseConfirmDetails: {
            sameSolicitorSameResponse: 'Yes'
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

      case 'COUNTER_CLAIM':
        responseData.userInput = {
          ...responseData.userInput,
          SingleResponse: {
            respondentResponseIsSame: 'Yes'
          },
          RespondentResponseTypeSpec: {
            respondent1ClaimResponseTypeForSpec: 'COUNTER_CLAIM'
          }
        };
        responseData.midEventData = {
          ...responseData.midEventData,

          ResponseConfirmDetails: {
            sameSolicitorSameResponse: 'Yes'
          },

          RespondentResponseTypeSpec: {
            multiPartyResponseTypeFlags: 'FULL_DEFENCE',
            respondentClaimResponseTypeForSpecGeneric: 'COUNTER_CLAIM',
            sameSolicitorSameResponse: 'Yes',
            specDefenceFullAdmittedRequired: 'No',
            specFullAdmissionOrPartAdmission: 'No',
            specFullDefenceOrPartAdmission: 'No',
            respondent2SameLegalRepresentative: 'Yes',
            specRespondent1Represented: 'Yes',
            specRespondent2Represented: 'Yes'
          },

          ResponseConfirmNameAddress: {
            businessProcess: {
              status: 'FINISHED',
              camundaEvent: 'CREATE_CLAIM_SPEC'
            }
          }
        };
        break;
    }

    return responseData;
  }
};
