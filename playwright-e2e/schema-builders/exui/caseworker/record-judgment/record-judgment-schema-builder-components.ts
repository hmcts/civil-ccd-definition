import { z } from 'zod';
import JoPaymentPlan from '../../../../constants/ccd-events/ccd-events/record-edit-judgment/jo-payment-plan';
import JudgmentRecordReason from '../../../../constants/ccd-events/ccd-events/record-edit-judgment/judgment-record-reason';

const nonEmptyString = z.string().min(1);

const recordJudgment = (
  judgmentRecordReason: JudgmentRecordReason,
  joPaymentPlan: JoPaymentPlan,
) => {
  if (joPaymentPlan === JoPaymentPlan.IMMEDIATELY) {
    return {
      joJudgmentRecordReason: z.literal(judgmentRecordReason),
      joOrderMadeDate: nonEmptyString,
      joAmountCostOrdered: nonEmptyString,
      joAmountOrdered: nonEmptyString,
      joPaymentPlan: z.strictObject({
        type: z.literal(joPaymentPlan),
      }),
      joIsRegisteredWithRTL: nonEmptyString,
    };
  }

  return {};
};

const recordJudgmentSchemaBuilderComponents = {
  recordJudgment,
};

export default recordJudgmentSchemaBuilderComponents;
