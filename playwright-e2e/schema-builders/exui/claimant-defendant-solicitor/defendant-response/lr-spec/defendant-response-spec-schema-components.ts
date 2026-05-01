import { z } from 'zod';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import DefendantResponseSpecType from '../../../../../constants/ccd-events/defendant-response-spec/defendant-response-spec-type';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimTypeHelper from '../../../../../helpers/claim-type-helper';

const yesNoSchema = z.enum(['Yes', 'No']);
const nonEmptyString = z.string().min(1);

const responseClaimTrack = (claimTrack: ClaimTrack) => ({
  responseClaimTrack: z.literal(claimTrack),
});

const responseConfirmNameAddress = (claimType: ClaimType) => ({
  specAoSApplicantCorrespondenceAddressRequired: yesNoSchema,
  specAoSRespondent2HomeAddressRequired: claimType === ClaimType.ONE_VS_TWO_SAME_SOL ? yesNoSchema : z.undefined()
});

const responseConfirmDetails = {
  specAoSRespondentCorrespondenceAddressRequired: yesNoSchema,
};

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

const respondentResponseType = (responseType: DefendantResponseSpecType, claimType: ClaimType) => ({
  respondent1ClaimResponseTypeForSpec: z.literal(responseType),
  respondentClaimResponseTypeForSpecGeneric: z.literal(responseType),
  multiPartyResponseTypeFlags: z.literal(responseType),
  claimant1ClaimResponseTypeForSpec: ClaimTypeHelper.isClaimant2(claimType) ? z.literal(responseType) : z.undefined(),
  claimant2ClaimResponseTypeForSpec: ClaimTypeHelper.isClaimant2(claimType)? z.literal(responseType) : z.undefined(),
  specFullDefenceOrPartAdmission: yesNoSchema,
  specDefenceFullAdmittedRequired: yesNoSchema,
  respondent1ClaimResponsePaymentAdmissionForSpec: nonEmptyString,
});

const defenceRoute = {
  defenceRouteRequired: nonEmptyString,
};

const upload = {
  detailsOfWhyDoesYouDisputeTheClaim: nonEmptyString,
};

const timeline = {
  specClaimResponseTimelineList: nonEmptyString,
  specResponseTimelineOfEvents: z.array(
    z.looseObject({
      value: z.strictObject({
        timelineDate: nonEmptyString,
        timelineDescription: nonEmptyString,
      }),
    }),
  ).min(1),
};

const determinationWithoutHearing = (claimTrack: ClaimTrack) => {
  if (claimTrack === ClaimTrack.SMALL_CLAIM) {
   return {
      // deterWithoutHearingRespondent1: z.looseObject({
      //   deterWithoutHearingYesNo: yesNoSchema,
      //   deterWithoutHearingWhyNot: nonEmptyString,
      // }),
    }; 
  }

  return {};
};

const fastTrackDq = (claimTrack: ClaimTrack) => {
  if (claimTrack === ClaimTrack.FAST_CLAIM) 
    return {
      respondent1DQFileDirectionsQuestionnaire: z.strictObject({
        explainedToClient: z.array(nonEmptyString).min(1),
        oneMonthStayRequested: yesNoSchema,
        reactionProtocolCompliedWith: yesNoSchema,
        reactionProtocolNotCompliedWithReason: nonEmptyString,
      }),
      respondent1DQFixedRecoverableCosts: z.strictObject({
        isSubjectToFixedRecoverableCostRegime: yesNoSchema,
        band: nonEmptyString,
        complexityBandingAgreed: yesNoSchema,
        reasons: nonEmptyString,
      }),
      specRespondent1DQDisclosureOfElectronicDocuments: z.strictObject({
        reachedAgreement: yesNoSchema,
        agreementLikely: yesNoSchema,
        reasonForNoAgreement: nonEmptyString,
      }),
      specRespondent1DQDisclosureOfNonElectronicDocuments: z.strictObject({
        bespokeDirections: nonEmptyString,
      }),
      respondent1DQDisclosureReport: z.strictObject({
        disclosureFormFiledAndServed: yesNoSchema,
        disclosureProposalAgreed: yesNoSchema,
        draftOrderNumber: nonEmptyString,
      }),
    };
  return {};
};

const experts = (claimTrack: ClaimTrack) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM)
    return {
      respondent1DQExperts: z.strictObject({
        expertRequired: yesNoSchema,
        details: z.array(
          z.strictObject({
            id: nonEmptyString,
            value: z.looseObject({
              firstName: nonEmptyString,
              lastName: nonEmptyString,
              emailAddress: nonEmptyString,
              phoneNumber: nonEmptyString,
              whyRequired: nonEmptyString,
              estimatedCost: nonEmptyString,
            }),
          }),
        ).min(1),
      }),
    }

  return {
    respondent1DQExperts: z.strictObject({
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

const witnesses = (claimTrack: ClaimTrack) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM)
    return {
      respondent1DQWitnessesSmallClaim: z.strictObject({
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
  
  return {
    respondent1DQWitnesses: z.strictObject({
      witnessesToAppear: yesNoSchema,
      details: z.array(
        z.strictObject({
          id: nonEmptyString,
          value: z.strictObject({
            partyID: nonEmptyString,
            firstName: nonEmptyString,
            lastName: nonEmptyString,
            phoneNumber: nonEmptyString,
            emailAddress: nonEmptyString,
            reasonForWitness: nonEmptyString,
            eventAdded: nonEmptyString,
            dateAdded: nonEmptyString,
          }),
        }),
      ).min(1),
    }),
  };
};

const language = {
  respondent1DQLanguage: z.strictObject({
    court: nonEmptyString,
    documents: nonEmptyString,
  }),
};

const hearing = (claimTrack: ClaimTrack) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM)
    return {
      respondent1DQHearingSmallClaim: z.looseObject({
        unavailableDatesRequired: yesNoSchema,
        smallClaimUnavailableDate: z.array(z.looseObject({})).min(1),
      }),
      SmallClaimHearingInterpreterRequired: yesNoSchema,
      SmallClaimHearingInterpreterDescription: nonEmptyString,
    };
  
  return {
    respondent1DQHearing: z.looseObject({
      unavailableDatesRequired: yesNoSchema,
    }),
  };
};

const requestedCourtLocation = {
  respondent1DQRequestedCourt: z.looseObject({
    caseLocation: z.looseObject({
      region: nonEmptyString,
      baseLocation: nonEmptyString
    }),
    responseCourtCode: nonEmptyString,
    reasonForHearingAtSpecificCourt: nonEmptyString,
  }),
  respondent1DQRemoteHearingLRspec: z.looseObject({
    remoteHearingRequested: yesNoSchema,
    reasonForRemoteHearing: nonEmptyString,
  }),
};

const hearingSupport = {
  respondent1DQHearingSupport: z.strictObject({
    supportRequirements: yesNoSchema,
    supportRequirementsAdditional: nonEmptyString,
  }),
};

const vulnerabilityQuestions = {
  respondent1DQVulnerabilityQuestions: z.strictObject({
    vulnerabilityAdjustmentsRequired: yesNoSchema,
    vulnerabilityAdjustments: nonEmptyString,
  }),
};

const applications = (claimTrack: ClaimTrack) => 
{
  if(claimTrack === ClaimTrack.FAST_CLAIM) 
    return {
      additionalInformationForJudge: nonEmptyString,
      respondent1DQFutureApplications: z.strictObject({
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
  upload,
  timeline,
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
