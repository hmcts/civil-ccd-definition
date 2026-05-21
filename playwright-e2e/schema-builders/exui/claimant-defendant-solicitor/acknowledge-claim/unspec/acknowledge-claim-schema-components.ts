import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const responseIntention = {
  respondent1ClaimResponseIntentionType: nonEmptyString
};

const responseDates = {
  respondent1AcknowledgeNotificationDate: nonEmptyString,
  respondent1ResponseDeadline: nonEmptyString,
};

const solicitorReferences = {
  solicitorReferences: z.strictObject({
    applicantSolicitor1Reference: nonEmptyString,
    respondentSolicitor1Reference: nonEmptyString,
  }),
};

const acknowledgeClaimSchemaComponents = {
  responseIntention,
  responseDates,
  solicitorReferences,
};

export default acknowledgeClaimSchemaComponents;
