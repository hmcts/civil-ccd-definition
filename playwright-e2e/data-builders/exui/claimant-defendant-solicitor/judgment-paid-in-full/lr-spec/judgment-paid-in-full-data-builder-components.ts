import DateHelper from '../../../../../helpers/date-helper';

const markJudgmentPaidInFull = {
  MarkJudgmentPaidInFull: {
    joJudgmentPaidInFull: {
      confirmFullPaymentMade: ['CONFIRMED'],
      dateOfFullPaymentMade: DateHelper.formatDateToString(DateHelper.getToday(), {
        outputFormat: 'YYYY-MM-DD',
      }),
    },
  },
};

const judgmentPaidInFullDataBuilderComponents = {
  markJudgmentPaidInFull,
};

export default judgmentPaidInFullDataBuilderComponents;
