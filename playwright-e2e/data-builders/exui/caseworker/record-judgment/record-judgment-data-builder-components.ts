import JoPaymentPlan from '../../../../constants/ccd-events/ccd-events/record-edit-judgment/jo-payment-plan';
import JudgmentRecordReason from '../../../../constants/ccd-events/ccd-events/record-edit-judgment/judgment-record-reason';
import DateHelper from '../../../../helpers/date-helper';

const recordJudgment = (
  judgmentRecordReason: JudgmentRecordReason,
  joPaymentPlan: JoPaymentPlan,
  fixedCostAmount: number,
  totalClaimAmount: number
) => {
  if (joPaymentPlan === JoPaymentPlan.IMMEDIATELY) {
    return {
      RecordJudgment: {
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
  } else if (joPaymentPlan === JoPaymentPlan.SET_DATE) {
    return {
      RecordJudgment: {
        joJudgmentRecordReason: judgmentRecordReason,
        joOrderMadeDate: DateHelper.formatDateToString(DateHelper.getToday(), {
          outputFormat: 'YYYY-MM-DD',
        }),
        joAmountCostOrdered: `${fixedCostAmount}`,
        joAmountOrdered: `${totalClaimAmount}`,
        joPaymentPlan: { 
          type: joPaymentPlan, 
          paymentDeadlineDate:  DateHelper.formatDateToString(DateHelper.addToToday({months: 1}), {
            outputFormat: 'YYYY-MM-DD',
          }),
        },
        joIsRegisteredWithRTL: 'Yes',
      },
    };
  } else if (joPaymentPlan === JoPaymentPlan.INSTALMENTS) {
    return {
      RecordJudgment: {
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
          amount: `${(fixedCostAmount + totalClaimAmount)/10}`,
          paymentFrequency: 'EVERY_TWO_WEEKS',
          startDate: DateHelper.formatDateToString(DateHelper.addToToday({months: 1}), {
            outputFormat: 'YYYY-MM-DD',
          }),
        },
        joIsRegisteredWithRTL: 'Yes',
      },
    };
  }

  return {};
};

const recordJudgmentDataBuilderComponents = {
  recordJudgment,
};

export default recordJudgmentDataBuilderComponents;
