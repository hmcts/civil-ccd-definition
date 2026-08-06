import { z } from 'zod';
import ClaimTrack from '../../../../constants/cases/claim-track';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import { ClaimantDefendantPartyType } from '../../../../models/users/claimant-defendant-party-types';

type SchemaShape = Record<string, z.ZodType>;

const nonEmptyString = z.string().min(1);

const addressSchema = z.strictObject({
  AddressLine1: nonEmptyString,
  AddressLine2: nonEmptyString.optional(),
  AddressLine3: nonEmptyString.optional(),
  PostTown: nonEmptyString,
  County: nonEmptyString.optional(),
  Country: nonEmptyString,
  PostCode: nonEmptyString,
});

const flagsSchema = z.strictObject({
  partyName: nonEmptyString,
  roleOnCase: nonEmptyString,
});

const partyBaseSchema = {
  flags: flagsSchema,
  partyID: nonEmptyString,
  partyName: nonEmptyString,
  partyEmail: nonEmptyString,
  partyPhone: nonEmptyString,
  primaryAddress: addressSchema,
  partyTypeDisplayValue: nonEmptyString,
};

const individualPartySchema = z.strictObject({
  ...partyBaseSchema,
  type: z.literal('INDIVIDUAL'),
  individualTitle: nonEmptyString,
  individualFirstName: nonEmptyString,
  individualLastName: nonEmptyString,
  individualDateOfBirth: nonEmptyString,
});

const soleTraderPartySchema = z.strictObject({
  ...partyBaseSchema,
  type: z.literal('SOLE_TRADER'),
  soleTraderTitle: nonEmptyString,
  soleTraderFirstName: nonEmptyString,
  soleTraderLastName: nonEmptyString,
  soleTraderTradingAs: nonEmptyString,
  soleTraderDateOfBirth: nonEmptyString,
});

const companyPartySchema = z.strictObject({
  ...partyBaseSchema,
  type: z.literal('COMPANY'),
  companyName: nonEmptyString,
});

const organisationPartySchema = z.strictObject({
  ...partyBaseSchema,
  type: z.literal('ORGANISATION'),
  organisationName: nonEmptyString,
});

const partySchema = (partyType: ClaimantDefendantPartyType) => {
  switch (partyType.type) {
    case 'INDIVIDUAL':
      return individualPartySchema;
    case 'SOLE_TRADER':
      return soleTraderPartySchema;
    case 'COMPANY':
      return companyPartySchema;
    case 'ORGANISATION':
      return organisationPartySchema;
    default:
      throw new Error(`Unsupported party type: ${partyType.type}`);
  }
};

const detailsForClaimTabPartyBaseSchema = {
  type: nonEmptyString,
  partyName: nonEmptyString,
  partyEmail: nonEmptyString,
  partyPhone: nonEmptyString,
  primaryAddress: addressSchema,
  partyTypeDisplayValue: nonEmptyString,
};

const individualDetailsForClaimTabPartySchema = z.strictObject({
  ...detailsForClaimTabPartyBaseSchema,
  type: z.literal('INDIVIDUAL'),
  individualTitle: nonEmptyString,
  individualFirstName: nonEmptyString,
  individualLastName: nonEmptyString,
  individualDateOfBirth: nonEmptyString,
});

const soleTraderDetailsForClaimTabPartySchema = z.strictObject({
  ...detailsForClaimTabPartyBaseSchema,
  type: z.literal('SOLE_TRADER'),
  soleTraderTitle: nonEmptyString,
  soleTraderFirstName: nonEmptyString,
  soleTraderLastName: nonEmptyString,
  soleTraderTradingAs: nonEmptyString,
});

const companyDetailsForClaimTabPartySchema = z.strictObject({
  ...detailsForClaimTabPartyBaseSchema,
  type: z.literal('COMPANY'),
  companyName: nonEmptyString,
});

const organisationDetailsForClaimTabPartySchema = z.strictObject({
  ...detailsForClaimTabPartyBaseSchema,
  type: z.literal('ORGANISATION'),
  organisationName: nonEmptyString,
});

const detailsForClaimTabPartySchema = (partyType: ClaimantDefendantPartyType) => {
  switch (partyType.type) {
    case 'INDIVIDUAL':
      return individualDetailsForClaimTabPartySchema;
    case 'SOLE_TRADER':
      return soleTraderDetailsForClaimTabPartySchema;
    case 'COMPANY':
      return companyDetailsForClaimTabPartySchema;
    case 'ORGANISATION':
      return organisationDetailsForClaimTabPartySchema;
    default:
      throw new Error(`Unsupported party type: ${partyType.type}`);
  }
};

const feeSchema = z.strictObject({
  code: nonEmptyString,
  version: nonEmptyString,
  calculatedAmountInPence: nonEmptyString,
});

const organisationPolicySchema = z.strictObject({
  OrgPolicyCaseAssignedRole: nonEmptyString,
});

const claimAmountBreakupSchema = z
  .array(
    z.strictObject({
      id: nonEmptyString,
      value: z.strictObject({
        claimAmount: nonEmptyString,
        claimReason: nonEmptyString,
      }),
    }),
  )
  .min(1);

const timelineOfEventsSchema = z
  .array(
    z.strictObject({
      id: nonEmptyString,
      value: z.strictObject({
        timelineDate: nonEmptyString,
        timelineDescription: nonEmptyString,
      }),
    }),
  )
  .min(1);

const claimantUserDetailsSchema = z.strictObject({
  email: nonEmptyString,
  id: nonEmptyString,
});

const helpWithFeesSchema = z.strictObject({
  helpWithFee: z.literal('No'),
});

const businessProcessSchema = z.strictObject({
  status: nonEmptyString,
  camundaEvent: z.literal('CREATE_LIP_CLAIM'),
  readyOn: nonEmptyString.optional(),
});

const searchCriteriaSchema = z.strictObject({
  SearchParties: z
    .array(
      z.strictObject({
        id: nonEmptyString,
        value: z.strictObject({
          Name: nonEmptyString,
          PostCode: nonEmptyString,
          DateOfBirth: nonEmptyString.optional(),
          AddressLine1: nonEmptyString,
        }),
      }),
    )
    .min(1),
  OtherCaseReferences: z
    .array(
      z.strictObject({
        id: nonEmptyString,
        value: nonEmptyString,
      }),
    )
    .min(1),
});

const claimIssuedPbaDetailsSchema = z.strictObject({
  fee: feeSchema,
  serviceRequestReference: nonEmptyString,
});

const caseManagementLocationSchema = z.strictObject({
  region: nonEmptyString,
  baseLocation: nonEmptyString,
});

const respondentPinToPostSchema = z.strictObject({
  accessCode: nonEmptyString,
  expiryDate: nonEmptyString,
  respondentCaseRole: nonEmptyString,
});

const documentLinkSchema = z.strictObject({
  category_id: nonEmptyString.optional(),
  document_url: nonEmptyString,
  upload_timestamp: nonEmptyString.optional(),
  document_filename: nonEmptyString,
  document_binary_url: nonEmptyString,
});

const systemGeneratedCaseDocumentsSchema = z
  .array(
    z.strictObject({
      id: nonEmptyString,
      value: z.strictObject({
        createdBy: nonEmptyString,
        documentLink: documentLinkSchema,
        documentName: nonEmptyString,
        documentSize: z.number(),
        documentType: nonEmptyString,
        createdDatetime: nonEmptyString,
      }),
    }),
  )
  .min(1);

const claimant1 = (claimantPartyType: ClaimantDefendantPartyType): SchemaShape => ({
  applicant1: partySchema(claimantPartyType),
  applicant1AdditionalLipPartyDetails: z.strictObject({
    correspondenceAddress: addressSchema,
  }),
  applicant1Represented: z.literal('No'),
  applicant1OrganisationPolicy: organisationPolicySchema,
});

const defendant1 = (defendantPartyType: ClaimantDefendantPartyType): SchemaShape => ({
  respondent1: partySchema(defendantPartyType),
  respondent1DetailsForClaimDetailsTab: detailsForClaimTabPartySchema(defendantPartyType),
  respondent1Represented: z.literal('No'),
  specRespondent1Represented: z.literal('No'),
  respondent1OrganisationPolicy: organisationPolicySchema,
  respondent1PinToPostLRspec: respondentPinToPostSchema,
});

const claimAmount = (claimTrack: ClaimTrack): SchemaShape => ({
  totalClaimAmount: z.literal(CaseDataHelper.getClaimValue(claimTrack)),
  claimAmountBreakup: claimAmountBreakupSchema,
});

const claimDetails: SchemaShape = {
  detailsOfClaim: nonEmptyString,
};

const claimInterest: SchemaShape = {
  claimInterest: z.literal('No'),
};

const claimantUserDetails: SchemaShape = {
  claimantUserDetails: claimantUserDetailsSchema,
};

const helpWithFees: SchemaShape = {
  helpWithFees: helpWithFeesSchema,
};

const pcq: SchemaShape = {
  pcqId: nonEmptyString,
};

const timelineOfEvents: SchemaShape = {
  timelineOfEvents: timelineOfEventsSchema,
};

const flightDelay: SchemaShape = {
  isFlightDelayClaim: z.literal('No'),
};

const claimFee: SchemaShape = {
  claimFee: feeSchema,
};

const generatedCaseData: SchemaShape = {
  CaseAccessCategory: z.literal('SPEC_CLAIM'),
  locationName: nonEmptyString,
  allPartyNames: nonEmptyString,
  submittedDate: nonEmptyString,
  SearchCriteria: searchCriteriaSchema,
  anyRepresented: z.literal('No'),
  caseNamePublic: nonEmptyString,
  businessProcess: businessProcessSchema,
  legacyCaseReference: nonEmptyString,
  caseNameHmctsInternal: nonEmptyString,
  claimIssuedPBADetails: claimIssuedPbaDetailsSchema,
  caseManagementLocation: caseManagementLocationSchema,
  serviceRequestReference: nonEmptyString,
  respondent2OrganisationPolicy: organisationPolicySchema,
  systemGeneratedCaseDocuments: systemGeneratedCaseDocumentsSchema,
  claimantLanguagePreferenceDisplay: nonEmptyString,
};

const createClaimSchemaComponents = {
  claimant1,
  defendant1,
  claimAmount,
  claimDetails,
  claimInterest,
  claimantUserDetails,
  helpWithFees,
  pcq,
  timelineOfEvents,
  flightDelay,
  claimFee,
  generatedCaseData,
};

export default createClaimSchemaComponents;
