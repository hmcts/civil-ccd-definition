import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const createClaimSpecAfterPaymentLipSchemaComponents = {
  issueDate: nonEmptyString,
  nextDeadline: nonEmptyString,
  claimNotificationDate: nonEmptyString,
  claimNotificationDeadline: nonEmptyString,
  respondent1ResponseDeadline: nonEmptyString,
};

export default createClaimSpecAfterPaymentLipSchemaComponents;
