import JoPaymentPlan from '../../../../constants/ccd-events/record-edit-judgment/jo-payment-plan';
import JudgmentRecordReason from '../../../../constants/ccd-events/record-edit-judgment/judgment-record-reason';
import DateHelper from '../../../../helpers/date-helper';

const editJudgment = (
  judgmentRecordReason: JudgmentRecordReason,
  joPaymentPlan: JoPaymentPlan,
  fixedCostAmount: number,
  totalClaimAmount: number,
) => {
  if (joPaymentPlan === JoPaymentPlan.IMMEDIATELY) {
    return {
      EditJudgment: {
        joJudgmentRecordReason: judgmentRecordReason,
        joOrderMadeDate: DateHelper.formatDateToString(DateHelper.getToday(), {
          outputFormat: 'YYYY-MM-DD',
        }),
        joAmountCostOrdered: `${fixedCostAmount}`,
        joAmountOrdered: `${totalClaimAmount}`,
        joPaymentPlan: { type: joPaymentPlan },
        joIsRegisteredWithRTL: 'Yes',
      },
    };
  }

  if (joPaymentPlan === JoPaymentPlan.SET_DATE) {
    return {
      EditJudgment: {
        joJudgmentRecordReason: judgmentRecordReason,
        joOrderMadeDate: DateHelper.formatDateToString(DateHelper.getToday(), {
          outputFormat: 'YYYY-MM-DD',
        }),
        joAmountCostOrdered: `${fixedCostAmount}`,
        joAmountOrdered: `${totalClaimAmount}`,
        joPaymentPlan: {
          type: joPaymentPlan,
          paymentDeadlineDate: DateHelper.formatDateToString(
            DateHelper.addToToday({ months: 1 }),
            { outputFormat: 'YYYY-MM-DD' },
          ),
        },
        joIsRegisteredWithRTL: 'Yes',
      },
    };
  }

  if (joPaymentPlan === JoPaymentPlan.INSTALMENTS) {
    return {
      EditJudgment: {
        joJudgmentRecordReason: judgmentRecordReason,
        joOrderMadeDate: DateHelper.formatDateToString(DateHelper.getToday(), {
          outputFormat: 'YYYY-MM-DD',
        }),
        joAmountCostOrdered: `${fixedCostAmount}`,
        joAmountOrdered: `${totalClaimAmount}`,
        joPaymentPlan: {
          type: joPaymentPlan,
        },
        joInstalmentDetails: {
          amount: `${(fixedCostAmount + totalClaimAmount) / 10}`,
          paymentFrequency: 'EVERY_TWO_WEEKS',
          startDate: DateHelper.formatDateToString(
            DateHelper.addToToday({ months: 1 }),
            { outputFormat: 'YYYY-MM-DD' },
          ),
        },
        joIsRegisteredWithRTL: 'Yes',
      },
    };
  }

  return {};
};

const editJudgmentDataBuilderComponents = {
  editJudgment,
};

export default editJudgmentDataBuilderComponents;
