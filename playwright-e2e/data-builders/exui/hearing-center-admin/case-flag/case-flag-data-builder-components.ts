import DateHelper from '../../../../helpers/date-helper';
import CCDCaseData from '../../../../models/ccd-case-data';

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

const updateCaseLevelComplexCaseFlag = (caseData: CCDCaseData) => {
  const existingFlag = caseData?.caseFlags?.details?.find(
    (detail) => detail.value.flagCode === 'CF0002',
  );

  return {
    ManageCaseFlags: {
      caseFlags: {
        groupId: caseData?.caseFlags?.groupId ?? null,
        visibility: caseData?.caseFlags?.visibility ?? null,
        details: [
          {
            id: existingFlag?.id,
            value: {
              ...existingFlag?.value,
              flagComment: 'Case Level - Complex case - API Test - Update 365',
              dateTimeModified: DateHelper.formatDateToString(DateHelper.getToday(), {
                outputFormat: 'YYYY-MM-DDTHH:MM:SS',
              }),
            },
          },
        ],
      },
    },
  };
};

const deactivateCaseLevelComplexCaseFlag = (caseData: CCDCaseData) => {
  const existingFlag = caseData?.caseFlags?.details?.find(
    (detail) => detail.value.flagCode === 'CF0002',
  );

  return {
    ManageCaseFlags: {
      caseFlags: {
        groupId: caseData?.caseFlags?.groupId ?? null,
        visibility: caseData?.caseFlags?.visibility ?? null,
        details: [
          {
            id: existingFlag?.id,
            value: {
              ...existingFlag?.value,
              status: 'Inactive',
              flagComment: 'Case Level - Complex case - API Test - Update Make Inactive',
              dateTimeModified: DateHelper.formatDateToString(DateHelper.getToday(), {
                outputFormat: 'YYYY-MM-DDTHH:MM:SS',
              }),
            },
          },
        ],
      },
    },
  };
};

const updateApplicant1SpecialMeasureFlag = (
  caseData: CCDCaseData,
  { flagComment }: { flagComment: string },
) => {
  const existingFlag = caseData?.applicant1?.flags?.details?.find(
    (detail) => detail.value?.flagCode === 'OT0001',
  );

  return {
    ManageCaseFlags: {
      applicant1: {
        ...caseData?.applicant1,
        flags: {
          ...caseData?.applicant1?.flags,
          details: [
            {
              id: existingFlag?.id,
              value: {
                ...existingFlag?.value,
                flagComment,
                dateTimeModified: DateHelper.formatDateToString(DateHelper.getToday(), {
                  outputFormat: 'YYYY-MM-DDTHH:MM:SS',
                }),
              },
            },
          ],
        },
      },
    },
  };
};

const deactivateApplicant1SpecialMeasureFlag = (
  caseData: CCDCaseData,
  { flagComment }: { flagComment: string },
) => {
  const existingFlag = caseData?.applicant1?.flags?.details?.find(
    (detail) => detail.value?.flagCode === 'OT0001',
  );

  return {
    ManageCaseFlags: {
      applicant1: {
        ...caseData?.applicant1,
        flags: {
          ...caseData?.applicant1?.flags,
          details: [
            {
              id: existingFlag?.id,
              value: {
                ...existingFlag?.value,
                flagComment,
                status: 'Inactive',
                dateTimeModified: DateHelper.formatDateToString(DateHelper.getToday(), {
                  outputFormat: 'YYYY-MM-DDTHH:MM:SS',
                }),
              },
            },
          ],
        },
      },
    },
  };
};

export default {
  complexCaseFlag: complexCaseLevelCaseFlag,
  applicant1SpecialMeasureFlag : applicant1SpecialMeasureFlag,
  updateCaseLevelComplexCaseFlag : updateCaseLevelComplexCaseFlag,
  deactivateCaseLevelComplexCaseFlag : deactivateCaseLevelComplexCaseFlag,
  updateApplicant1SpecialMeasureFlag : updateApplicant1SpecialMeasureFlag,
  deactivateApplicant1SpecialMeasureFlag : deactivateApplicant1SpecialMeasureFlag,
};
