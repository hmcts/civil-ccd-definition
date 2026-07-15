import DateHelper from '../../../../helpers/date-helper';

const complexCaseLevelCaseFlag = {
  CaseFlags: {
    caseFlags: {
      details: [
        {
          value: {
            name: 'Complex Case',
            flagComment: 'Case Level - Complex case - API Test',
            hearingRelevant: 'No',
            flagCode: 'CF0002',
            dateTimeCreated: DateHelper.formatDateToString(DateHelper.getToday(), {
              outputFormat: 'YYYY-MM-DDTHH:MM:SS',
            }),
            path: [{ id: null, value: 'Case' }],
            status: 'Active',
            availableExternally: 'No',
          },
        },
      ],
    },
  },
};

const applicant1SpecialMeasureFlag = {
  CreateCaseFlags: {
    caseFlags: null,
    applicant1: {
      flags: {
        details: [
          {
            value: {
              name: 'Other',
              otherDescription: 'Test Special Measure',
              flagComment: 'Test Comment',
              hearingRelevant: 'Yes',
              flagCode: 'OT0001',
              status: 'Active',
              availableExternally: 'Yes',
              path: [
                { id: null, value: 'Party' },
                { id: null, value: 'Special measure' },
              ],
            },
          },
        ],
      },
    },
  },
};

export default {
  complexCaseFlag: complexCaseLevelCaseFlag,
  applicant1SpecialMeasureFlag : applicant1SpecialMeasureFlag,
};
