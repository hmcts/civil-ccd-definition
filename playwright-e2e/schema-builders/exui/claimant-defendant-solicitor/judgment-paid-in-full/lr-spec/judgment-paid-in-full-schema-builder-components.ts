import { z } from 'zod';

const nonEmptyString = z.string().min(1);

const markJudgmentPaidInFull = {
  joJudgmentPaidInFull: z.strictObject({
    confirmFullPaymentMade: z.array(nonEmptyString).min(1),
    dateOfFullPaymentMade: nonEmptyString,
  }),
};

const judgmentPaidInFullSchemaBuilderComponents = {
  markJudgmentPaidInFull,
};

export default judgmentPaidInFullSchemaBuilderComponents;
