import StringHelper from '../../../../../helpers/string-helper';
import preferredCourts from '../../../../../config/preferred-courts';
import CaseDataHelper from '../../../../../helpers/case-data-helper';
import DateHelper from '../../../../../helpers/date-helper';
import partys from '../../../../../constants/users/partys';
import CCDCaseData, { UploadDocumentValue } from '../../../../../models/ccd-case-data';
import DefendantResponseType from '../../../../../constants/ccd-events/defendant-response/unspec/defendant-response-type';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import { defendantSolicitor1User } from '../../../../../config/users/exui-users';

const confirmDetails = (ccdCaseData: CCDCaseData) => ({
  ConfirmDetails: {
    respondent1: structuredClone(ccdCaseData.respondent1),
    respondent1Copy: structuredClone(ccdCaseData.respondent1)
  },
});

const respondentResponseType = (responseType: DefendantResponseType) => ({
  RespondentResponseType: {
    respondent1ClaimResponseType: responseType,
    multiPartyResponseTypeFlags: responseType,
  },
});

const solicitorReferences = (ccdCaseData: CCDCaseData) => ({
  SolicitorReferences: {
    solicitorReferences: ccdCaseData.solicitorReferences,
  },
});

const upload = (defenceDocument: UploadDocumentValue) => ({
  Upload: {
    respondent1ClaimResponseDocument: {
      file: defenceDocument,
    },
  },
});

const fastTrackDq = (claimTrack: ClaimTrack) => {
  {
    if(claimTrack === ClaimTrack.FAST_CLAIM) {
      return {
        FileDirectionsQuestionnaire: {
          respondent1DQFileDirectionsQuestionnaire: {
            explainedToClient: ['CONFIRM'],
            oneMonthStayRequested: 'No',
            reactionProtocolCompliedWith: 'No',
            reactionProtocolNotCompliedWithReason: `No explanation - ${partys.DEFENDANT_1.key}`,
          },
        },
        FixedRecoverableCosts: {
          respondent1DQFixedRecoverableCosts: {
            isSubjectToFixedRecoverableCostRegime: 'Yes',
            band: 'BAND_1',
            complexityBandingAgreed: 'Yes',
            reasons: `No explanation - ${partys.DEFENDANT_1.key}`,
          },
        },
        DisclosureOfNonElectronicDocuments: {
          respondent1DQDisclosureOfNonElectronicDocuments: {
            directionsForDisclosureProposed: 'Yes',
            standardDirectionsRequired: 'No',
            bespokeDirections: `No directions required - ${partys.DEFENDANT_1.key}`,
          },
        },
      }
    }
  }
};

const experts = {
  Experts: {
    respondent1DQExperts: {
      expertRequired: 'Yes',
      expertReportsSent: 'NOT_OBTAINED',
      jointExpertSuitable: 'No',
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

const witnesses = {
  Witnesses: {
    respondent1DQWitnesses: {
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

const language = {
  Language: {
    respondent1DQLanguage: {
      court: 'BOTH',
      documents: 'BOTH',
    },
  },
};

const hearing = {
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

const draftDirections = (draftDirectionsDocument: UploadDocumentValue) => ({
  DraftDirections: {
    respondent1DQDraftDirections: draftDirectionsDocument,
  },
});

const requestedCourt = () => {
  const preferredCourt = CaseDataHelper.setCodeToData(preferredCourts[partys.DEFENDANT_1.key].default);

  return {
    RequestedCourt: {
      respondent1DQRequestedCourt: {
        responseCourtLocations: {
          list_items: [preferredCourt],
          value: preferredCourt,
        },
        reasonForHearingAtSpecificCourt: `Reason for preferred court - ${partys.DEFENDANT_1.key}`,
      },
      respondent1DQRemoteHearing: {
        remoteHearingRequested: 'Yes',
        reasonForRemoteHearing: `Reason for remote hearing - ${partys.DEFENDANT_1.key}`,
      },
    },
  };
};

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

const furtherInformation = {
  FurtherInformation: {
    respondent1DQFurtherInformation: {
      futureApplications: 'Yes',
      reasonForFutureApplications: `Further information - ${partys.DEFENDANT_1.key}`,
      otherInformationForJudge: `Further information - ${partys.DEFENDANT_1.key}`,
    },
  },
};

const statementOfTruth = {
  StatementOfTruth: {
    uiStatementOfTruth: {
      name: defendantSolicitor1User.name,
      role: 'Solicitor',
    },
  },
};

const defendantResponseDataComponents = {
  confirmDetails,
  solicitorReferences,
  respondentResponseType,
  upload,
  fastTrackDq,
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
};

export default defendantResponseDataComponents;
