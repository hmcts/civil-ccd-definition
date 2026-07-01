import { z } from 'zod';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimTypeHelper from '../../../../../helpers/claim-type-helper';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import ClaimantResponseSpecType from '../../../../../constants/ccd-events/claimant-response-spec-type/claimant-response-spec-type';
import DefendantResponseSpecType from '../../../../../constants/ccd-events/defendant-response/lr-spec/defendant-response-spec-type';
import PaymentTypeSpec from '../../../../../constants/ccd-events/defendant-response/lr-spec/payment-type-spec';

const yesNoSchema = z.enum(['Yes', 'No']);
const nonEmptyString = z.string().min(1);

const defendantResponse = (
  claimType: ClaimType,
  claimantResponseType: ClaimantResponseSpecType,
  defendantResponseSpecType: DefendantResponseSpecType,
  paymentTypeSpec: PaymentTypeSpec,
) => {
  if(
    defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION &&
    paymentTypeSpec === PaymentTypeSpec.IMMEDIATELY
  )
    return {};

  if (ClaimTypeHelper.isClaimant2(claimType)) {
    return {
      applicant1ProceedWithClaimSpec2v1: yesNoSchema,
    };
  }

  return {
    applicant1ProceedWithClaim: yesNoSchema,
  };
};

const defendantResponsePartAdmit = (defendantResponseSpecType: DefendantResponseSpecType) => {
  if(defendantResponseSpecType === DefendantResponseSpecType.PART_ADMISSION) {
    return {
      applicant1PartAdmitConfirmAmountPaidSpec: yesNoSchema,
    };
  }

  return {};
};

const intentionToSettleClaim = (
  defendantResponseSpecType: DefendantResponseSpecType,
  claimantResponseType: ClaimantResponseSpecType,
) => {
  if(defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION)
    return {};

  if(
    defendantResponseSpecType === DefendantResponseSpecType.PART_ADMISSION &&
    claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM
  ) {
    return {
      applicant1PartAdmitIntentionToSettleClaimSpec: yesNoSchema,
      // applicant1PartAdmitRejectReasonSpec: nonEmptyString,
    };
  }

  return {};
};

const claimantDefenceResponseDocument = (
  defendantResponseSpecType: DefendantResponseSpecType,
  claimantResponseType: ClaimantResponseSpecType,
) => {
  if(defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION)
    return {};

  if(claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM)
    return {
      applicant1DefenceResponseDocumentSpec: z.looseObject({}),
    };

  return {};
};

const mediationContactInformation = (
  defendantResponseSpecType: DefendantResponseSpecType,
  claimTrack: ClaimTrack,
  claimantResponseType: ClaimantResponseSpecType,
) => {
  if(defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION)
    return {};

  if(claimTrack === ClaimTrack.SMALL_CLAIM && claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM)
    return {
      app1MediationContactInfo: z.looseObject({}),
    };

  return {};
};

const mediationAvailability = (
  defendantResponseSpecType: DefendantResponseSpecType,
  claimTrack: ClaimTrack,
  claimantResponseType: ClaimantResponseSpecType,
) => {
  if(defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION)
    return {};

  if(claimTrack === ClaimTrack.SMALL_CLAIM && claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM)
    return {
      app1MediationAvailability: z.looseObject({
        isMediationUnavailablityExists: yesNoSchema,
        unavailableDatesForMediation: z.array(z.looseObject({})).min(1),
      }),
    };

  return {};
};

const determinationWithoutHearing = (
  defendantResponseSpecType: DefendantResponseSpecType,
  claimTrack: ClaimTrack,
  claimantResponseType: ClaimantResponseSpecType,
) => {
  if(defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION)
    return {};

  if (
    claimTrack === ClaimTrack.SMALL_CLAIM &&
    claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM
  ) {
    return {
      // deterWithoutHearing: z.looseObject({
      //   deterWithoutHearingYesNo: yesNoSchema,
      // }),
      deterWithoutHearing: z.looseObject({
        deterWithoutHearingYesNo: yesNoSchema,
        deterWithoutHearingWhyNot: nonEmptyString,
      }),
    }; 
  }

  return {};
};

const fastTrackDq = (
  defendantResponseSpecType: DefendantResponseSpecType,
  claimTrack: ClaimTrack,
  claimantResponseType: ClaimantResponseSpecType,
) => {
  if(defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION)
    return {};

  if (
    claimTrack === ClaimTrack.FAST_CLAIM &&
    claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM
  ) {
    return {
      applicant1DQFileDirectionsQuestionnaire: z.strictObject({
        explainedToClient: z.array(nonEmptyString).min(1),
        oneMonthStayRequested: yesNoSchema,
        reactionProtocolCompliedWith: yesNoSchema,
        reactionProtocolNotCompliedWithReason: nonEmptyString,
      }),
      applicant1DQFixedRecoverableCosts: z.strictObject({
        isSubjectToFixedRecoverableCostRegime: yesNoSchema,
        band: nonEmptyString,
        complexityBandingAgreed: yesNoSchema,
        reasons: nonEmptyString,
      }),
      specApplicant1DQDisclosureOfElectronicDocuments: z.strictObject({
        reachedAgreement: yesNoSchema,
        agreementLikely: yesNoSchema,
        reasonForNoAgreement: nonEmptyString,
      }),
      specApplicant1DQDisclosureOfNonElectronicDocuments: z.strictObject({
        bespokeDirections: nonEmptyString,
      }),
      applicant1DQDisclosureReport: z.strictObject({
        disclosureFormFiledAndServed: yesNoSchema,
        disclosureProposalAgreed: yesNoSchema,
        draftOrderNumber: nonEmptyString,
      }),
    };
  }

  return {};
};

const experts = (
  defendantResponseSpecType: DefendantResponseSpecType,
  claimTrack: ClaimTrack,
  claimantResponseType: ClaimantResponseSpecType,
) => {
  if(defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION)
    return {};

  if (claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM) {
    if (claimTrack === ClaimTrack.SMALL_CLAIM) {
      return {
        applicant1RespondToClaimExperts: z.looseObject({}),
        applicant1ClaimExpertSpecRequired: yesNoSchema,
      };
    }

    return {
      applicant1DQExperts: z.looseObject({
          // expertRequired: yesNoSchema,
          expertReportsSent: nonEmptyString,
          jointExpertSuitable: yesNoSchema,
          details: z.array(
            z.strictObject({
              id: nonEmptyString,
              value: z.looseObject({
                firstName: nonEmptyString,
                lastName: nonEmptyString,
                emailAddress: nonEmptyString,
                phoneNumber: nonEmptyString,
                fieldOfExpertise: nonEmptyString,
                whyRequired: nonEmptyString,
                estimatedCost: nonEmptyString,
              }),
            }),
          ).min(1),
        }),
      };
  }

  return {};
};

const witnesses = (
  defendantResponseSpecType: DefendantResponseSpecType,
  claimTrack: ClaimTrack,
  claimantResponseType: ClaimantResponseSpecType,
) => {
  if(defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION)
    return {};

  if (claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM) {
    if (claimTrack === ClaimTrack.SMALL_CLAIM) {
      return {
        applicant1DQWitnessesSmallClaim: z.strictObject({
          details: z.array(
            z.strictObject({
              id: nonEmptyString,
              value: z.looseObject({
                firstName: nonEmptyString,
                lastName: nonEmptyString,
                phoneNumber: nonEmptyString,
                emailAddress: nonEmptyString,
                reasonForWitness: nonEmptyString,
              }),
            }),
          ).min(1),
          witnessesToAppear: yesNoSchema,
        }),
      };
    }

    return {
      applicant1DQWitnesses: z.strictObject({
        details: z.array(
          z.strictObject({
            id: nonEmptyString,
            value: z.looseObject({
              firstName: nonEmptyString,
              lastName: nonEmptyString,
              phoneNumber: nonEmptyString,
              emailAddress: nonEmptyString,
              reasonForWitness: nonEmptyString,
            }),
          }),
        ).min(1),
        witnessesToAppear: yesNoSchema,
      }),
    };
  }

  return {};
};

const language = (
  defendantResponseSpecType: DefendantResponseSpecType,
  claimantResponseType: ClaimantResponseSpecType,
) => {
  if(defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION)
    return {};

  if (claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM) {
    return {
      applicant1DQLanguage: z.strictObject({
        court: nonEmptyString,
        documents: nonEmptyString,
      }),
    };
  }

  return {};
};

const hearing = (
  defendantResponseSpecType: DefendantResponseSpecType,
  claimTrack: ClaimTrack,
  claimantResponseType: ClaimantResponseSpecType,
) => {
  if(defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION)
    return {};

  if (claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM) {
    if (claimTrack === ClaimTrack.SMALL_CLAIM) {
      return {
        applicant1DQSmallClaimHearing: z.looseObject({
          unavailableDatesRequired: yesNoSchema,
          smallClaimUnavailableDate: z.array(z.looseObject({})).min(1),
        }),
      };
    }

    return {
      applicant1DQHearingLRspec: z.looseObject({
        unavailableDatesRequired: yesNoSchema,
      }),
    };
  }

  return {};
};

const requestedCourtLocation = (
  defendantResponseSpecType: DefendantResponseSpecType,
  claimantResponseType: ClaimantResponseSpecType,
) => {
  if(defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION)
    return {};

  if (claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM) {
    return {
      applicant1DQRequestedCourt: z.looseObject({}),
      applicant1DQRemoteHearingLRspec: z.looseObject({
        remoteHearingRequested: yesNoSchema,
        reasonForRemoteHearing: nonEmptyString,
      }),
    };
  }

  return {};
};

const hearingSupport = (
  defendantResponseSpecType: DefendantResponseSpecType,
  claimantResponseType: ClaimantResponseSpecType,
) => {
  if(defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION)
    return {};

  if (claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM) {
    return {
      applicant1DQHearingSupport: z.strictObject({
        supportRequirements: yesNoSchema,
        supportRequirementsAdditional: nonEmptyString,
      }),
    };
  }

  return {};
};

const vulnerabilityQuestions = (defendantResponseSpecType: DefendantResponseSpecType) => {
  if(defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION)
    return {};

  return {
    applicant1DQVulnerabilityQuestions: z.strictObject({
      vulnerabilityAdjustmentsRequired: yesNoSchema,
      vulnerabilityAdjustments: nonEmptyString,
    }),
  };
};

const application = (
  defendantResponseSpecType: DefendantResponseSpecType,
  claimTrack: ClaimTrack,
  claimantResponseType: ClaimantResponseSpecType,
) => {
  if(defendantResponseSpecType === DefendantResponseSpecType.FULL_ADMISSION)
    return {};

  if (
    claimTrack === ClaimTrack.FAST_CLAIM &&
    claimantResponseType === ClaimantResponseSpecType.PROCEED_WITH_CLAIM
  ) {
    return {
      applicant1DQFutureApplications: z.strictObject({
        intentionToMakeFutureApplications: yesNoSchema,
        whatWillFutureApplicationsBeMadeFor: nonEmptyString,
      }),
    };
  }

  return {};
};

const undefine = {
  nextDeadline: z.undefined().optional(),
};

const claimantResponseSpecSchemaComponents = {
  defendantResponse,
  defendantResponsePartAdmit,
  intentionToSettleClaim,
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
  undefine,
};

export default claimantResponseSpecSchemaComponents;
