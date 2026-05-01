import { z } from 'zod';
import ClaimType from '../../../../../constants/cases/claim-type';
import ClaimTypeHelper from '../../../../../helpers/claim-type-helper';
import ClaimTrack from '../../../../../constants/cases/claim-track';

const yesNoSchema = z.enum(['Yes', 'No']);
const nonEmptyString = z.string().min(1);

const proceedWithClaim = (claimType: ClaimType) => ClaimTypeHelper.isClaimant2(claimType) ? {
  applicant1ProceedWithClaimSpec2v1: yesNoSchema,
} : {
  applicant1ProceedWithClaim: yesNoSchema,
};

const determinationWithoutHearing = (claimTrack: ClaimTrack) => {
  if (claimTrack === ClaimTrack.SMALL_CLAIM) {
    return {
      deterWithoutHearing: z.looseObject({
        // deterWithoutHearingYesNo: yesNoSchema,
      }),
    }; 
  }

  return {};
};

const fastTrackDq = (claimTrack: ClaimTrack) => {
  if (claimTrack === ClaimTrack.FAST_CLAIM) 
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

  return {};
};

const experts = (claimTrack: ClaimTrack) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM)
    return {
      applicant1DQExperts: z.strictObject({
        expertRequired: yesNoSchema,
        details: z.array(
          z.strictObject({
            id: nonEmptyString,
            value: z.looseObject({
              partyID: nonEmptyString,
              firstName: nonEmptyString,
              lastName: nonEmptyString,
              dateAdded: nonEmptyString,
              eventAdded: nonEmptyString,
              phoneNumber: nonEmptyString,
              whyRequired: nonEmptyString,
              emailAddress: nonEmptyString,
              estimatedCost: nonEmptyString,
            }),
          }),
        ).min(1),
      }),
    };

  return {
    applicant1DQExperts: z.strictObject({
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

const language = {
  applicant1DQLanguage: z.strictObject({
    court: nonEmptyString,
    documents: nonEmptyString,
  }),
};

const hearing = (claimTrack: ClaimTrack) => {
  if(claimTrack === ClaimTrack.SMALL_CLAIM)
    return {
      applicant1DQSmallClaimHearing: z.looseObject({
        unavailableDatesRequired: yesNoSchema,
        smallClaimUnavailableDate: z.array(z.looseObject({})).min(1),
      }),
    };  
    
  return {
    applicant1DQHearingLRspec: z.looseObject({
      unavailableDatesRequired: yesNoSchema,
    }),
  };
}

const requestedCourtLocation = {
  applicant1DQRequestedCourt: z.looseObject({}),
  applicant1DQRemoteHearingLRspec: z.looseObject({
    remoteHearingRequested: yesNoSchema,
    reasonForRemoteHearing: nonEmptyString,
  }),
};

const hearingSupport = {
  applicant1DQHearingSupport: z.strictObject({
    supportRequirements: yesNoSchema,
    supportRequirementsAdditional: nonEmptyString,
  }),
};

const vulnerabilityQuestions = {
  applicant1DQVulnerabilityQuestions: z.strictObject({
    vulnerabilityAdjustmentsRequired: yesNoSchema,
    vulnerabilityAdjustments: nonEmptyString,
  }),
};

const applications = (claimTrack: ClaimTrack) => 
{
  if(claimTrack === ClaimTrack.FAST_CLAIM) 
    return {
      applicant1DQFutureApplications: z.strictObject({
        intentionToMakeFutureApplications: yesNoSchema,
        whatWillFutureApplicationsBeMadeFor: nonEmptyString,
      }),
    };
  
    return {};
};

const claimantResponseSpecSchemaComponents = {
  proceedWithClaim,
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

export default claimantResponseSpecSchemaComponents;
