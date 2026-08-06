import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const createClaimSpecAfterPaymentLIPSchemaComponents = {
  issueDate: nonEmptyString,
  nextDeadline: nonEmptyString,
  claimNotificationDate: nonEmptyString,
  claimNotificationDeadline: nonEmptyString,
  respondent1ResponseDeadline: nonEmptyString,
};

export default createClaimSpecAfterPaymentLIPSchemaComponents;
