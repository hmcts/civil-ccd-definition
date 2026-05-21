import { claimantSolicitorUser } from '../../../../../config/users/exui-users';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import partys from '../../../../../constants/users/partys';
import CaseDataHelper from '../../../../../helpers/case-data-helper';
import DateHelper from '../../../../../helpers/date-helper';
import { UploadDocumentValue } from '../../../../../models/ccd-case-data';

const respondentResponse = {
  RespondentResponse: {
    applicant1ProceedWithClaim: 'Yes',
  },
};

const applicantDefenceResponseDocument = (defenceResponseDocument: UploadDocumentValue) => ({
  ApplicantDefenceResponseDocument: {
    applicant1DefenceResponseDocument: {
      file: defenceResponseDocument,
    },
  },
});

const fastTrackDq = (claimTrack: ClaimTrack) => {
  if (claimTrack === ClaimTrack.FAST_CLAIM) {
    return {
      FileDirectionsQuestionnaire: {
        applicant1DQFileDirectionsQuestionnaire: {
          explainedToClient: ['CONFIRM'],
          oneMonthStayRequested: 'Yes',
          reactionProtocolCompliedWith: 'No',
          reactionProtocolNotCompliedWithReason: `Reaction protocol not complied reason - ${partys.CLAIMANT_1.key}`,
        },
      },
      FixedRecoverableCosts: {
        applicant1DQFixedRecoverableCosts: {
          isSubjectToFixedRecoverableCostRegime: 'Yes',
          band: 'BAND_1',
          complexityBandingAgreed: 'Yes',
          reasons: `Recoverable costs reason - ${partys.CLAIMANT_1.key}`,
        },
      },
      DisclosureOfNonElectronicDocuments: {
        applicant1DQDisclosureOfNonElectronicDocuments: {
          directionsForDisclosureProposed: 'Yes',
          standardDirectionsRequired: 'No',
          bespokeDirections: `Directions are proposed for disclosure - ${partys.CLAIMANT_1.key}`,
        },
      },
    }
  }
};

const experts = {
  Experts: {
    applicant1DQExperts: {
      expertRequired: 'Yes',
      expertReportsSent: 'NOT_OBTAINED',
      jointExpertSuitable: 'Yes',
      details: [
        CaseDataHelper.setIdToData({
          ...CaseDataHelper.buildExpertData(partys.CLAIMANT_EXPERT_1),
          partyName: undefined,
        }),
        CaseDataHelper.setIdToData({
          ...CaseDataHelper.buildExpertData(partys.CLAIMANT_EXPERT_2),
          partyName: undefined,
        }),
      ],
    },
  },
};

const witnesses = {
  Witnesses: {
    applicant1DQWitnesses: {
      witnessesToAppear: 'Yes',
      details: [
        CaseDataHelper.setIdToData({
          ...CaseDataHelper.buildWitnessData(partys.CLAIMANT_WITNESS_1),
          partyName: undefined,
        }),
        CaseDataHelper.setIdToData({
          ...CaseDataHelper.buildWitnessData(partys.CLAIMANT_WITNESS_2),
          partyName: undefined,
        }),
      ],
    },
  },
};

const language = {
  Language: {
    applicant1DQLanguage: {
      court: 'BOTH',
      documents: 'BOTH',
    },
  },
};

const hearing = {
  Hearing: {
    applicant1DQHearing: {
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
    applicant1DQDraftDirections: draftDirectionsDocument,
  },
});

const hearingSupport = {
  HearingSupport: {
    applicant1DQHearingSupport: {
      supportRequirements: 'Yes',
      supportRequirementsAdditional: `Support requirements for ${partys.CLAIMANT_1.key}`,
    },
  },
};

const vulnerabilityQuestions = {
  VulnerabilityQuestions: {
    applicant1DQVulnerabilityQuestions: {
      vulnerabilityAdjustmentsRequired: 'Yes',
      vulnerabilityAdjustments: `Vulnerability adjustments - ${partys.CLAIMANT_1.key}`,
    },
  },
};

const furtherInformation = {
  FurtherInformation: {
    applicant1DQFurtherInformation: {
      futureApplications: 'Yes',
      reasonForFutureApplications: `Further information - ${partys.CLAIMANT_1.key}`,
      otherInformationForJudge: `Further information - ${partys.CLAIMANT_1.key}`,
    },
  },
};

const statementOfTruth = {
  StatementOfTruth: {
    uiStatementOfTruth: {
      name: claimantSolicitorUser.name,
      role: 'Solicitor',
    },
  },
};

const claimantResponseDataComponents = {
  respondentResponse,
  applicantDefenceResponseDocument,
  fastTrackDq,
  experts,
  witnesses,
  language,
  hearing,
  draftDirections,
  hearingSupport,
  vulnerabilityQuestions,
  furtherInformation,
  statementOfTruth,
};

export default claimantResponseDataComponents;
