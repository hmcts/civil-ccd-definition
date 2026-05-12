import { claimantSolicitorUser } from '../../../../../config/users/exui-users';
import preferredCourts from '../../../../../config/preferred-courts';
import partys from '../../../../../constants/users/partys';
import CaseDataHelper from '../../../../../helpers/case-data-helper';
import { UploadDocumentValue } from '../../../../../models/ccd-case-data';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimTypeHelper from '../../../../../helpers/claim-type-helper';
import ClaimantResponseSpecType from '../../../../../constants/ccd-events/claimant-response-spec-type/claimant-response-spec-type';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import DateHelper from '../../../../../helpers/date-helper';

const defendantResponse = (
  claimType: ClaimType,
  claimantResponseType: ClaimantResponseSpecType,
) => {
  if(ClaimTypeHelper.isClaimant2(claimType))
    return {
      RespondentResponse: {
        applicant1ProceedWithClaimSpec2v1:
          claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM ? 'Yes' : 'No'
      }
    };

  return {
    RespondentResponse: {
      applicant1ProceedWithClaim:
        claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM ? 'Yes' : 'No',
    },
  };
};

const claimantDefenceResponseDocument = (defenceResponseDocumentSpec: UploadDocumentValue, claimantResponseType:  ClaimantResponseSpecType) => {
  if(claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM)
    return {
      ApplicantDefenceResponseDocument: {
        applicant1DefenceResponseDocumentSpec: {
          file: defenceResponseDocumentSpec,
        }
      }
    };
  
    return {};
};

const mediationContactInformation = (claimTrack: ClaimTrack, claimantResponseType:  ClaimantResponseSpecType) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM && claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM)
    return {
      MediationContactInformation: {
        app1MediationContactInfo: CaseDataHelper.buildMediationData(
          partys.CLAIMANT_1_MEDIATION_FRIEND,
        ),
      },
    };

  return {};
};

const mediationAvailability = (claimTrack: ClaimTrack, claimantResponseType:  ClaimantResponseSpecType) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM && claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM) {
    const fromDate = DateHelper.formatDateToString(DateHelper.addToToday({months: 1}), {
      outputFormat: 'YYYY-MM-DD',
    });
    const toDate = DateHelper.formatDateToString(DateHelper.addToToday({months: 1, days: 3}), {
      outputFormat: 'YYYY-MM-DD',
    });

    return {
      MediationAvailability: {
        app1MediationAvailability: {
          isMediationUnavailablityExists: 'Yes',
          unavailableDatesForMediation: [
            CaseDataHelper.setIdToData({ fromDate, toDate, unavailableDateType: 'DATE_RANGE' }),
          ],
        },
      },
    };
  }

  return {};
};

const fastTrackDq = (claimTrack: ClaimTrack, claimantResponseType:  ClaimantResponseSpecType) => {
  if (claimTrack === ClaimTrack.FAST_CLAIM && claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM) {
    return {
      FileDirectionsQuestionnaire: {
        applicant1DQFileDirectionsQuestionnaire: {
            oneMonthStayRequested: 'Yes',
            reactionProtocolCompliedWith: 'No',
            reactionProtocolNotCompliedWithReason: `Reaction protocol not complied with reason - ${partys.CLAIMANT_1.key}`,
            explainedToClient: [
                'CONFIRM'
            ]
        }
      },
      FixedRecoverableCosts: {
        applicant1DQFixedRecoverableCosts: {
          isSubjectToFixedRecoverableCostRegime: 'Yes',
          band: 'BAND_4',
          complexityBandingAgreed: 'Yes',
          reasons: `Recoverable costs reason - ${partys.CLAIMANT_1.key}`,
        },
      },
      DisclosureOfElectronicDocuments: {
        specApplicant1DQDisclosureOfElectronicDocuments: {
            reachedAgreement: 'No',
            agreementLikely: 'No',
            reasonForNoAgreement: `Reason for no agreement - ${partys.CLAIMANT_1.key}`,
        }
      },
      DisclosureOfNonElectronicDocuments: {
          specApplicant1DQDisclosureOfNonElectronicDocuments: {
            bespokeDirections: `Directions are proposed for disclosure - ${partys.CLAIMANT_1.key}`,
        },
      },
      DisclosureReport: {
        applicant1DQDisclosureReport: {
          disclosureFormFiledAndServed: "Yes",
          disclosureProposalAgreed: "Yes",
          draftOrderNumber: "12345"
        } 
      }
    };
  };

  return {};
};
const experts = (claimTrack: ClaimTrack, claimantResponseType:  ClaimantResponseSpecType) => {
  if(claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM) {
    if(claimTrack === ClaimTrack.SMALL_CLAIM)
      return {
        SmallClaimExperts: {
          applicant1RespondToClaimExperts: {
            ...CaseDataHelper.buildExpertData(partys.CLAIMANT_EXPERT_1),
            partyName: undefined,
          },
          applicant1ClaimExpertSpecRequired: 'Yes',
        },
      };

    return {
      Experts: {
        applicant1DQExperts: {
          expertRequired: 'Yes',
          expertReportsSent: 'YES',
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
  }
  return {};
};

const determinationWithoutHearing = (claimTrack: ClaimTrack, claimantResponseType:  ClaimantResponseSpecType) => {
  if (claimTrack === ClaimTrack.SMALL_CLAIM && claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM) {
    return {
      DeterminationWithoutHearing: {
        deterWithoutHearing: {
          deterWithoutHearingYesNo: 'No',
          deterWithoutHearingWhyNot: `Determination without hearing reason - ${partys.CLAIMANT_1.key}`,
        },
      },
    };
  }
  return {};
};

const witnesses = (claimTrack: ClaimTrack, claimantResponseType:  ClaimantResponseSpecType) => {
  if(claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM) {
    if(claimTrack === ClaimTrack.SMALL_CLAIM)
      return {
        SmallClaimWitnesses: {
          applicant1DQWitnessesSmallClaim: {
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

    return {
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
  }

  return {};
};

const language = (claimantResponseType:  ClaimantResponseSpecType) => {
  if(claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM) {
    return {
      Language: {
        applicant1DQLanguage: {
          court: 'ENGLISH',
          documents: 'ENGLISH',
        },
      },
    };
  }

  return {};
};

const hearing = (claimTrack: ClaimTrack, claimantResponseType:  ClaimantResponseSpecType) => {
  if(claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM) {
    const fromDate = DateHelper.formatDateToString(DateHelper.addToToday({months: 1}), {outputFormat: 'YYYY-MM-DD'});
    const toDate = DateHelper.formatDateToString(DateHelper.addToToday({months: 1, days: 3}),{outputFormat: 'YYYY-MM-DD'});

    if(claimTrack === ClaimTrack.SMALL_CLAIM)
      return {
        Hearing: {
          applicant1DQSmallClaimHearing: {
            unavailableDatesRequired: 'Yes',
            smallClaimUnavailableDate: [
              CaseDataHelper.setIdToData({ fromDate, toDate, unavailableDateType: 'DATE_RANGE' }),
            ],
          },
        },
      };

    return {
      Hearing: {
        applicant1DQHearingLRspec: {
          unavailableDatesRequired: 'No',
        },
      },
    };
  }
  return {};
};

const requestedCourtLocation = (claimantResponseType:  ClaimantResponseSpecType) => {
  if(claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM) {
    const preferredCourt = CaseDataHelper.setCodeToData(preferredCourts[partys.CLAIMANT_1.key].default);

    return {
      ApplicantCourtLocationLRspec: {
        applicant1DQRequestedCourt: {
          responseCourtLocations: {
            list_items: [preferredCourt],
            value: preferredCourt,
          },
          reasonForHearingAtSpecificCourt: `Court location reason - ${partys.CLAIMANT_1.key}`,
        },
        applicant1DQRemoteHearingLRspec: {
          remoteHearingRequested: 'Yes',
          reasonForRemoteHearing: `Remote hearing reason - ${partys.CLAIMANT_1.key}`,
        },
      },
    };
  }
  return {};
};

const hearingSupport = (claimantResponseType:  ClaimantResponseSpecType) => {
  if(claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM) {
    return {
      HearingSupport: {
        applicant1DQHearingSupport: {
          supportRequirements: 'Yes',
          supportRequirementsAdditional: `Support requirements for ${partys.CLAIMANT_1.key}`,
        },
      },
    };
  }
  return {};
};

const vulnerabilityQuestions = {
  VulnerabilityQuestions: {
    applicant1DQVulnerabilityQuestions: {
      vulnerabilityAdjustmentsRequired: 'Yes',
      vulnerabilityAdjustments: `Vulnerability adjustments - ${partys.CLAIMANT_1.key}`,
    },
  },
};

const application = (claimTrack: ClaimTrack, claimantResponseType:  ClaimantResponseSpecType) => {
  if(claimTrack === ClaimTrack.FAST_CLAIM && claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM)
    return {
      Application: {
        applicant1DQFutureApplications: {
          intentionToMakeFutureApplications: 'Yes',
          whatWillFutureApplicationsBeMadeFor:
            `Future applications will be made for - ${partys.CLAIMANT_1.key}`,
        },
        applicant1AdditionalInformationForJudge:
          `Additional information for judge - ${partys.CLAIMANT_1.key}`,
      },
    };

  return {};
};

const statementOfTruth = {
  StatementOfTruth: {
    uiStatementOfTruth: {
      name: claimantSolicitorUser.name,
      role: 'Solicitor',
    },
  },
};

const claimantResponseSpecData = {
  defendantResponse,
  claimantDefenceResponseDocument,
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
  application,
  statementOfTruth,
};

export default claimantResponseSpecData;
