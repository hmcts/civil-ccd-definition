import DateHelper from '../../../../helpers/date-helper';

const issueClaim = () => ({
  issueDate: DateHelper.formatDateToString(DateHelper.getToday(), {
    outputFormat: 'YYYY-MM-DD',
  }),
});

const createClaimSpecAfterPaymentLIPDataBuilderComponents = {
  issueClaim,
};

export default createClaimSpecAfterPaymentLIPDataBuilderComponents;
