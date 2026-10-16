import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const createClaimSpecAfterPayment = {
  issueDate: nonEmptyString,
  nextDeadline: nonEmptyString,
  // notificationSummary: nonEmptyString,
  claimNotificationDate: nonEmptyString,
  claimNotificationDeadline: nonEmptyString,
  respondent1ResponseDeadline: nonEmptyString,
  respondent2ResponseDeadline: nonEmptyString.optional(),
};

const ignore = {
  specClaimDetailsDocumentFiles: z.any().optional(),
  specClaimTemplateDocumentFiles: z.any().optional(),
}

const createClaimSpecAfterPaymentSchemaComponents = {
  createClaimSpecAfterPayment,
  ignore,
};

export default createClaimSpecAfterPaymentSchemaComponents;
