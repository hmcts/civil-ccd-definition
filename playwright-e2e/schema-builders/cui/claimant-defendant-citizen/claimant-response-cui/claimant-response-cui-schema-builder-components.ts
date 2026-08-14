import { z } from 'zod';
import ClaimTrack from '../../../../constants/cases/claim-track';
import ClaimantResponseCuiType from '../../../../constants/ccd-events/claimant-response-cui/claimant-response-cui-type';
import { ClaimantDefendantPartyType } from '../../../../models/users/claimant-defendant-party-types';
import User from '../../../../models/users/user';

type SchemaShape = Record<string, z.ZodType>;

const nonEmptyString = z.string().min(1);

const claimant1 = (
  claimantResponseCuiType: ClaimantResponseCuiType,
  _claimantPartyType: ClaimantDefendantPartyType,
  _claimantCitizenUser: User,
): SchemaShape => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT ||
    claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_SET_DATE_CCJ ||
    claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_REPAYMENT_CCJ
  ) {
    return {
      applicant1: z.looseObject({
        individualDateOfBirth: nonEmptyString,
        individualFirstName: nonEmptyString,
        individualLastName: nonEmptyString,
        individualTitle: nonEmptyString,
        partyEmail: nonEmptyString,
        partyPhone: nonEmptyString,
        soleTraderDateOfBirth: z.null().optional(),
        primaryAddress: z.looseObject({
          AddressLine1: nonEmptyString,
          AddressLine2: nonEmptyString,
          AddressLine3: nonEmptyString,
          PostCode: nonEmptyString,
          PostTown: nonEmptyString,
        }),
        type: nonEmptyString,
      }),
    };
  }

  return {};
};

const defendant1 = (
  claimantResponseCuiType: ClaimantResponseCuiType,
  _defendantPartyType: ClaimantDefendantPartyType,
  _defendantCitizenUser: User,
): SchemaShape => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_SET_DATE_CCJ ||
    claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_REPAYMENT_CCJ
  ) {
    return {
      respondent1: z.looseObject({
        individualDateOfBirth: nonEmptyString,
        individualFirstName: nonEmptyString,
        individualLastName: nonEmptyString,
        individualTitle: nonEmptyString,
        partyEmail: nonEmptyString,
        partyPhone: nonEmptyString,
        primaryAddress: z.looseObject({
          AddressLine1: nonEmptyString,
          AddressLine2: nonEmptyString,
          AddressLine3: nonEmptyString,
          PostCode: nonEmptyString,
          PostTown: nonEmptyString,
        }),
        type: nonEmptyString,
      }),
    };
  }

  return {};
};

const lipResponse = (
  claimTrack: ClaimTrack,
  claimantResponseCuiType: ClaimantResponseCuiType,
): SchemaShape => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
  ) {
    return {
      applicant1LiPResponse: z.looseObject({
        applicant1DQExtraDetails: z.looseObject({
          wantPhoneOrVideoHearing: nonEmptyString,
          whyPhoneOrVideoHearing: nonEmptyString,
          giveEvidenceYourSelf: nonEmptyString,
          ...(claimTrack === ClaimTrack.SMALL_CLAIM && {
            determinationWithoutHearingRequired: nonEmptyString,
            applicant1DQLiPExpert: z.looseObject({
              caseNeedsAnExpert: nonEmptyString,
              expertReportRequired: nonEmptyString,
            }),
          }),
          ...((
            claimTrack === ClaimTrack.FAST_CLAIM ||
            claimTrack === ClaimTrack.INTERMEDIATE_CLAIM ||
            claimTrack === ClaimTrack.MULTI_CLAIM
          ) && {
            triedToSettle: nonEmptyString,
            requestExtra4weeks: nonEmptyString,
          }),
          ...(claimTrack === ClaimTrack.FAST_CLAIM && {
            considerClaimantDocuments: nonEmptyString,
            considerClaimantDocumentsDetails: nonEmptyString,
          }),
        }),
        applicant1DQHearingSupportLip: z.looseObject({
          supportRequirementLip: nonEmptyString,
          requirementsLip: z.array(z.looseObject({
            value: z.looseObject({
              name: nonEmptyString,
              requirements: z.array(nonEmptyString).min(1),
              otherSupport: nonEmptyString,
            }),
          })).min(1),
        }),
      }),
    };
  }

  return {};
};

const mediation = (
  claimTrack: ClaimTrack,
  claimantResponseCuiType: ClaimantResponseCuiType,
): SchemaShape => {
  if (
    claimTrack === ClaimTrack.SMALL_CLAIM &&
    (
      claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
      claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
    )
  ) {
    return {
      applicant1LiPResponseCarm: z.looseObject({
        isMediationEmailCorrect: nonEmptyString,
        isMediationPhoneCorrect: nonEmptyString,
        hasUnavailabilityNextThreeMonths: nonEmptyString,
        unavailableDatesForMediation: z.array(z.looseObject({
          value: z.looseObject({
            who: nonEmptyString,
            date: nonEmptyString,
            fromDate: nonEmptyString,
            unavailableDateType: nonEmptyString,
          }),
        })).min(1),
      }),
    };
  }

  return {};
};

const language = (claimantResponseCuiType: ClaimantResponseCuiType): SchemaShape => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
  ) {
    return {
      applicant1DQLanguage: z.looseObject({
        court: nonEmptyString,
        documents: nonEmptyString,
      }),
    };
  }

  return {};
};

const vulnerability = (claimantResponseCuiType: ClaimantResponseCuiType): SchemaShape => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
  ) {
    return {
      applicant1DQVulnerabilityQuestions: z.looseObject({
        vulnerabilityAdjustmentsRequired: nonEmptyString,
        vulnerabilityAdjustments: nonEmptyString,
      }),
    };
  }

  return {};
};

const requestedCourt = (claimantResponseCuiType: ClaimantResponseCuiType): SchemaShape => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
  ) {
    return {
      applicant1DQRequestedCourt: z.looseObject({
        reasonForHearingAtSpecificCourt: nonEmptyString,
        caseLocation: z.looseObject({
          region: nonEmptyString,
          baseLocation: nonEmptyString,
        }),
      }),
    };
  }

  return {};
};

const witnesses = (claimantResponseCuiType: ClaimantResponseCuiType): SchemaShape => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
  ) {
    return {
      applicant1DQWitnesses: z.looseObject({
        witnessesToAppear: nonEmptyString,
        details: z.array(z.looseObject({
          value: z.looseObject({
            name: nonEmptyString,
            firstName: nonEmptyString,
            lastName: nonEmptyString,
            phoneNumber: nonEmptyString,
            emailAddress: nonEmptyString,
            reasonForWitness: nonEmptyString,
          }),
        })).min(1),
      }),
    };
  }

  return {};
};

const hearingSmallClaim = (
  claimTrack: ClaimTrack,
  claimantResponseCuiType: ClaimantResponseCuiType,
): SchemaShape => {
  if (
    claimTrack === ClaimTrack.SMALL_CLAIM &&
    (
      claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
      claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
    )
  ) {
    return {
      applicant1DQSmallClaimHearing: z.looseObject({
        unavailableDatesRequired: nonEmptyString,
        smallClaimUnavailableDate: z.array(z.looseObject({
          value: z.looseObject({
            who: nonEmptyString,
            date: nonEmptyString,
            fromDate: nonEmptyString,
            unavailableDateType: nonEmptyString,
          }),
        })).min(1),
      }),
    };
  }

  return {};
};

const experts = (
  claimTrack: ClaimTrack,
  claimantResponseCuiType: ClaimantResponseCuiType,
): SchemaShape => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
  ) {
    return {
      applicant1DQExperts: z.looseObject({
        expertRequired: nonEmptyString,
        details: z.array(z.looseObject({
          value: z.looseObject({
            name: nonEmptyString,
            firstName: nonEmptyString,
            lastName: nonEmptyString,
            phoneNumber: nonEmptyString,
            emailAddress: nonEmptyString,
            whyRequired: nonEmptyString,
            fieldOfExpertise: nonEmptyString,
            estimatedCost: nonEmptyString,
          }),
        })).min(1),
        ...((
          claimTrack === ClaimTrack.FAST_CLAIM ||
          claimTrack === ClaimTrack.INTERMEDIATE_CLAIM ||
          claimTrack === ClaimTrack.MULTI_CLAIM
        ) && {
          expertReportsSent: nonEmptyString,
          jointExpertSuitable: nonEmptyString,
        }),
      }),
    };
  }

  return {};
};

const ccjResponse = (
  claimTrack: ClaimTrack,
  claimantResponseCuiType: ClaimantResponseCuiType,
): SchemaShape => {
  if (
    claimTrack === ClaimTrack.SMALL_CLAIM &&
    (
      claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_SET_DATE_CCJ ||
      claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_REPAYMENT_CCJ
    )
  ) {
    return {
      applicant1LiPResponse: z.looseObject({
        applicant1ChoosesHowToProceed: nonEmptyString,
      }),
      applicant1AcceptFullAdmitPaymentPlanSpec: nonEmptyString,
      applicant1RepaymentOptionForDefendantSpec: nonEmptyString,
      applicant1SettleClaim: nonEmptyString,
      ...(claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_SET_DATE_CCJ && {
        applicant1RequestedPaymentDateForDefendantSpec: z.looseObject({
          paymentSetDate: nonEmptyString,
        }),
      }),
      ...(claimantResponseCuiType === ClaimantResponseCuiType.ACCEPT_FULL_ADMIT_REPAYMENT_CCJ && {
        applicant1SuggestInstalmentsPaymentAmountForDefendantSpec: z.number(),
        applicant1SuggestInstalmentsRepaymentFrequencyForDefendantSpec: nonEmptyString,
        applicant1SuggestInstalmentsFirstRepaymentDateForDefendantSpec: nonEmptyString,
      }),
      ccjPaymentPaidSomeOption: nonEmptyString,
      ccjJudgmentAmountClaimFee: nonEmptyString,
      ccjJudgmentLipInterest: nonEmptyString,
      totalClaimAmount: z.number(),
    };
  }

  return {};
};

const hearingSupport = (claimantResponseCuiType: ClaimantResponseCuiType): SchemaShape => {
  if (
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE ||
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT
  ) {
    return {
      applicant1DQHearingSupport: z.looseObject({
        supportRequirements: nonEmptyString,
        supportRequirementsAdditional: nonEmptyString,
      }),
    };
  }

  return {};
};

const interTrackDirections = (
  claimTrack: ClaimTrack,
  claimantResponseCuiType: ClaimantResponseCuiType,
): SchemaShape => {
  if (
    (
      claimTrack === ClaimTrack.INTERMEDIATE_CLAIM ||
      claimTrack === ClaimTrack.MULTI_CLAIM
    ) &&
    claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE
  ) {
    return {
      ...(claimTrack === ClaimTrack.INTERMEDIATE_CLAIM && {
        applicant1DQFixedRecoverableCostsIntermediate: z.looseObject({
          isSubjectToFixedRecoverableCostRegime: nonEmptyString,
          band: nonEmptyString,
          complexityBandingAgreed: nonEmptyString,
          reasons: nonEmptyString,
        }),
      }),
      specApplicant1DQDisclosureOfElectronicDocuments: z.looseObject({
        reachedAgreement: nonEmptyString,
      }),
      specApplicant1DQDisclosureOfNonElectronicDocuments: z.looseObject({
        bespokeDirections: nonEmptyString,
      }),
      applicant1DQDefendantDocumentsToBeConsidered: z.looseObject({
        hasDocumentsToBeConsidered: nonEmptyString,
        details: nonEmptyString,
      }),
    };
  }

  return {};
};

const claimResponse = (claimantResponseCuiType: ClaimantResponseCuiType): SchemaShape => {
  if (claimantResponseCuiType === ClaimantResponseCuiType.REJECT_FULL_DEFENCE) {
    return {
      applicant1ProceedWithClaim: nonEmptyString,
      applicant1SettleClaim: nonEmptyString,
    };
  }

  if (claimantResponseCuiType === ClaimantResponseCuiType.REJECT_PART_ADMIT) {
    return {
      applicant1AcceptAdmitAmountPaidSpec: nonEmptyString,
      applicant1SettleClaim: nonEmptyString,
    };
  }

  return {};
};

const undefine = {
  nextDeadline: z.undefined().optional(),
}

const ignore = {
  systemGeneratedCaseDocuments: z.any().optional(),
}

const claimantResponseCuiSchemaBuilderComponents = {
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
  undefine,
  ignore,
};

export default claimantResponseCuiSchemaBuilderComponents;
