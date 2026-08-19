import ClaimTrack from '../../../../constants/cases/claim-track';
import ClaimantResponseCuiType from '../../../../constants/ccd-events/claimant-response-cui/claimant-response-cui-type';
import partys from '../../../../constants/users/partys';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import DateHelper from '../../../../helpers/date-helper';
import CCDCaseData from '../../../../models/ccd-case-data';
import { ClaimantDefendantPartyType } from '../../../../models/users/claimant-defendant-party-types';
import User from '../../../../models/users/user';

const formatDateTime = (date: Date) =>
  `${DateHelper.formatDateToString(date, { outputFormat: 'YYYY-MM-DD' })}T00:00:00.000Z`;

const claimant1 = (
  claimantResponseCuiType: ClaimantResponseCuiType,
  claimantPartyType: ClaimantDefendantPartyType,
  claimantCitizenUser: User,
) => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT ||
    claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_SET_DATE_CCJ ||
    claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_REPAYMENT_CCJ
  ) {
    const applicant1Data = CaseDataHelper.buildClaimantAndDefendantData(
      partys.CLAIMANT_1,
      claimantPartyType,
    );

    const { partyName, ...claimant1Data } = applicant1Data;

    return {
      applicant1: {
        ...claimant1Data,
        partyEmail: claimantCitizenUser.email,
        primaryAddress: {
          AddressLine1: applicant1Data.primaryAddress.AddressLine1,
          AddressLine2: applicant1Data.primaryAddress.AddressLine2,
          AddressLine3: applicant1Data.primaryAddress.AddressLine3,
          PostCode: applicant1Data.primaryAddress.PostCode,
          PostTown: applicant1Data.primaryAddress.PostTown,
        },
      },
    };
  }

  return {};
};

const defendant1 = (
  claimantResponseCuiType: ClaimantResponseCuiType,
  defendantPartyType: ClaimantDefendantPartyType,
  defendantCitizenUser: User,
) => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_SET_DATE_CCJ ||
    claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_REPAYMENT_CCJ
  ) {
    const respondent1Data = CaseDataHelper.buildClaimantAndDefendantData(
      partys.DEFENDANT_1,
      defendantPartyType,
    );

    const { partyName, ...defendant1Data } = respondent1Data;

    return {
      respondent1: {
        ...defendant1Data,
        partyEmail: defendantCitizenUser.email,
        primaryAddress: {
          AddressLine1: respondent1Data.primaryAddress.AddressLine1,
          AddressLine2: respondent1Data.primaryAddress.AddressLine2,
          AddressLine3: respondent1Data.primaryAddress.AddressLine3,
          PostCode: respondent1Data.primaryAddress.PostCode,
          PostTown: respondent1Data.primaryAddress.PostTown,
        },
      },
    };
  }

  return {};
};

const lipResponse = (
  claimTrack: ClaimTrack,
  claimantResponseCuiType: ClaimantResponseCuiType,
) => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
  ) {
    return {
      applicant1LiPResponse: {
        applicant1DQExtraDetails: {
          wantPhoneOrVideoHearing: 'Yes',
          whyPhoneOrVideoHearing: 'Telephone or video hearing',
          giveEvidenceYourSelf: 'Yes',
          ...(claimTrack === ClaimTrack.SMALL_CLAIM && {
            determinationWithoutHearingRequired: 'No',
            applicant1DQLiPExpert: {
              caseNeedsAnExpert: 'Yes',
              expertReportRequired: 'Yes',
            },
          }),
          ...((
            claimTrack === ClaimTrack.FAST_CLAIM ||
            claimTrack === ClaimTrack.INTERMEDIATE_CLAIM ||
            claimTrack === ClaimTrack.MULTI_CLAIM
          ) && {
            triedToSettle: 'Yes',
            requestExtra4weeks: 'Yes',
          }),
          ...(claimTrack === ClaimTrack.FAST_CLAIM && {
            considerClaimantDocuments: 'Yes',
            considerClaimantDocumentsDetails: 'Details of documents',
          }),
        },
        applicant1DQHearingSupportLip: {
          supportRequirementLip: 'Yes',
          requirementsLip: [
            {
              value: {
                name: 'Claimant1 Individual',
                requirements: [
                  'DISABLED_ACCESS',
                  'OTHER_SUPPORT',
                ],
                otherSupport: 'Other support',
              },
            },
          ],
        },
      },
    };
  }

  return {};
};

const mediation = (
  claimTrack: ClaimTrack,
  claimantResponseCuiType: ClaimantResponseCuiType,
) => {
  if (
    claimTrack === ClaimTrack.SMALL_CLAIM &&
    (
      claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
      claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
    )
  ) {
    const unavailableDate = {
      who: 'defendant',
      date: formatDateTime(DateHelper.addToToday({ days: 60 })),
      fromDate: formatDateTime(DateHelper.addToToday({ days: 60 })),
      unavailableDateType: 'SINGLE_DATE',
    };

    return {
      applicant1LiPResponseCarm: {
        isMediationEmailCorrect: 'Yes',
        isMediationPhoneCorrect: 'Yes',
        hasUnavailabilityNextThreeMonths: 'Yes',
        unavailableDatesForMediation: [
          {
            value: unavailableDate,
          },
        ],
      },
    };
  }

  return {};
};

const language = (claimantResponseCuiType: ClaimantResponseCuiType) => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
  ) {
    return {
      applicant1DQLanguage: {
        court: 'ENGLISH',
        documents: 'ENGLISH',
      },
    };
  }

  return {};
};

const vulnerability = (claimantResponseCuiType: ClaimantResponseCuiType) => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
  ) {
    return {
      applicant1DQVulnerabilityQuestions: {
        vulnerabilityAdjustmentsRequired: 'Yes',
        vulnerabilityAdjustments: 'Vulnerable support people',
      },
    };
  }

  return {};
};

const requestedCourt = (claimantResponseCuiType: ClaimantResponseCuiType) => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
  ) {
    return {
      applicant1DQRequestedCourt: {
        reasonForHearingAtSpecificCourt: 'Reason hearing to be held at this court',
        caseLocation: {
          region: 'Central London County Court - Thomas More Building, Royal Courts of Justice, Strand, London - WC2A 2LL',
          baseLocation: 'Central London County Court - Thomas More Building, Royal Courts of Justice, Strand, London - WC2A 2LL',
        },
      },
    };
  }

  return {};
};

const witnesses = (claimantResponseCuiType: ClaimantResponseCuiType) => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
  ) {
    const { partyName, ...witness } = CaseDataHelper.buildWitnessData(
      partys.CLAIMANT_WITNESS_1,
    );

    return {
      applicant1DQWitnesses: {
        witnessesToAppear: 'Yes',
        details: [
          {
            value: {
              name: partyName,
              ...witness,
            },
          },
        ],
      },
    };
  }

  return {};
};

const hearingSmallClaim = (
  claimTrack: ClaimTrack,
  claimantResponseCuiType: ClaimantResponseCuiType,
) => {
  if (
    claimTrack === ClaimTrack.SMALL_CLAIM &&
    (
      claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
      claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
    )
  ) {
    const unavailableDate = {
      who: 'defendant',
      date: formatDateTime(DateHelper.addToToday({ days: 60 })),
      fromDate: formatDateTime(DateHelper.addToToday({ days: 60 })),
      unavailableDateType: 'SINGLE_DATE',
    };

    return {
      applicant1DQSmallClaimHearing: {
        unavailableDatesRequired: 'Yes',
        smallClaimUnavailableDate: [
          {
            value: unavailableDate,
          },
        ],
      },
    };
  }

  return {};
};

const experts = (
  claimTrack: ClaimTrack,
  claimantResponseCuiType: ClaimantResponseCuiType,
) => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
  ) {
    const { partyName, ...expert } = CaseDataHelper.buildExpertData(
      partys.CLAIMANT_EXPERT_1,
    );

    return {
      applicant1DQExperts: {
        expertRequired: 'Yes',
        details: [
          {
            value: {
              name: partyName,
              ...expert,
            },
          },
        ],
        ...((
          claimTrack === ClaimTrack.FAST_CLAIM ||
          claimTrack === ClaimTrack.INTERMEDIATE_CLAIM ||
          claimTrack === ClaimTrack.MULTI_CLAIM
        ) && {
          expertReportsSent: 'YES',
          jointExpertSuitable: 'Yes',
        }),
      },
    };
  }

  return {};
};

const ccjResponse = (
  claimTrack: ClaimTrack,
  claimantResponseCuiType: ClaimantResponseCuiType,
  caseDataBeforeSubmission?: CCDCaseData,
) => {
  if (
    claimTrack === ClaimTrack.SMALL_CLAIM &&
    (
      claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_SET_DATE_CCJ ||
      claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_REPAYMENT_CCJ
    )
  ) {
    return {
      applicant1LiPResponse: {
        applicant1ChoosesHowToProceed: 'REQUEST_A_CCJ',
      },
      applicant1AcceptFullAdmitPaymentPlanSpec: 'Yes',
      applicant1RepaymentOptionForDefendantSpec:
        claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_REPAYMENT_CCJ
          ? 'REPAYMENT_PLAN'
          : 'SET_DATE',
      applicant1SettleClaim: 'Yes',
      ...(claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_SET_DATE_CCJ && {
        applicant1RequestedPaymentDateForDefendantSpec: {
          paymentSetDate: DateHelper.formatDateToString(DateHelper.addToToday({ days: 60 }), {
            outputFormat: 'YYYY-MM-DD',
          }),
        },
      }),
      ...(claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_REPAYMENT_CCJ && {
        applicant1SuggestInstalmentsPaymentAmountForDefendantSpec: 20,
        applicant1SuggestInstalmentsRepaymentFrequencyForDefendantSpec: 'ONCE_ONE_WEEK',
        applicant1SuggestInstalmentsFirstRepaymentDateForDefendantSpec: DateHelper.formatDateToString(
          DateHelper.addToToday({ days: 60 }),
          { outputFormat: 'YYYY-MM-DD' },
        ),
      }),
      ccjPaymentPaidSomeOption: 'No',
      ccjJudgmentAmountClaimFee: String(
        caseDataBeforeSubmission!.claimFee!.calculatedAmountInPence,
      ),
      ccjJudgmentLipInterest: '0',
      totalClaimAmount: CaseDataHelper.getClaimValue(claimTrack),
    };
  }

  return {};
};

const hearingSupport = (claimantResponseCuiType: ClaimantResponseCuiType) => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
  ) {
    return {
      applicant1DQHearingSupport: {
        supportRequirements: 'Yes',
        supportRequirementsAdditional: 'Claimant1 Individual :Disabled access,Other support:Other support;',
      },
    };
  }

  return {};
};

const interTrackDirections = (
  claimTrack: ClaimTrack,
  claimantResponseCuiType: ClaimantResponseCuiType,
) => {
  if (
    (
      claimTrack === ClaimTrack.INTERMEDIATE_CLAIM ||
      claimTrack === ClaimTrack.MULTI_CLAIM
    ) &&
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE
  ) {
    return {
      ...(claimTrack === ClaimTrack.INTERMEDIATE_CLAIM && {
        applicant1DQFixedRecoverableCostsIntermediate: {
          isSubjectToFixedRecoverableCostRegime: 'Yes',
          band: 'BAND_3',
          complexityBandingAgreed: 'Yes',
          reasons: 'Reason for band selection',
        },
      }),
      specApplicant1DQDisclosureOfElectronicDocuments: {
        reachedAgreement: 'Yes',
      },
      specApplicant1DQDisclosureOfNonElectronicDocuments: {
        bespokeDirections: 'The non-electronic documents proposed for disclosure.',
      },
      applicant1DQDefendantDocumentsToBeConsidered: {
        hasDocumentsToBeConsidered: 'Yes',
        details: 'Documents defendants that court need to consider',
      },
    };
  }

  return {};
};

const claimResponse = (claimantResponseCuiType: ClaimantResponseCuiType) => {
  if (claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE) {
    return {
      applicant1ProceedWithClaim: 'Yes',
      applicant1SettleClaim: 'No',
    };
  }

  if (claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT) {
    return {
      applicant1AcceptAdmitAmountPaidSpec: 'No',
      applicant1SettleClaim: 'No',
    };
  }

  return {};
};

const claimantResponseCuiDataBuilderComponents = {
  claimant1,
  defendant1,
  lipResponse,
  mediation,
  language,
  vulnerability,
  requestedCourt,
  witnesses,
  hearingSmallClaim,
  experts,
  hearingSupport,
  interTrackDirections,
  ccjResponse,
  claimResponse,
};

export default claimantResponseCuiDataBuilderComponents;
