import DateHelper from '../../../../helpers/date-helper';

const issueClaim = () => ({
  issueDate: DateHelper.formatDateToString(DateHelper.getToday(), {
    outputFormat: 'YYYY-MM-DD',
  }),
});

const createClaimSpecAfterPaymentLipDataBuilderComponents = {
  issueClaim,
};

export default createClaimSpecAfterPaymentLipDataBuilderComponents;
