import { z } from 'zod';
import ClaimTrack from '../../../../constants/cases/claim-track';
import DefendantResponseSpecType from '../../../../constants/ccd-events/defendant-response-cui/defendant-response-spec-type';
import PaymentTypeSpec from '../../../../constants/ccd-events/defendant-response-cui/payment-type-spec';
import { ClaimantDefendantPartyType } from '../../../../models/users/claimant-defendant-party-types';
import User from '../../../../models/users/user';

type SchemaShape = Record<string, z.ZodType>;

const nonEmptyString = z.string().min(1);

const responseType = (defendantResponseType: DefendantResponseSpecType): SchemaShape => ({
  respondent1ClaimResponseTypeForSpec: nonEmptyString,
  responseClaimMediationSpecRequired: nonEmptyString,
  specAoSApplicantCorrespondenceAddressRequired: nonEmptyString,
  ...(defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE && {
    defenceRouteRequired: nonEmptyString,
  }),
});

const paymentTimeRoute = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
  paymentTypeSpec: PaymentTypeSpec,
): SchemaShape => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_ADMISSION ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    if (
      paymentTypeSpec === PaymentTypeSpec.IMMEDIATELY ||
      paymentTypeSpec === PaymentTypeSpec.BY_SET_DATE
    ) {
      return {
        defenceAdmitPartPaymentTimeRouteRequired: nonEmptyString,
        respondToClaimAdmitPartLRspec: z.looseObject({
          whenWillThisAmountBePaid: nonEmptyString,
        }),
      };
    }

    if (paymentTypeSpec === PaymentTypeSpec.REPAYMENT_PLAN) {
      return {
        defenceAdmitPartPaymentTimeRouteRequired: nonEmptyString,
        respondent1RepaymentPlan: z.looseObject({
          paymentAmount: nonEmptyString,
          repaymentFrequency: nonEmptyString,
          firstRepaymentDate: nonEmptyString,
        }),
      };
    }
  }

  return {};
};

const partAdmitPaymentDetails = (
  _claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
): SchemaShape => {
  if (defendantResponseType === DefendantResponseSpecType.PART_ADMISSION) {
    return {
      specDefenceAdmittedRequired: nonEmptyString,
      respondToAdmittedClaimOwingAmountPounds: nonEmptyString,
      respondToAdmittedClaimOwingAmount: nonEmptyString,
    };
  }

  return {};
};

const totalClaimAmount = (_claimTrack: ClaimTrack): SchemaShape => ({
  totalClaimAmount: z.number(),
});

const defendant1 = (): SchemaShape => ({
  respondent1: z.looseObject({
    partyEmail: nonEmptyString,
    primaryAddress: z.looseObject({
      AddressLine1: nonEmptyString,
      AddressLine2: nonEmptyString.optional(),
      AddressLine3: nonEmptyString.optional(),
      PostCode: nonEmptyString,
      PostTown: nonEmptyString,
    }),
  }),
});

const lipResponse = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
): SchemaShape => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    return {
      respondent1LiPResponse: z.looseObject({
        timelineComment: nonEmptyString,
        evidenceComment: nonEmptyString,
        respondent1DQExtraDetails: z.looseObject({
          wantPhoneOrVideoHearing: nonEmptyString,
          whyPhoneOrVideoHearing: nonEmptyString,
          giveEvidenceYourSelf: nonEmptyString,
          determinationWithoutHearingReason: nonEmptyString,
          requestExtra4weeks: nonEmptyString,
          ...(claimTrack === ClaimTrack.SMALL_CLAIM && {
            determinationWithoutHearingRequired: nonEmptyString,
          }),
          ...(claimTrack === ClaimTrack.FAST_CLAIM && {
            triedToSettle: nonEmptyString,
            considerClaimantDocuments: nonEmptyString,
          }),
          ...((claimTrack === ClaimTrack.INTERMEDIATE_CLAIM ||
            claimTrack === ClaimTrack.MULTI_CLAIM) && {
            triedToSettle: nonEmptyString,
          }),
          ...(claimTrack === ClaimTrack.SMALL_CLAIM && {
            respondent1DQLiPExpert: z.looseObject({}),
          }),
        }),
        respondent1DQHearingSupportLip: z.looseObject({
          supportRequirementLip: nonEmptyString,
          requirementsLip: z.array(z.looseObject({})).min(1),
        }),
        respondent1ResponseLanguage: nonEmptyString,
      }),
    };
  }

  if (defendantResponseType === DefendantResponseSpecType.FULL_ADMISSION) {
    return {
      respondent1LiPResponse: z.looseObject({
        respondent1DQExtraDetails: z.looseObject({
          requestExtra4weeks: nonEmptyString,
        }),
        respondent1ResponseLanguage: nonEmptyString,
      }),
    };
  }

  return {};
};

const mediation = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
): SchemaShape => {
  if (
    claimTrack === ClaimTrack.SMALL_CLAIM &&
    (
      defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
      defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
    )
  ) {
    return {
      respondent1LiPResponseCarm: z.looseObject({
        isMediationEmailCorrect: nonEmptyString,
        isMediationPhoneCorrect: nonEmptyString,
        hasUnavailabilityNextThreeMonths: nonEmptyString,
        unavailableDatesForMediation: z.array(z.looseObject({})).min(1),
      }),
    };
  }

  return {};
};

const disputeDetails = (
  _claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
): SchemaShape => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    return {
      detailsOfWhyDoesYouDisputeTheClaim: nonEmptyString,
      specClaimResponseTimelineList: nonEmptyString,
      specResponseTimelineOfEvents: z.array(z.looseObject({})).min(1),
      specResponselistYourEvidenceList: z.array(z.looseObject({})).min(1),
    };
  }

  if (defendantResponseType === DefendantResponseSpecType.FULL_ADMISSION) {
    return {
      specClaimResponseTimelineList: nonEmptyString,
    };
  }

  return {};
};

const language = (defendantResponseType: DefendantResponseSpecType): SchemaShape => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    return {
      respondent1DQLanguage: z.looseObject({
        court: nonEmptyString,
        documents: nonEmptyString,
      }),
    };
  }

  return {};
};

const vulnerability = (defendantResponseType: DefendantResponseSpecType): SchemaShape => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    return {
      respondent1DQVulnerabilityQuestions: z.looseObject({
        vulnerabilityAdjustmentsRequired: nonEmptyString,
        vulnerabilityAdjustments: nonEmptyString,
      }),
    };
  }

  return {};
};

const requestedCourt = (defendantResponseType: DefendantResponseSpecType): SchemaShape => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    return {
      respondent1DQRequestedCourt: z.looseObject({
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

const witnesses = (
  _claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
): SchemaShape => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    return {
      respondent1DQWitnesses: z.looseObject({
        witnessesToAppear: nonEmptyString,
        details: z.array(z.looseObject({})).min(1),
      }),
    };
  }

  return {};
};

const hearingSmallClaim = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
): SchemaShape => {
  if (
    claimTrack === ClaimTrack.SMALL_CLAIM &&
    (
      defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
      defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
    )
  ) {
    return {
      respondent1DQHearingSmallClaim: z.looseObject({
        unavailableDatesRequired: nonEmptyString,
        smallClaimUnavailableDate: z.array(z.looseObject({})).min(1),
      }),
    };
  }

  return {};
};

const hearingFastClaim = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
): SchemaShape => {
  if (
    claimTrack === ClaimTrack.FAST_CLAIM ||
    claimTrack === ClaimTrack.INTERMEDIATE_CLAIM ||
    claimTrack === ClaimTrack.MULTI_CLAIM
  ) {
    if (
      defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
      defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
    ) {
      return {
        respondent1DQHearingFastClaim: z.looseObject({
          hearingLengthHours: nonEmptyString,
          hearingLengthDays: nonEmptyString,
          unavailableDatesRequired: nonEmptyString,
          unavailableDates: z.array(z.looseObject({})).min(1),
        }),
      };
    }

    if (defendantResponseType === DefendantResponseSpecType.FULL_ADMISSION) {
      return {
        respondent1DQHearingFastClaim: z.looseObject({
          hearingLengthHours: nonEmptyString,
          hearingLengthDays: nonEmptyString,
        }),
      };
    }
  }

  return {};
};

const experts = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
): SchemaShape => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    return {
      respondent1DQExperts: z.looseObject({
        expertRequired: nonEmptyString,
        details: z.array(z.looseObject({})).min(1),
        ...((claimTrack === ClaimTrack.FAST_CLAIM ||
          claimTrack === ClaimTrack.INTERMEDIATE_CLAIM ||
          claimTrack === ClaimTrack.MULTI_CLAIM) && {
          expertReportsSent: nonEmptyString,
          jointExpertSuitable: nonEmptyString,
        }),
      }),
      ...(claimTrack === ClaimTrack.SMALL_CLAIM && {
        responseClaimExpertSpecRequired: nonEmptyString,
      }),
    };
  }

  return {};
};

const hearingSupport = (defendantResponseType: DefendantResponseSpecType): SchemaShape => {
  if (
    defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
    defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
  ) {
    return {
      respondent1DQHearingSupport: z.looseObject({
        supportRequirements: nonEmptyString,
        supportRequirementsAdditional: nonEmptyString,
      }),
    };
  }

  return {};
};

const interMultiTrackDirections = (
  claimTrack: ClaimTrack,
  defendantResponseType: DefendantResponseSpecType,
): SchemaShape => {
  if (
    (
      claimTrack === ClaimTrack.INTERMEDIATE_CLAIM ||
      claimTrack === ClaimTrack.MULTI_CLAIM
    ) &&
    (
      defendantResponseType === DefendantResponseSpecType.FULL_DEFENCE ||
      defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
    )
  ) {
    return {
      ...(claimTrack === ClaimTrack.INTERMEDIATE_CLAIM && {
        respondent1DQFixedRecoverableCostsIntermediate: z.looseObject({
          isSubjectToFixedRecoverableCostRegime: nonEmptyString,
          band: nonEmptyString,
          complexityBandingAgreed: nonEmptyString,
          reasons: nonEmptyString,
        }),
      }),
      specRespondent1DQDisclosureOfElectronicDocuments: z.looseObject({
        reachedAgreement: nonEmptyString,
      }),
      specRespondent1DQDisclosureOfNonElectronicDocuments: z.looseObject({
        bespokeDirections: nonEmptyString,
      }),
      respondent1DQClaimantDocumentsToBeConsidered: z.looseObject({
        hasDocumentsToBeConsidered: nonEmptyString,
        details: nonEmptyString,
      }),
    };
  }

  return {};
};

const financialDetails = (
  defendantResponseType: DefendantResponseSpecType,
  paymentTypeSpec: PaymentTypeSpec,
): SchemaShape => {
  if (
    (
      defendantResponseType === DefendantResponseSpecType.FULL_ADMISSION ||
      defendantResponseType === DefendantResponseSpecType.PART_ADMISSION
    ) && (
      paymentTypeSpec === PaymentTypeSpec.BY_SET_DATE ||
      paymentTypeSpec === PaymentTypeSpec.REPAYMENT_PLAN
    )
  ) {
    return {
      respondent1LiPFinancialDetails: z.looseObject({
        partnerPensionLiP: nonEmptyString,
        partnerDisabilityLiP: nonEmptyString,
        partnerSevereDisabilityLiP: nonEmptyString,
      }),
      respondent1BankAccountList: z.array(z.looseObject({})).min(1),
      disabilityPremiumPayments: nonEmptyString,
      severeDisabilityPremiumPayments: nonEmptyString,
      respondent1DQHomeDetails: z.looseObject({
        type: nonEmptyString,
      }),
      respondent1PartnerAndDependent: z.looseObject({}),
      defenceAdmitPartEmploymentTypeRequired: nonEmptyString,
      respondToClaimAdmitPartEmploymentTypeLRspec: z.array(nonEmptyString).min(1),
      responseClaimAdmitPartEmployer: z.looseObject({}),
      specDefendant1SelfEmploymentDetails: z.looseObject({}),
      respondToClaimAdmitPartUnemployedLRspec: z.looseObject({}),
      respondent1CourtOrderPaymentOption: nonEmptyString,
      respondent1CourtOrderDetails: z.array(z.looseObject({})).min(1),
      respondent1LoanCreditOption: nonEmptyString,
      respondent1LoanCreditDetails: z.array(z.looseObject({})).min(1),
      responseToClaimAdmitPartWhyNotPayLRspec: nonEmptyString,
      specDefendant1Debts: z.looseObject({
        debtDetails: z.array(z.looseObject({})).min(1),
      }),
      respondent1DQRecurringIncomeFA: z.array(z.looseObject({})).min(1),
      respondent1DQRecurringExpensesFA: z.array(z.looseObject({})).min(1),
    };
  }

  return {};
};

const respondentResponsePcq = (): SchemaShape => ({
  respondentResponsePcqId: nonEmptyString,
});

const defendantResponseCuiSchemaBuilderComponents = {
  responseType,
  paymentTimeRoute,
  partAdmitPaymentDetails,
  totalClaimAmount,
  defendant1,
  lipResponse,
  mediation,
  disputeDetails,
  language,
  vulnerability,
  requestedCourt,
  witnesses,
  hearingSmallClaim,
  hearingFastClaim,
  experts,
  hearingSupport,
  interMultiTrackDirections,
  financialDetails,
  respondentResponsePcq,
};

export default defendantResponseCuiSchemaBuilderComponents;
