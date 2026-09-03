import { z } from 'zod';
import JoPaymentPlan from '../../../../constants/ccd-events/ccd-events/record-edit-judgment/jo-payment-plan';
import JudgmentRecordReason from '../../../../constants/ccd-events/ccd-events/record-edit-judgment/judgment-record-reason';

const nonEmptyString = z.string().min(1);

const editJudgment = (
  judgmentRecordReason: JudgmentRecordReason,
  joPaymentPlan: JoPaymentPlan,
) => {
  const baseEditJudgment = {
    joJudgmentRecordReason: z.literal(judgmentRecordReason),
    joOrderMadeDate: nonEmptyString,
    joAmountCostOrdered: nonEmptyString,
    joAmountOrdered: nonEmptyString,
    joIsRegisteredWithRTL: nonEmptyString,
  };

  if (joPaymentPlan === JoPaymentPlan.SET_DATE) {
    return {
      ...baseEditJudgment,
      joPaymentPlan: z.strictObject({
        type: z.literal(joPaymentPlan),
        paymentDeadlineDate: nonEmptyString,
      }),
    };
  }

  if (joPaymentPlan === JoPaymentPlan.INSTALMENTS) {
    return {
      ...baseEditJudgment,
      joPaymentPlan: z.strictObject({
        type: z.literal(joPaymentPlan),
      }),
      joInstalmentDetails: z.strictObject({
        amount: nonEmptyString,
        paymentFrequency: nonEmptyString,
        startDate: nonEmptyString,
      }),
    };
  }

  if (joPaymentPlan === JoPaymentPlan.IMMEDIATELY) {
    return {
      ...baseEditJudgment,
      joPaymentPlan: z.strictObject({
        type: z.literal(joPaymentPlan),
      }),
    };
  }

  return {};
};

const editJudgmentSchemaBuilderComponents = {
  editJudgment,
};

export default editJudgmentSchemaBuilderComponents;
