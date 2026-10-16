import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const createClaimAfterPayment = {
  issueDate: nonEmptyString,
  nextDeadline: nonEmptyString,
  // notificationSummary: nonEmptyString,
  claimNotificationDeadline: nonEmptyString,
};

const ignore = {
  applicantSolicitor1UserDetails: z.any().optional(),
}

const createClaimAfterPaymentSchemaComponents = {
  createClaimAfterPayment,
  ignore,
};

export default createClaimAfterPaymentSchemaComponents;
