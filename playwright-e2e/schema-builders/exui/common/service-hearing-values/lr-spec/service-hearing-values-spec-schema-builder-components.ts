import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const caseDetails = {
  hmctsServiceID: nonEmptyString,
  hmctsInternalCaseName: nonEmptyString,
  publicCaseName: nonEmptyString,
  caseAdditionalSecurityFlag: z.boolean(),
  caseDeepLink: nonEmptyString,
  caseManagementLocationCode: nonEmptyString,
  caseSLAStartDate: nonEmptyString,
  autoListFlag: z.boolean(),
  duration: z.number(),
  hearingPriorityType: nonEmptyString,
  numberOfPhysicalAttendees: z.number(),
  hearingInWelshFlag: z.boolean(),
  privateHearingRequiredFlag: z.boolean(),
  caseInterpreterRequiredFlag: z.boolean(),
  hearingIsLinkedFlag: z.boolean(),
  caserestrictedFlag: z.boolean(),
};

const caseCategories = {
  caseCategories: z.array(z.looseObject({
    categoryType: nonEmptyString,
    categoryValue: nonEmptyString,
  })).min(1),
};

const hearingLocations = {
  hearingLocations: z.array(z.looseObject({
    locationId: nonEmptyString,
    locationType: nonEmptyString,
  })).min(1),
};

const parties = {
  parties: z.array(z.looseObject({
    partyID: nonEmptyString,
    partyType: nonEmptyString,
    partyName: nonEmptyString,
    partyRole: nonEmptyString,
    individualDetails: z.looseObject({
      firstName: nonEmptyString,
      lastName: nonEmptyString,
      vulnerableFlag: z.boolean(),
    }).optional(),
    organisationDetails: z.looseObject({
      name: nonEmptyString,
      organisationType: nonEmptyString,
    }).optional(),
  })).min(1),
};

const screenFlow = {
  screenFlow: z.array(z.looseObject({
    screenName: nonEmptyString,
    navigation: z.array(z.looseObject({
      resultValue: nonEmptyString,
    })).min(1),
  })).min(1),
};

const hearingChannels = {
  hearingChannels: z.array(nonEmptyString).min(1),
};

export default {
  caseDetails,
  caseCategories,
  hearingLocations,
  parties,
  screenFlow,
  hearingChannels,
};
