import DateHelper from '../../../../../helpers/date-helper';
import CCDCaseData from '../../../../../models/ccd-case-data';

const extensionDate = (ccdCaseData: CCDCaseData) => {
  const agreedDeadlineExtension = DateHelper.formatDateToString(
    DateHelper.addToDate(ccdCaseData.respondent1ResponseDeadline!, {
      days: 28,
      workingDay: true,
    }),
    { outputFormat: 'YYYY-MM-DD' },
  );

  return {
    ExtensionDate: {
      respondentSolicitor1AgreedDeadlineExtension: agreedDeadlineExtension,
    },
  };
};

const informAgreedExtensionDateDataComponents = {
  extensionDate,
};

export default informAgreedExtensionDateDataComponents;
