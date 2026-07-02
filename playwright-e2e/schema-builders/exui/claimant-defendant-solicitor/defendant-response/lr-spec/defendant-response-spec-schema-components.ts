import { z } from 'zod';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import DefendantResponseSpecType from '../../../../../constants/ccd-events/defendant-response/lr-spec/defendant-response-spec-type';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimTypeHelper from '../../../../../helpers/claim-type-helper';
import partys from '../../../../../constants/users/partys';
import { Party } from '../../../../../models/users/partys';

const yesNoSchema = z.enum(['Yes', 'No']);
const nonEmptyString = z.string().min(1);

const responseClaimTrack = (claimTrack: ClaimTrack) => ({
  responseClaimTrack: z.literal(claimTrack),
});

const responseConfirmNameAddress = (claimType: ClaimType, defendantSolicitorParty: Party) => {
  if(defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
    return {
      specAoSApplicantCorrespondenceAddressRequired: yesNoSchema,
      ...(claimType === ClaimType.ONE_VS_TWO_SAME_SOL
        ? {specAoSRespondent2HomeAddressRequired: yesNoSchema}
        : {}),
    };
  } else if(defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      specAoSRespondent2HomeAddressRequired: yesNoSchema,
    };
  }

  return {};
};

const responseConfirmDetails = (defendantSolicitorParty: Party) => ({
  [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
    ? 'specAoSRespondentCorrespondenceAddressRequired'
    : 'specAoSRespondent2CorrespondenceAddressRequired']: yesNoSchema,
});

const singleResponse = (claimType: ClaimType) => {
  if(claimType === ClaimType.ONE_VS_TWO_SAME_SOL)
    return {
      respondentResponseIsSame: yesNoSchema,
    };

  if(ClaimTypeHelper.isClaimant2(claimType)) {
    return {
      defendantSingleResponseToBothClaimants: yesNoSchema,
    };
  }

  return {};
};

const respondentResponseType = (
  responseType: DefendantResponseSpecType,
  claimType: ClaimType,
  defendantSolicitorParty: Party,
) => {
  if(defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
    return {
      respondent1ClaimResponseTypeForSpec: z.literal(responseType),
      ...(ClaimTypeHelper.isClaimant2(claimType) ? {
        claimant1ClaimResponseTypeForSpec: z.literal(responseType),
        claimant2ClaimResponseTypeForSpec: z.literal(responseType),
      } : {}),
    };
  } else if(defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_2) {
    return {
      respondent2ClaimResponseTypeForSpec: z.literal(responseType),
    };
  }

  return {};
};

const defenceRoute = (
  responseType: DefendantResponseSpecType,
  defendantSolicitorParty: Party,
) => {
  if(responseType === DefendantResponseSpecType.FULL_DEFENCE)
    return {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'defenceRouteRequired'
        : 'defenceRouteRequired2']: nonEmptyString,
    };

  return {};
};

const defenceAdmittedPartRoute = (
  responseType: DefendantResponseSpecType,
  defendantSolicitorParty: Party,
) => {
  if(responseType === DefendantResponseSpecType.PART_ADMISSION)
    return {
      specDefenceAdmittedRequired: yesNoSchema,
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'respondToAdmittedClaim'
        : 'respondToAdmittedClaim2']: z.looseObject({
        howMuchWasPaid: nonEmptyString,
        whenWasThisAmountPaid: nonEmptyString,
        howWasThisAmountPaid: nonEmptyString,
      }),
    };

  return {};
};

const upload = (defendantSolicitorParty: Party) => ({
  [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
    ? 'detailsOfWhyDoesYouDisputeTheClaim'
    : 'detailsOfWhyDoesYouDisputeTheClaim2']: nonEmptyString,
});

const timeline = (defendantSolicitorParty: Party) => ({
  [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
    ? 'specClaimResponseTimelineList'
    : 'specClaimResponseTimelineList2']: nonEmptyString,
  [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
    ? 'specResponseTimelineOfEvents'
    : 'specResponseTimelineOfEvents2']: z.array(
    z.looseObject({
      value: z.strictObject({
        timelineDate: nonEmptyString,
        timelineDescription: nonEmptyString,
      }),
    }),
  ).min(1),
});

const mediationContactInformation = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM) {
    return {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'resp1MediationContactInfo'
        : 'resp2MediationContactInfo']: z.looseObject({}),
    };
  }

  return {};
};

const mediationAvailability = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM) {
    return {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'resp1MediationAvailability'
        : 'resp2MediationAvailability']: z.looseObject({
        isMediationUnavailablityExists: yesNoSchema,
        unavailableDatesForMediation: z.array(z.looseObject({})).min(1),
      }),
    };
  }

  return {};
};

const determinationWithoutHearing = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  if (claimTrack === ClaimTrack.SMALL_CLAIM) {
   return {
      // [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
      //   ? 'deterWithoutHearingRespondent1'
      //   : 'deterWithoutHearingRespondent2']: z.looseObject({
      //   deterWithoutHearingYesNo: yesNoSchema,
      //   deterWithoutHearingWhyNot: nonEmptyString,
      // }),
    }; 
  }

  return {};
};

const fastTrackDq = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  if (claimTrack === ClaimTrack.FAST_CLAIM) 
    return {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'respondent1DQFileDirectionsQuestionnaire'
        : 'respondent2DQFileDirectionsQuestionnaire']: z.strictObject({
        explainedToClient: z.array(nonEmptyString).min(1),
        oneMonthStayRequested: yesNoSchema,
        reactionProtocolCompliedWith: yesNoSchema,
        reactionProtocolNotCompliedWithReason: nonEmptyString,
      }),
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'respondent1DQFixedRecoverableCosts'
        : 'respondent2DQFixedRecoverableCosts']: z.strictObject({
        isSubjectToFixedRecoverableCostRegime: yesNoSchema,
        band: nonEmptyString,
        complexityBandingAgreed: yesNoSchema,
        reasons: nonEmptyString,
      }),
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'specRespondent1DQDisclosureOfElectronicDocuments'
        : 'specRespondent2DQDisclosureOfElectronicDocuments']: z.strictObject({
        reachedAgreement: yesNoSchema,
        agreementLikely: yesNoSchema,
        reasonForNoAgreement: nonEmptyString,
      }),
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'specRespondent1DQDisclosureOfNonElectronicDocuments'
        : 'specRespondent2DQDisclosureOfNonElectronicDocuments']: z.strictObject({
        bespokeDirections: nonEmptyString,
      }),
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'respondent1DQDisclosureReport'
        : 'respondent2DQDisclosureReport']: z.strictObject({
        disclosureFormFiledAndServed: yesNoSchema,
        disclosureProposalAgreed: yesNoSchema,
        draftOrderNumber: nonEmptyString,
      }),
    };
  return {};
};

const experts = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM)
    return {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'respondToClaimExperts'
        : 'respondToClaimExperts2']: z.looseObject({
        firstName: nonEmptyString,
        lastName: nonEmptyString,
        emailAddress: nonEmptyString,
        phoneNumber: nonEmptyString,
        whyRequired: nonEmptyString,
        estimatedCost: nonEmptyString,
      }),
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'responseClaimExpertSpecRequired'
        : 'responseClaimExpertSpecRequired2']: yesNoSchema,
    };

  return {
    [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
      ? 'respondent1DQExperts'
      : 'respondent2DQExperts']: z.strictObject({
      expertRequired: yesNoSchema,
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
};

const witnesses = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM)
    return {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'respondent1DQWitnessesSmallClaim'
        : 'respondent2DQWitnessesSmallClaim']: z.strictObject({
        witnessesToAppear: yesNoSchema,
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
      }),
    };

  if(defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1) {
    return {
      respondent1DQWitnessesRequiredSpec: yesNoSchema,
      respondent1DQWitnessesDetailsSpec: z.array(
        z.strictObject({
          id: nonEmptyString,
          value: z.looseObject({
            partyID: nonEmptyString.optional(),
            firstName: nonEmptyString,
            lastName: nonEmptyString,
            phoneNumber: nonEmptyString,
            emailAddress: nonEmptyString,
            reasonForWitness: nonEmptyString,
            eventAdded: nonEmptyString.optional(),
            dateAdded: nonEmptyString.optional(),
          }),
        }),
      ).min(1),
    };
  }
  
  return {
    respondent2DQWitnesses: z.strictObject({
      witnessesToAppear: yesNoSchema,
      details: z.array(
        z.strictObject({
          id: nonEmptyString,
          value: z.strictObject({
            partyID: nonEmptyString.optional(),
            firstName: nonEmptyString,
            lastName: nonEmptyString,
            phoneNumber: nonEmptyString,
            emailAddress: nonEmptyString,
            reasonForWitness: nonEmptyString,
            eventAdded: nonEmptyString.optional(),
            dateAdded: nonEmptyString.optional(),
          }),
        }),
      ).min(1),
    }),
  };
};

const language = (defendantSolicitorParty: Party) => ({
  [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
    ? 'respondent1DQLanguage'
    : 'respondent2DQLanguage']: z.strictObject({
    court: nonEmptyString,
    documents: nonEmptyString,
  }),
});

const hearing = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM)
    return {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'respondent1DQHearingSmallClaim'
        : 'respondent2DQHearingSmallClaim']: z.looseObject({
        unavailableDatesRequired: yesNoSchema,
        smallClaimUnavailableDate: z.array(z.looseObject({})).min(1),
      }),
      // [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
      //   ? 'SmallClaimHearingInterpreterRequired'
      //   : 'SmallClaimHearingInterpreter2Required']: yesNoSchema,
      // [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
      //   ? 'SmallClaimHearingInterpreterDescription'
      //   : 'smallClaimHearingInterpreterDescription2']: nonEmptyString,
    };
  
  return {
    [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
      ? 'respondent1DQHearing'
      : 'respondent2DQHearing']: z.looseObject({
      unavailableDatesRequired: yesNoSchema,
    }),
  };
};

const requestedCourtLocation = (defendantSolicitorParty: Party) => ({
  [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
    ? 'respondToCourtLocation'
    : 'respondToCourtLocation2']: z.looseObject({
    reasonForHearingAtSpecificCourt: nonEmptyString.optional(),
  }),
  [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
    ? 'respondent1DQRemoteHearingLRspec'
    : 'respondent2DQRemoteHearingLRspec']: z.looseObject({
    remoteHearingRequested: yesNoSchema,
    reasonForRemoteHearing: nonEmptyString,
  }),
});

const hearingSupport = (defendantSolicitorParty: Party) => ({
  [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
    ? 'respondent1DQHearingSupport'
    : 'respondent2DQHearingSupport']: z.strictObject({
    supportRequirements: yesNoSchema,
    supportRequirementsAdditional: nonEmptyString,
  }),
});

const vulnerabilityQuestions = (defendantSolicitorParty: Party) => ({
  [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
    ? 'respondent1DQVulnerabilityQuestions'
    : 'respondent2DQVulnerabilityQuestions']: z.strictObject({
    vulnerabilityAdjustmentsRequired: yesNoSchema,
    vulnerabilityAdjustments: nonEmptyString,
  }),
});

const applications = (claimTrack: ClaimTrack, defendantSolicitorParty: Party) => 
{
  if(claimTrack === ClaimTrack.FAST_CLAIM) 
    return {
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'additionalInformationForJudge'
        : 'additionalInformationForJudge2']: nonEmptyString,
      [defendantSolicitorParty === partys.DEFENDANT_SOLICITOR_1
        ? 'respondent1DQFutureApplications'
        : 'respondent2DQFutureApplications']: z.strictObject({
        intentionToMakeFutureApplications: yesNoSchema,
        whatWillFutureApplicationsBeMadeFor: nonEmptyString,
      }),
    };
  
    return {};
};

const defendantResponseSpecSchemaComponents = {
  responseClaimTrack,
  singleResponse,
  responseConfirmNameAddress,
  responseConfirmDetails,
  respondentResponseType,
  defenceRoute,
  defenceAdmittedPartRoute,
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
};

export default defendantResponseSpecSchemaComponents;
