import preferredCourts from '../../../../../config/preferred-courts';
import { defendantSolicitor1User, defendantSolicitor2User } from '../../../../../config/users/exui-users';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import DefendantResponseType from '../../../../../constants/ccd-events/defendant-response/unspec/defendant-response-type';
import partys from '../../../../../constants/users/partys';
import DateHelper from '../../../../../helpers/date-helper';
import CaseDataHelper from '../../../../../helpers/case-data-helper';
import CCDCaseData, { UploadDocumentValue } from '../../../../../models/ccd-case-data';
import { Party } from '../../../../../models/users/partys';
import ClaimType from '../../../../../constants/cases/claim-type';

const confirmDetails = (claimType: ClaimType, ccdCaseData: CCDCaseData, defendantSolicitorParty: Party) => {
  if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
    if(claimType === ClaimType.ONE_VS_TWO_SAME_SOL) {
      return {
        ConfirmDetails: {
          respondent1: structuredClone(ccdCaseData.respondent1),
          respondent1Copy: structuredClone(ccdCaseData.respondent1),
          respondent2Copy: structuredClone(ccdCaseData.respondent2),
        },
      };
    }
    return {
      ConfirmDetails: {
        respondent1: structuredClone(ccdCaseData.respondent1),
        respondent1Copy: structuredClone(ccdCaseData.respondent1),
      },
    };
  } else if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      ConfirmDetails: {
        respondent2: structuredClone(ccdCaseData.respondent2),
        respondent2Copy: structuredClone(ccdCaseData.respondent2),
      },
    };
  }

  return {};
};

const singleResponse = (claimType: ClaimType) => {
  if(claimType === ClaimType.ONE_VS_TWO_SAME_SOL) {
    return {
      SingleResponse: {
        respondentResponseIsSame: 'Yes'
      },
    };
  };

  return {};
}

const respondentResponseType = (
  claimType: ClaimType,
  responseType: DefendantResponseType,
  defendantSolicitorParty: Party,
) => {
  if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
    if(claimType === ClaimType.ONE_VS_TWO_SAME_SOL) {
      return {
        RespondentResponseType: {
          respondent1ClaimResponseType: responseType,
        }
      };
    } else if (claimType === ClaimType.TWO_VS_ONE) {
      return {
        RespondentResponseType: {
          respondent1ClaimResponseType: responseType,
          respondent1ClaimResponseTypeToApplicant2: responseType,
        }
      };
    }
    return {
      RespondentResponseType: {
        respondent1ClaimResponseType: responseType,
        multiPartyResponseTypeFlags: responseType,
      },
    };
  } else if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      RespondentResponseType: {
        respondent2ClaimResponseType: responseType,
      },
    };
  }

  return {};
};

const solicitorReferences = (ccdCaseData: CCDCaseData, defendantSolicitorParty: Party) => {
  if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      SolicitorReferences: {
        respondentSolicitor2Reference: ccdCaseData?.respondentSolicitor2Reference,
      },
    };
  }

  return {};
};

const deterWithoutHearing = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM) {
    if(defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
      return {
        DeterminationWithoutHearing: {
          deterWithoutHearingRespondent1: {
            deterWithoutHearingWhyNot: `Determination without hearing reason - ${defendantSolicitorParty.key}`,
            deterWithoutHearingYesNo: 'No'
          }
        }
      };
    } else if(defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
      return {
        DeterminationWithoutHearing: {
          deterWithoutHearingRespondent2: {
            deterWithoutHearingWhyNot: `Determination without hearing reason - ${defendantSolicitorParty.key}`,
            deterWithoutHearingYesNo: 'No'
          }
        }
      };
    }
  }

  return {};
}

const upload = (defenceDocument: UploadDocumentValue, defendantSolicitorParty: Party) => {
  if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
    return {
      Upload: {
        respondent1ClaimResponseDocument: {
          file: defenceDocument,
        },
      },
    };
  } else if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      Upload: {
        respondent2ClaimResponseDocument: {
          file: defenceDocument,
        },
      },
    };
  }

  return {};
};

const fastTrackDq = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  if (claimTrack === ClaimTrack.FAST_CLAIM) {
    return {
      FileDirectionsQuestionnaire: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2
          ? 'respondent2DQFileDirectionsQuestionnaire'
          : 'respondent1DQFileDirectionsQuestionnaire']: {
          explainedToClient: ['CONFIRM'],
          oneMonthStayRequested: 'No',
          reactionProtocolCompliedWith: 'No',
          reactionProtocolNotCompliedWithReason: `No explanation - ${defendantSolicitorParty.key}`,
        },
      },
      FixedRecoverableCosts: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2
          ? 'respondent2DQFixedRecoverableCosts'
          : 'respondent1DQFixedRecoverableCosts']: {
          isSubjectToFixedRecoverableCostRegime: 'Yes',
          band: 'BAND_2',
          complexityBandingAgreed: 'No',
          reasons: `No explanation - ${defendantSolicitorParty.key}`,
        },
      },
      DisclosureOfNonElectronicDocuments: {
        [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2
          ? 'respondent2DQDisclosureOfNonElectronicDocuments'
          : 'respondent1DQDisclosureOfNonElectronicDocuments']: {
          directionsForDisclosureProposed: 'Yes',
          standardDirectionsRequired: 'No',
          bespokeDirections: `No directions required - ${defendantSolicitorParty.key}`,
        },
      },
    };
  }

  return {};
};

const experts = (defendantSolicitorParty: Party) => {
  const defendantExperts =
    defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2
      ? [partys.DEFENDANT_2_EXPERT_1, partys.DEFENDANT_2_EXPERT_2]
      : [partys.DEFENDANT_1_EXPERT_1, partys.DEFENDANT_1_EXPERT_2];

  return {
    Experts: {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2
        ? 'respondent2DQExperts'
        : 'respondent1DQExperts']: {
        expertRequired: 'Yes',
        expertReportsSent: 'NOT_OBTAINED',
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
};

const witnesses = (defendantSolicitorParty: Party) => {
  const defendantWitnesses =
    defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2
      ? [partys.DEFENDANT_2_WITNESS_1, partys.DEFENDANT_2_WITNESS_2]
      : [partys.DEFENDANT_1_WITNESS_1, partys.DEFENDANT_1_WITNESS_2];

  return {
    Witnesses: {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2
        ? 'respondent2DQWitnesses'
        : 'respondent1DQWitnesses']: {
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
};

const language = (defendantSolicitorParty: Party) => {
  if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
    return {
      Language: {
        respondent1DQLanguage: {
          court: 'BOTH',
          documents: 'BOTH',
        },
      },
    };
  } else if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      Language: {
        respondent2DQLanguage: {
          court: 'BOTH',
          documents: 'BOTH',
        },
      },
    };
  }

  return {};
};

const hearing = (defendantSolicitorParty: Party) => {
  if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
    return {
      Hearing: {
        respondent1DQHearing: {
          unavailableDatesRequired: 'Yes',
          unavailableDates: [
            CaseDataHelper.setIdToData({
              unavailableDateType: 'SINGLE_DATE',
              date: DateHelper.formatDateToString(DateHelper.addToToday({ months: 6 }), {
                outputFormat: 'YYYY-MM-DD',
              }),
            }),
          ],
        },
      },
    };
  } else if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      Hearing: {
        respondent2DQHearing: {
          unavailableDatesRequired: 'Yes',
          unavailableDates: [
            CaseDataHelper.setIdToData({
              unavailableDateType: 'SINGLE_DATE',
              date: DateHelper.formatDateToString(DateHelper.addToToday({ months: 6 }), {
                outputFormat: 'YYYY-MM-DD',
              }),
            }),
          ],
        },
      },
    };
  }

  return {};
};

const draftDirections = (
  draftDirectionsDocument: UploadDocumentValue,
  defendantSolicitorParty: Party,
) => {
  if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
    return {
      DraftDirections: {
        respondent1DQDraftDirections: draftDirectionsDocument,
      },
    };
  } else if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      DraftDirections: {
        respondent2DQDraftDirections: draftDirectionsDocument,
      },
    };
  }

  return {};
};

const requestedCourt = (defendantSolicitorParty: Party) => {

  if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
    const preferredCourt = CaseDataHelper.setCodeToData(preferredCourts[partys.DEFENDANT_1.key].default);
    return {
      RequestedCourt: {
        respondent1DQRequestedCourt: {
          responseCourtLocations: {
            list_items: [preferredCourt],
            value: preferredCourt,
          },
          reasonForHearingAtSpecificCourt: `Reason for preferred court - ${defendantSolicitorParty.key}`,
        },
        respondent1DQRemoteHearing: {
          remoteHearingRequested: 'Yes',
          reasonForRemoteHearing: `Reason for remote hearing - ${defendantSolicitorParty.key}`,
        },
      },
    };
  } else if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
    const preferredCourt = CaseDataHelper.setCodeToData(preferredCourts[partys.DEFENDANT_2.key].default);
    return {
      RequestedCourt: {
        respondent2DQRequestedCourt: {
          responseCourtLocations: {
            list_items: [preferredCourt],
            value: preferredCourt,
          },
          reasonForHearingAtSpecificCourt: `Reason for preferred court - ${defendantSolicitorParty.key}`,
        },
        respondent2DQRemoteHearing: {
          remoteHearingRequested: 'Yes',
          reasonForRemoteHearing: `Reason for remote hearing - ${defendantSolicitorParty.key}`,
        },
      },
    };
  }

  return {};
};

const hearingSupport = (defendantSolicitorParty: Party) => {
  if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
    return {
      HearingSupport: {
        respondent1DQHearingSupport: {
          supportRequirements: 'Yes',
          supportRequirementsAdditional: `Support requirements for ${defendantSolicitorParty.key}`,
        },
      },
    };
  } else if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      HearingSupport: {
        respondent2DQHearingSupport: {
          supportRequirements: 'Yes',
          supportRequirementsAdditional: `Support requirements for ${defendantSolicitorParty.key}`,
        },
      },
    };
  }

  return {};
};

const vulnerabilityQuestions = (defendantSolicitorParty: Party) => {
  if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
    return {
      VulnerabilityQuestions: {
        respondent1DQVulnerabilityQuestions: {
          vulnerabilityAdjustmentsRequired: 'Yes',
          vulnerabilityAdjustments: `Vulnerability adjustments - ${defendantSolicitorParty.key}`,
        },
      },
    };
  } else if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      VulnerabilityQuestions: {
        respondent2DQVulnerabilityQuestions: {
          vulnerabilityAdjustmentsRequired: 'Yes',
          vulnerabilityAdjustments: `Vulnerability adjustments - ${defendantSolicitorParty.key}`,
        },
      },
    };
  }

  return {};
};

const furtherInformation = (defendantSolicitorParty: Party) => {
  if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
    return {
      FurtherInformation: {
        respondent1DQFurtherInformation: {
          futureApplications: 'Yes',
          reasonForFutureApplications: `Further information - ${defendantSolicitorParty.key}`,
          otherInformationForJudge: `Further information - ${defendantSolicitorParty.key}`,
        },
      },
    };
  } else if (defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      FurtherInformation: {
        respondent2DQFurtherInformation: {
          futureApplications: 'Yes',
          reasonForFutureApplications: `Further information - ${defendantSolicitorParty.key}`,
          otherInformationForJudge: `Further information - ${defendantSolicitorParty.key}`,
        },
      },
    };
  }

  return {};
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
        respondent1DetailsForClaimDetailsTab: undefined,
      }
    }
  } else {
    return {};
  } 
};

const defendantResponseDataComponents = {
  confirmDetails,
  singleResponse,
  respondentResponseType,
  solicitorReferences,
  upload,
  fastTrackDq,
  deterWithoutHearing,
  experts,
  witnesses,
  language,
  hearing,
  draftDirections,
  requestedCourt,
  hearingSupport,
  vulnerabilityQuestions,
  furtherInformation,
  statementOfTruth,
  undefine,
};

export default defendantResponseDataComponents;
