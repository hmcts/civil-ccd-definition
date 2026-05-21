import { z } from 'zod';
import ClaimTrack from '../../../../../constants/cases/claim-track';

const yesNoSchema = z.enum(['Yes', 'No']);
const nonEmptyString = z.string().min(1);

const respondentResponse = {
  applicant1ProceedWithClaim: yesNoSchema,
  claimant2ResponseFlag: yesNoSchema,
  applicantsProceedIntention: yesNoSchema,
  claimantResponseDocumentToDefendant2Flag: yesNoSchema,
};

const applicantDefenceResponseDocument = {};

const fastTrackDq = (claimTrack: ClaimTrack) => {
  if (claimTrack === ClaimTrack.FAST_CLAIM) {
    return {
      applicant1DQFileDirectionsQuestionnaire: z.strictObject({
        explainedToClient: z.array(nonEmptyString).min(1),
        oneMonthStayRequested: yesNoSchema,
        reactionProtocolCompliedWith: yesNoSchema,
        reactionProtocolNotCompliedWithReason: nonEmptyString
      }),
      applicant1DQFixedRecoverableCosts: z.strictObject({
        isSubjectToFixedRecoverableCostRegime: yesNoSchema,
        band: nonEmptyString,
        complexityBandingAgreed: yesNoSchema,
        reasons: nonEmptyString,
      }),
      applicant1DQDisclosureOfNonElectronicDocuments: z.strictObject({
        directionsForDisclosureProposed: yesNoSchema,
        standardDirectionsRequired: yesNoSchema,
        bespokeDirections: nonEmptyString,
      }),
    };
  }

  return {};
};

const experts = {
  applicant1DQExperts: z.strictObject({
    expertRequired: yesNoSchema,
    expertReportsSent: nonEmptyString,
    jointExpertSuitable: yesNoSchema,
    details: z.array(
      z.strictObject({
        id: nonEmptyString,
        value: z.looseObject({
          partyID: nonEmptyString,
          firstName: nonEmptyString,
          lastName: nonEmptyString,
          phoneNumber: nonEmptyString,
          emailAddress: nonEmptyString,
          fieldOfExpertise: nonEmptyString,
          whyRequired: nonEmptyString,
          estimatedCost: nonEmptyString,
          eventAdded: nonEmptyString,
          dateAdded: nonEmptyString,
        }),
      }),
    ).min(1),
  }),
};

const witnesses = {
  applicant1DQWitnesses: z.strictObject({
    witnessesToAppear: yesNoSchema,
    details: z.array(
      z.strictObject({
        id: nonEmptyString,
        value: z.looseObject({
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

const language = {
  applicant1DQLanguage: z.strictObject({
    court: nonEmptyString,
    documents: nonEmptyString,
  }),
};

const hearing = {
  applicant1DQHearing: z.looseObject({
    unavailableDatesRequired: yesNoSchema,
    unavailableDates: z.array(z.looseObject({})).min(1),
  }),
};

const draftDirections = {};

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

const furtherInformation = {
  applicant1DQFurtherInformation: z.strictObject({
    futureApplications: yesNoSchema,
    reasonForFutureApplications: nonEmptyString,
    otherInformationForJudge: nonEmptyString,
  }),
};

const claimantResponseSchemaComponents = {
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
};

export default claimantResponseSchemaComponents;
