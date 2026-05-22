import { z } from 'zod';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import DefendantResponseType from '../../../../../constants/ccd-events/defendant-response/unspec/defendant-response-type';

const yesNoSchema = z.enum(['Yes', 'No']);
const nonEmptyString = z.string().min(1);

const confirmDetails = {};

const respondentResponseType = (responseType: DefendantResponseType) => ({
  respondent1ClaimResponseType: z.literal(responseType),
  multiPartyResponseTypeFlags: z.literal(responseType),
});

const solicitorReferences = {};

const upload = {};

const fastTrackDq = (claimTrack: ClaimTrack) => {
  if (claimTrack === ClaimTrack.FAST_CLAIM) {
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
      respondent1DQDisclosureOfNonElectronicDocuments: z.strictObject({
        directionsForDisclosureProposed: yesNoSchema,
        standardDirectionsRequired: yesNoSchema,
        bespokeDirections: nonEmptyString,
      }),
    };
  }

  return {};
};

const experts = {
  respondent1DQExperts: z.strictObject({
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
  respondent1DQWitnesses: z.strictObject({
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
  respondent1DQLanguage: z.strictObject({
    court: nonEmptyString,
    documents: nonEmptyString,
  }),
};

const hearing = {
  respondent1DQHearing: z.looseObject({
    unavailableDatesRequired: yesNoSchema,
    unavailableDates: z.array(z.looseObject({})).min(1),
  }),
};

const draftDirections = {};

const requestedCourt = () => ({
  respondent1DQRequestedCourt: z.looseObject({
    reasonForHearingAtSpecificCourt: nonEmptyString,
  }),
  respondent1DQRemoteHearing: z.looseObject({
    remoteHearingRequested: yesNoSchema,
  }),
});

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

const furtherInformation = {
  respondent1DQFurtherInformation: z.strictObject({
    futureApplications: yesNoSchema,
    reasonForFutureApplications: nonEmptyString,
    otherInformationForJudge: nonEmptyString,
  }),
};

const statementOfTruth = {
  respondent1DQStatementOfTruth: z.strictObject({
    name: nonEmptyString,
    role: nonEmptyString,
  }),
};

const defendantResponseSchemaComponents = {
  confirmDetails,
  solicitorReferences,
  respondentResponseType,
  upload,
  fastTrackDq,
  experts,
  witnesses,
  language,
  hearing,
  draftDirections,
  requestedCourt,
  hearingSupport,
  vulnerabilityQuestions,
  furtherInformation,
  statementOfTruth,
};

export default defendantResponseSchemaComponents;
