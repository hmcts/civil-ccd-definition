import DateHelper from '../../../../helpers/date-helper';

const caseProceedsInCaseman = {
  CaseProceedsInCaseman: {
    claimProceedsInCaseman: {
      date: DateHelper.formatDateToString(DateHelper.getToday(), {
        outputFormat: 'YYYY-MM-DD',
      }),
      reason: 'OTHER',
      other: 'Other Reason',
    },
  },
};

const caseProceedsInCasemanDataBuilderComponents = {
  caseProceedsInCaseman,
};

export default caseProceedsInCasemanDataBuilderComponents;
