import { z } from 'zod';
import DJPaymentTypeSpec from '../../../../../constants/ccd-events/default-judgement/dj-payment-type-spec';

const nonEmptyString = z.string().min(1);

const defendantDetailsSpec = () => ({
  defendantDetailsSpec: z.looseObject({
    list_items: z.array(
      z.looseObject({
        code: nonEmptyString,
        label: nonEmptyString,
      }),
    ),
    value: z.looseObject({
      code: nonEmptyString,
      label: nonEmptyString,
    }),
  }),
});

const claimPartialPayment = () => ({
  partialPayment: nonEmptyString,
});

const fixedCostsOnEntry = () => ({
  claimFixedCostsOnEntryDJ: nonEmptyString,
});

const paymentBreakdown = () => ({
  defaultJudgementOverallTotal: z.number(),
});

const paymentType = () => ({
  paymentTypeSelection: nonEmptyString,
});

const paymentSetDate = (djPaymentTypeSpec: DJPaymentTypeSpec) => {
  if (djPaymentTypeSpec === DJPaymentTypeSpec.SET_DATE) {
    return {
      paymentSetDate: nonEmptyString,
    };
  }

  return {};
};

const repaymentInformation = (djPaymentTypeSpec: DJPaymentTypeSpec) => {
  if (djPaymentTypeSpec === DJPaymentTypeSpec.REPAYMENT_PLAN) {
    return {
      repaymentDate: nonEmptyString,
      repaymentFrequency: nonEmptyString,
      repaymentSuggestion: nonEmptyString,
    };
  }

  return {};
};

const defaultJudgementSpecSchemaComponents = {
  defendantDetailsSpec,
  claimPartialPayment,
  fixedCostsOnEntry,
  paymentBreakdown,
  paymentType,
  paymentSetDate,
  repaymentInformation,
};

export default defaultJudgementSpecSchemaComponents;
