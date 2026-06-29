import { defendantSolicitor1User, defendantSolicitor2User } from '../../../../../config/users/exui-users';
import preferredCourts from '../../../../../config/preferred-courts';
import partys from '../../../../../constants/users/partys';
import DefendantResponseSpecType from '../../../../../constants/ccd-events/defendant-response/lr-spec/defendant-response-spec-type';
import CaseDataHelper from '../../../../../helpers/case-data-helper';
import DefenceRouteSpec from '../../../../../constants/ccd-events/defendant-response/lr-spec/defence-route-spec';
import DefendantResponseSpecTypeObjs, {
  FullDefenceDefendantResponseSpecTypeObjs,
} from '../../../../../models/ccd-events/defendant-response-spec/defendant-response-spec-type-objs';
import DateHelper from '../../../../../helpers/date-helper';
import { UploadDocumentValue } from '../../../../../models/ccd-case-data';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimTypeHelper from '../../../../../helpers/claim-type-helper';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import { Party } from '../../../../../models/users/partys';

const defendantChecklist = {
  RespondentChecklist: {},
}

const responseConfirmNameAddress = (claimType: ClaimType, defendantSolictorParty: Party) => {
  if(defendantSolictorParty === partys.DEFENDANT_SOLICITOR_1) {
    if(claimType === ClaimType.ONE_VS_TWO_SAME_SOL) {
      return {
        ResponseConfirmNameAddress: {
          specAoSApplicantCorrespondenceAddressRequired: 'Yes',
          specAoSRespondent2HomeAddressRequired: 'Yes',
        },
      };
    }
    return {
      ResponseConfirmNameAddress: {
        specAoSApplicantCorrespondenceAddressRequired: 'Yes',
      },
    };
  } else if(defendantSolictorParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      ResponseConfirmNameAddress: {
        specAoSRespondent2HomeAddressRequired: 'Yes'
      }
    };
  }

  return {};
};

const responseConfirmDetails = (defendantSolicitorParty: Party) => {
  return {
    ResponseConfirmDetails: {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'specAoSRespondentCorrespondenceAddressRequired'
        : 'specAoSRespondent2CorrespondenceAddressRequired']: 'Yes',
    },
  };
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

const respondentResponseTypeSpec = (
  defendantResponseType: DefendantResponseSpecType | DefendantResponseSpecTypeObjs,
  claimType: ClaimType,
  defendantSolicitorParty: Party,
) => {
  const isFullDefence = typeof defendantResponseType === 'object' 
  && (defendantResponseType as FullDefenceDefendantResponseSpecTypeObjs).defendantResponseSpecType 
    === DefendantResponseSpecType.FULL_DEFENCE;

  if(isFullDefence) {
    defendantResponseType = defendantResponseType as FullDefenceDefendantResponseSpecTypeObjs;
    if(defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
      if(ClaimTypeHelper.isClaimant2(claimType)) {
        return {
          RespondentResponseTypeSpec: {
            respondent1ClaimResponseTypeForSpec: defendantResponseType.defendantResponseSpecType,
            claimant1ClaimResponseTypeForSpec: defendantResponseType.defendantResponseSpecType,
            claimant2ClaimResponseTypeForSpec: defendantResponseType.defendantResponseSpecType,
          },
        };
      }

      return {
        RespondentResponseTypeSpec: {
          respondent1ClaimResponseTypeForSpec: defendantResponseType.defendantResponseSpecType,
        },
      };
    } else if(defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
      return {
        RespondentResponseTypeSpec: {
          respondent2ClaimResponseTypeForSpec: defendantResponseType.defendantResponseSpecType,
        }
      };
    }
  }

  return {};
};

const defenceRoute = (
  defendantResponseType: DefendantResponseSpecType | DefendantResponseSpecTypeObjs,
  defendantSolicitorParty: Party,
) => {
  const isFullDefence = typeof defendantResponseType === 'object' 
  && (defendantResponseType as FullDefenceDefendantResponseSpecTypeObjs).defendantResponseSpecType 
    === DefendantResponseSpecType.FULL_DEFENCE;

  if(isFullDefence) {
    defendantResponseType = defendantResponseType as FullDefenceDefendantResponseSpecTypeObjs;
    if(defendantResponseType.defenceRoute === DefenceRouteSpec.DISPUTE) {
      if(defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
        return {
          defenceRoute: {
            defenceRouteRequired: defendantResponseType.defenceRoute,
          },
        };
      } else if(defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
        return {
          defenceRoute: {
            defenceRouteRequired2: defendantResponseType.defenceRoute,
          },
        };
      }
    }

    else if(defendantResponseType.defenceRoute === DefenceRouteSpec.HAS_PAID) {
      if(defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
        return {
          defenceRoute: {
            defenceRouteRequired: defendantResponseType.defenceRoute,
            respondToClaim: {
              howMuchWasPaid: CaseDataHelper.getClaimValue(defendantResponseType.claimTrack),
              howWasThisAmountPaid: 'CREDIT_CARD',
              whenWasThisAmountPaid: DateHelper.formatDateToString(DateHelper.subtractFromToday({days: 1}), {outputFormat: 'YYYY-MM-DD'}),
            },
          },
        };
      } else if(defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
        return {
          defenceRoute: {
            defenceRouteRequired2: defendantResponseType.defenceRoute,
            respondToClaim2: {
              howMuchWasPaid: CaseDataHelper.getClaimValue(defendantResponseType.claimTrack),
              howWasThisAmountPaid: 'CREDIT_CARD',
              whenWasThisAmountPaid: DateHelper.formatDateToString(DateHelper.subtractFromToday({days: 1}), {outputFormat: 'YYYY-MM-DD'}),
            },
          },
        };
      }
    }
  }

  return {};
};

const upload = (defenceResponseDocumentSpec: UploadDocumentValue, defendantSolicitorParty: Party) => {
  return {
    Upload: {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'detailsOfWhyDoesYouDisputeTheClaim'
        : 'detailsOfWhyDoesYouDisputeTheClaim2']: `Dispute reason - ${defendantSolicitorParty.key}`,
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'respondent1SpecDefenceResponseDocument'
        : 'respondent2SpecDefenceResponseDocument']: {file: defenceResponseDocumentSpec},
    },
  };
};

const timeline = (defendantSolicitorParty: Party) => {
  return {
    HowToAddTimeline: {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'specClaimResponseTimelineList'
        : 'specClaimResponseTimelineList2']: 'MANUAL',
    },
    HowToAddTimelineManual: {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'specResponseTimelineOfEvents'
        : 'specResponseTimelineOfEvents2']: [
        {
          value: {
            timelineDate: DateHelper.formatDateToString(DateHelper.subtractFromToday({days: 10}), {outputFormat: 'YYYY-MM-DD'}),
            timelineDescription: `Timeline event 1 - ${defendantSolicitorParty.key}`,
          }
        },
        {
          value: {
            timelineDate: DateHelper.formatDateToString(DateHelper.subtractFromToday({days: 11}), {outputFormat: 'YYYY-MM-DD'}),
            timelineDescription: `Timeline event 2 - ${defendantSolicitorParty.key}`,
          }
        }
      ]
    }
  };
}

const mediationContactInformation = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM) {
    return {
      MediationContactInformation: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'resp1MediationContactInfo'
          : 'resp2MediationContactInfo']: CaseDataHelper.buildMediationData(
          defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
            ? partys.DEFENDANT_1_MEDIATION_FRIEND
            : partys.DEFENDANT_2_MEDIATION_FRIEND,
        ),
      },
    };
  }
  return {};
};

const mediationAvailability = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {

  if(claimTrack === ClaimTrack.SMALL_CLAIM) {
    const unavailableDate = DateHelper.formatDateToString(DateHelper.addToToday({months: 1}), {
      outputFormat: 'YYYY-MM-DD',
    });
    return {
      MediationAvailability: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'resp1MediationAvailability'
          : 'resp2MediationAvailability']: {
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

const fastTrackDq = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  if(claimTrack === ClaimTrack.FAST_CLAIM) {
    return {
      FileDirectionsQuestionnaire: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'respondent1DQFileDirectionsQuestionnaire'
          : 'respondent2DQFileDirectionsQuestionnaire']: {
          oneMonthStayRequested: 'Yes',
          reactionProtocolCompliedWith: 'No',
          reactionProtocolNotCompliedWithReason: `Reaction protocol not complied with reason - ${defendantSolicitorParty.key}`,
          explainedToClient: [
              'CONFIRM'
          ]
        }
      },
      FixedRecoverableCosts: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'respondent1DQFixedRecoverableCosts'
          : 'respondent2DQFixedRecoverableCosts']: {
          isSubjectToFixedRecoverableCostRegime: 'Yes',
          band: 'BAND_4',
          complexityBandingAgreed: 'Yes',
          reasons: `Recoverable costs reason - ${defendantSolicitorParty.key}`,
        },
      },
      DisclosureOfElectronicDocumentsLRspec: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'specRespondent1DQDisclosureOfElectronicDocuments'
          : 'specRespondent2DQDisclosureOfElectronicDocuments']: {
          reachedAgreement: 'No',
          agreementLikely: 'No',
          reasonForNoAgreement: `Reason for no agreement - ${defendantSolicitorParty.key}`,
        }
      },
      DisclosureOfNonElectronicDocumentsLRspec: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'specRespondent1DQDisclosureOfNonElectronicDocuments'
          : 'specRespondent2DQDisclosureOfNonElectronicDocuments']: {
          bespokeDirections: `Directions are proposed for disclosure - ${defendantSolicitorParty.key}`,
        },
      },
      DisclosureReport: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'respondent1DQDisclosureReport'
          : 'respondent2DQDisclosureReport']: {
          disclosureFormFiledAndServed: "Yes",
          disclosureProposalAgreed: "Yes",
          draftOrderNumber: "12345"
        }
      }
    };
  }

  return {};
};

const deterWithoutHearing = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM) {
    return {
      DeterminationWithoutHearing: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'deterWithoutHearingRespondent1'
          : 'deterWithoutHearingRespondent2']: {
          deterWithoutHearingWhyNot: `Determination without hearing reason - ${defendantSolicitorParty.key}`,
          deterWithoutHearingYesNo: 'No',
        },
      },
    };
  }

  return {};
};

const experts = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM) {
    const defendantExpert =
      defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? partys.DEFENDANT_1_EXPERT_1
        : partys.DEFENDANT_2_EXPERT_1;

    return {
      SmallClaimExperts: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'respondToClaimExperts'
          : 'respondToClaimExperts2']: {
          ...CaseDataHelper.buildExpertData(defendantExpert),
          partyName: undefined,
        },
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'responseClaimExpertSpecRequired'
          : 'responseClaimExpertSpecRequired2']: 'Yes',
      },
    };
  } else if(claimTrack === ClaimTrack.FAST_CLAIM) {
    const defendantExperts =
      defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? [partys.DEFENDANT_1_EXPERT_1, partys.DEFENDANT_1_EXPERT_2]
        : [partys.DEFENDANT_2_EXPERT_1, partys.DEFENDANT_2_EXPERT_2];

    return {
      Experts: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'respondent1DQExperts'
          : 'respondent2DQExperts']: {
          expertRequired: 'Yes',
          expertReportsSent: 'YES',
          jointExpertSuitable: 'Yes',
          details: defendantExperts.map((expertParty) =>
            CaseDataHelper.setIdToData({
              ...CaseDataHelper.buildExpertData(expertParty),
              partyName: undefined,
            }),
          ),
        },
      },
    };
  }

  return {};
};

const witnesses = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM) {
    const defendantWitnesses =
      defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? [partys.DEFENDANT_1_WITNESS_1, partys.DEFENDANT_1_WITNESS_2]
        : [partys.DEFENDANT_2_WITNESS_1, partys.DEFENDANT_2_WITNESS_2];

    return {
      SmallClaimWitnesses: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'respondent1DQWitnessesSmallClaim'
          : 'respondent2DQWitnessesSmallClaim']: {
          witnessesToAppear: 'Yes',
          details: defendantWitnesses.map((witnessParty) =>
            CaseDataHelper.setIdToData({
              ...CaseDataHelper.buildWitnessData(witnessParty),
              partyName: undefined,
            }),
          ),
        },
      },
    };
  }

  else if(claimTrack === ClaimTrack.FAST_CLAIM) {
    const defendantWitnesses =
      defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? [partys.DEFENDANT_1_WITNESS_1, partys.DEFENDANT_1_WITNESS_2]
        : [partys.DEFENDANT_2_WITNESS_1, partys.DEFENDANT_2_WITNESS_2];

    const witnessDetails = defendantWitnesses.map((witnessParty) =>
      CaseDataHelper.setIdToData({
        ...CaseDataHelper.buildWitnessData(witnessParty),
        partyName: undefined,
      }),
    );

    if(defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
      return {
        Witnesses: {
          respondent1DQWitnessesRequiredSpec: 'Yes',
          respondent1DQWitnessesDetailsSpec: witnessDetails,
        },
      };
    }

    return {
      Witnesses: {
        respondent2DQWitnesses: {
          witnessesToAppear: 'Yes',
          details: witnessDetails,
        },
      },
    };
  }

  return {};
};

const language = (defendantSolicitorParty: Party) => {
  return {
    Language: {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'respondent1DQLanguage'
        : 'respondent2DQLanguage']: {
        court: 'BOTH',
        documents: 'BOTH',
      },
    },
  };
};

const hearing = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  const unavailableDate = DateHelper.formatDateToString(DateHelper.addToToday({months: 1}), {
    outputFormat: 'YYYY-MM-DD',
  });

  if(claimTrack === ClaimTrack.SMALL_CLAIM) {
    return {
      SmallClaimHearing: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'respondent1DQHearingSmallClaim'
          : 'respondent2DQHearingSmallClaim']: {
          unavailableDatesRequired: 'Yes',
          smallClaimUnavailableDate: [
            CaseDataHelper.setIdToData({
              unavailableDateType: 'SINGLE_DATE',
              date: unavailableDate,
            }),
          ],
        },
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'SmallClaimHearingInterpreterRequired'
          : 'SmallClaimHearingInterpreter2Required']: 'Yes',
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'SmallClaimHearingInterpreterDescription'
          : 'smallClaimHearingInterpreterDescription2']:
          `Small claim hearing interpreter description - ${defendantSolicitorParty.key}`,
      },
    };
  }

  if(claimTrack === ClaimTrack.FAST_CLAIM) {
    return {
      HearingLRspec: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
          ? 'respondent1DQHearing'
          : 'respondent2DQHearing']: {
          unavailableDatesRequired: 'No',
        },
      },
    };
  }

  return {};
};

const requestedCourtLocation = (defendantSolicitorParty: Party) => {
  const preferredCourtParty =
    defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
      ? partys.DEFENDANT_1
      : partys.DEFENDANT_2;
  const preferredCourt = CaseDataHelper.setCodeToData(preferredCourts[preferredCourtParty.key].default);

  return {
    RequestedCourtLocationLRspec: {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1 
        ? 'respondToCourtLocation' 
        : 'respondToCourtLocation2']: {
        responseCourtLocations: {
          list_items: [preferredCourt],
          value: preferredCourt,
        },
        reasonForHearingAtSpecificCourt: `Court location reason - ${defendantSolicitorParty.key}`,
      },
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1 
        ? 'respondent1DQRemoteHearingLRspec' 
        : 'respondent2DQRemoteHearingLRspec']: {
        remoteHearingRequested: 'Yes',
        reasonForRemoteHearing: `Court location reason - ${defendantSolicitorParty.key}`,
      },
    },
  };
};

const hearingSupport = (defendantSolicitorParty: Party) => {
  return {
    HearingSupport: {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'respondent1DQHearingSupport'
        : 'respondent2DQHearingSupport']: {
        supportRequirements: 'Yes',
        supportRequirementsAdditional: `Support requirements for ${defendantSolicitorParty.key}`,
      },
    },
  };
};

const vulnerabilityQuestions = (defendantSolicitorParty: Party) => {
  return {
    VulnerabilityQuestions: {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'respondent1DQVulnerabilityQuestions'
        : 'respondent2DQVulnerabilityQuestions']: {
        vulnerabilityAdjustmentsRequired: 'Yes',
        vulnerabilityAdjustments: `Vulnerability adjustments - ${defendantSolicitorParty.key}`,
      },
    },
  };
};

const applications = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM)
    return {};

  return {
    Applications: {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'additionalInformationForJudge'
        : 'additionalInformationForJudge2']: `Additional information - ${defendantSolicitorParty.key}`,
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'respondent1DQFutureApplications'
        : 'respondent2DQFutureApplications']: {
        intentionToMakeFutureApplications: 'Yes',
        whatWillFutureApplicationsBeMadeFor: `Reason - ${defendantSolicitorParty.key}`,
      },
    },
  };
};

const statementOfTruth = (defendantSolicitorParty: Party) => {
  const defendantSolicitorUser =
    defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2
      ? defendantSolicitor2User
      : defendantSolicitor1User;

  return {
    StatementOfTruth: {
      uiStatementOfTruth: {
        name: defendantSolicitorUser.name,
        role: 'Solicitor',
      },
    },
  };
};

const undefine = (defendantSolicitorParty: Party) => {
  if(defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      Undefine: {
        respondent1DetailsForClaimDetailsTab: undefined
      }
    }
  }

  return {};
}

const defendantResponseSpecData = {
  defendantChecklist,
  responseConfirmNameAddress,
  responseConfirmDetails,
  singleResponse,
  respondentResponseTypeSpec,
  defenceRoute,
  upload,
  timeline,
  mediationContactInformation,
  mediationAvailability,
  deterWithoutHearing,
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
  undefine
};

export default defendantResponseSpecData;
