import { defendantSolicitor1User } from '../../../../../config/users/exui-users';
import preferredCourts from '../../../../../config/preferred-courts';
import partys from '../../../../../constants/users/partys';
import DefendantResponseSpecType from '../../../../../constants/ccd-events/defendant-response-spec/defendant-response-spec-type';
import CaseDataHelper from '../../../../../helpers/case-data-helper';
import DefenceRouteSpec from '../../../../../constants/ccd-events/defendant-response-spec/defence-route-spec';
import DefendantResponseSpecTypeObjs, {
  FullDefenceDefendantResponseSpecTypeObjs,
} from '../../../../../models/ccd-events/defendant-response-spec/defendant-response-spec-type-objs';
import DateHelper from '../../../../../helpers/date-helper';
import { UploadDocumentValue } from '../../../../../models/ccd-case-data';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimTypeHelper from '../../../../../helpers/claim-type-helper';
import ClaimTrack from '../../../../../constants/cases/claim-track';

const defendantChecklist = {
  RespondentChecklist: {},
}

const responseConfirmNameAddress = (claimType: ClaimType) => {
  if(claimType === ClaimType.ONE_VS_TWO_SAME_SOL) 
    return {
      ResponseConfirmNameAddress: {
        specAoSApplicantCorrespondenceAddressRequired: 'Yes',
        specAoSRespondent2HomeAddressRequired: 'Yes',
      },
    };

  return {
    ResponseConfirmNameAddress: {
      specAoSApplicantCorrespondenceAddressRequired: 'Yes',
    },
  };
};

const responseConfirmDetails = {
  ResponseConfirmDetails: {
    specAoSRespondentCorrespondenceAddressRequired: 'Yes',
  },
};

const singleResponse = (
  claimType: ClaimType
) => {
  if(claimType === ClaimType.ONE_VS_TWO_SAME_SOL) {
    return {
      SingleResponse: {
        respondentResponseIsSame: 'Yes'
      }
    };
  }

  if(ClaimTypeHelper.isClaimant2(claimType)) {
    return {
      SingleResponse2v1: {
        defendantSingleResponseToBothClaimants: 'Yes'
      }
    };
  }
  return {};
}

const defendantResponse = (
  defendantResponseType: DefendantResponseSpecType | DefendantResponseSpecTypeObjs,
  claimType: ClaimType,
) => {
  const isFullDefence = typeof defendantResponseType === 'object' 
  && (defendantResponseType as FullDefenceDefendantResponseSpecTypeObjs).defendantResponseSpecType 
    === DefendantResponseSpecType.FULL_DEFENCE;

  if(isFullDefence) {
    defendantResponseType = defendantResponseType as FullDefenceDefendantResponseSpecTypeObjs;
    return {
      RespondentResponseTypeSpec: {
        respondent1ClaimResponseTypeForSpec: defendantResponseType.defendantResponseSpecType,
        ...(ClaimTypeHelper.isClaimant2(claimType) ? {
          claimant1ClaimResponseTypeForSpec: defendantResponseType.defendantResponseSpecType,
          claimant2ClaimResponseTypeForSpec: defendantResponseType.defendantResponseSpecType,
        } : {}),
      },
      defenceRoute: {
        ...(defendantResponseType.defenceRoute === DefenceRouteSpec.DISPUTE ? 
          {defenceRouteRequired: defendantResponseType.defenceRoute} : 
          { 
            defenceRouteRequired: defendantResponseType.defenceRoute,
            respondToClaim: {
              howMuchWasPaid: CaseDataHelper.getClaimValue(defendantResponseType.claimTrack),
              howWasThisAmountPaid: 'CREDIT_CARD',
              whenWasThisAmountPaid: DateHelper.formatDateToString(DateHelper.subtractFromToday({days: 1}), {outputFormat: 'YYYY-MM-DD'}),
          }}),
      },
    }; 
  }

  return {};
};

const upload = (defenceResponseDocumentSpec: UploadDocumentValue) => {
  return {
    Upload: {
      detailsOfWhyDoesYouDisputeTheClaim: `Dispute reason - ${partys.DEFENDANT_1.key}`,
      respondent1SpecDefenceResponseDocument: {file: defenceResponseDocumentSpec},
    },
  }
};

const timeline = {
  HowToAddTimeline: {
    specClaimResponseTimelineList: 'MANUAL',
  },
  HowToAddTimelineManual: {
    specResponseTimelineOfEvents: [
      {
        value: {
          timelineDate: DateHelper.formatDateToString(DateHelper.subtractFromToday({days: 10}), {outputFormat: 'YYYY-MM-DD'}),
          timelineDescription: `Timeline event 1 - ${partys.DEFENDANT_1.key}`,
        }
      },
      {
        value: {
          timelineDate: DateHelper.formatDateToString(DateHelper.subtractFromToday({days: 11}), {outputFormat: 'YYYY-MM-DD'}),
          timelineDescription: `Timeline event 2 - ${partys.DEFENDANT_1.key}`,
        }
      }
    ]
  }
};

const mediationContactInformation = (claimTrack: ClaimTrack) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM)
    return {
      MediationContactInformation: {
        resp1MediationContactInfo: CaseDataHelper.buildMediationData(
          partys.DEFENDANT_1_MEDIATION_FRIEND,
        ),
      },
    };

  return {};
};

const mediationAvailability = (claimTrack: ClaimTrack) => {

  if(claimTrack === ClaimTrack.SMALL_CLAIM) {
    const unavailableDate = DateHelper.formatDateToString(DateHelper.addToToday({months: 1}), {
      outputFormat: 'YYYY-MM-DD',
    });
    return {
      MediationAvailability: {
        resp1MediationAvailability: {
          isMediationUnavailablityExists: 'Yes',
          unavailableDatesForMediation: [
            CaseDataHelper.setIdToData({
              unavailableDateType: 'SINGLE_DATE',
              date: unavailableDate,
            }),
          ],
        },
      },
    };
  }

  return {};
};

const fastTrackDq = (claimTrack: ClaimTrack) => {
  if(claimTrack === ClaimTrack.FAST_CLAIM)
    return {
      FileDirectionsQuestionnaire: {
        respondent1DQFileDirectionsQuestionnaire: {
          oneMonthStayRequested: 'Yes',
          reactionProtocolCompliedWith: 'No',
          reactionProtocolNotCompliedWithReason: `Reaction protocol not complied with reason - ${partys.DEFENDANT_1.key}`,
          explainedToClient: [
              'CONFIRM'
          ]
        }
      },
      FixedRecoverableCosts: {
        respondent1DQFixedRecoverableCosts: {
          isSubjectToFixedRecoverableCostRegime: 'Yes',
          band: 'BAND_4',
          complexityBandingAgreed: 'Yes',
          reasons: `Recoverable costs reason - ${partys.DEFENDANT_1.key}`,
        },
      },
      DisclosureOfElectronicDocumentsLRspec: {
        specRespondent1DQDisclosureOfElectronicDocuments: {
          reachedAgreement: 'No',
          agreementLikely: 'No',
          reasonForNoAgreement: `Reason for no agreement - ${partys.DEFENDANT_1.key}`,
        }
      },
      DisclosureOfNonElectronicDocumentsLRspec: {
        specRespondent1DQDisclosureOfNonElectronicDocuments: {
          bespokeDirections: `Directions are proposed for disclosure - ${partys.DEFENDANT_1.key}`,
        },
      },
      DisclosureReport: {
        respondent1DQDisclosureReport: {
          disclosureFormFiledAndServed: "Yes",
          disclosureProposalAgreed: "Yes",
          draftOrderNumber: "12345"
        }
      }
    };
  return {};
};

const determinationWithoutHearing = (claimTrack: ClaimTrack) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM) {
    return {
      DeterminationWithoutHearing: {
        deterWithoutHearingRespondent1: {
          deterWithoutHearingWhyNot: `Determination without hearing reason - ${partys.DEFENDANT_1.key}`,
          deterWithoutHearingYesNo: 'No',
        },
      },
    }
  }

  return {};
};

const experts = (claimTrack: ClaimTrack) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM)
    return {
      SmallClaimExperts: {
        respondToClaimExperts: {
          ...CaseDataHelper.buildExpertData(partys.DEFENDANT_1_EXPERT_1),
          partyName: undefined,
        },
        responseClaimExpertSpecRequired: 'Yes',
      },
    };

  return {
    Experts: {
      respondent1DQExperts: {
        expertRequired: 'Yes',
        expertReportsSent: 'YES',
        jointExpertSuitable: 'Yes',
        details: [
          CaseDataHelper.setIdToData({
            ...CaseDataHelper.buildExpertData(partys.DEFENDANT_1_EXPERT_1),
            partyName: undefined,
          }),
          CaseDataHelper.setIdToData({
            ...CaseDataHelper.buildExpertData(partys.DEFENDANT_1_EXPERT_2),
            partyName: undefined,
          }),
        ],
      },
    },
  };
};

const witnesses = (claimTrack: ClaimTrack) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM)
    return {
      SmallClaimWitnesses: {
        respondent1DQWitnessesSmallClaim: {
          witnessesToAppear: 'Yes',
          details: [
            CaseDataHelper.setIdToData({
              ...CaseDataHelper.buildWitnessData(partys.DEFENDANT_1_WITNESS_1),
              partyName: undefined,
            }),
            CaseDataHelper.setIdToData({
              ...CaseDataHelper.buildWitnessData(partys.DEFENDANT_1_WITNESS_2),
              partyName: undefined,
            }),
          ],
        },
      },
    };

  return {
    Witnesses: {
      respondent1DQWitnessesRequiredSpec: 'Yes',
      respondent1DQWitnessesDetailsSpec: [
        CaseDataHelper.setIdToData({
          ...CaseDataHelper.buildWitnessData(partys.DEFENDANT_1_WITNESS_1),
          partyName: undefined,
        }),
        CaseDataHelper.setIdToData({
          ...CaseDataHelper.buildWitnessData(partys.DEFENDANT_1_WITNESS_2),
          partyName: undefined,
        }),
      ],
    },
  };
};

const language = {
  Language: {
    respondent1DQLanguage: {
      court: 'BOTH',
      documents: 'BOTH',
    },
  },
};

const hearing = (claimTrack: ClaimTrack) => {
  const unavailableDate = DateHelper.formatDateToString(DateHelper.addToToday({months: 1}), {
    outputFormat: 'YYYY-MM-DD',
  });

  if(claimTrack === ClaimTrack.SMALL_CLAIM)
    return {
      SmallClaimHearing: {
        respondent1DQHearingSmallClaim: {
          unavailableDatesRequired: 'Yes',
          smallClaimUnavailableDate: [
            CaseDataHelper.setIdToData({
              unavailableDateType: 'SINGLE_DATE',
              date: unavailableDate,
            }),
          ],
        },
        SmallClaimHearingInterpreterRequired: 'Yes',
        SmallClaimHearingInterpreterDescription:
          `Small claim hearing interpreter description - ${partys.DEFENDANT_1.key}`,
      },
    };

  return {
    HearingLRspec: {
      respondent1DQHearing: {
        unavailableDatesRequired: 'No',
      },
    },
  };
};

const requestedCourtLocation = (() => {
  const preferredCourt = CaseDataHelper.setCodeToData(preferredCourts[partys.DEFENDANT_1.key].default);

  return {
    RequestedCourtLocationLRspec: {
      respondToCourtLocation: {
        responseCourtLocations: {
          list_items: [preferredCourt],
          value: preferredCourt,
        },
        reasonForHearingAtSpecificCourt: `Court location reason - ${partys.DEFENDANT_1.key}`,
      },
      respondent1DQRemoteHearingLRspec: {
        remoteHearingRequested: 'Yes',
        reasonForRemoteHearing: `Court location reason - ${partys.DEFENDANT_1.key}`,
      },
    },
  };
})();

const hearingSupport = {
  HearingSupport: {
    respondent1DQHearingSupport: {
      supportRequirements: 'Yes',
      supportRequirementsAdditional: `Support requirements for ${partys.DEFENDANT_1.key}`,
    },
  },
};

const vulnerabilityQuestions = {
  VulnerabilityQuestions: {
    respondent1DQVulnerabilityQuestions: {
      vulnerabilityAdjustmentsRequired: 'Yes',
      vulnerabilityAdjustments: `Vulnerability adjustments - ${partys.DEFENDANT_1.key}`,
    },
  },
};

const applications = (claimTrack: ClaimTrack) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM)
    return {};

  return {
    Applications: {
      additionalInformationForJudge: `Additional information - ${partys.DEFENDANT_1.key}`,
      respondent1DQFutureApplications: {
        intentionToMakeFutureApplications: 'Yes',
        whatWillFutureApplicationsBeMadeFor: `Reason - ${partys.DEFENDANT_1.key}`,
      },
    },
  };
};

const statementOfTruth = {
  StatementOfTruth: {
    uiStatementOfTruth: {
      name: defendantSolicitor1User.name,
      role: 'Solicitor',
    },
  },
};

const defendantResponseSpecData = {
  defendantChecklist,
  responseConfirmNameAddress,
  responseConfirmDetails,
  singleResponse,
  defendantResponse,
  upload,
  timeline,
  mediationContactInformation,
  mediationAvailability,
  determinationWithoutHearing,
  fastTrackDq,
  experts,
  witnesses,
  language,
  hearing,
  requestedCourtLocation,
  hearingSupport,
  vulnerabilityQuestions,
  applications,
  statementOfTruth,
};

export default defendantResponseSpecData;
