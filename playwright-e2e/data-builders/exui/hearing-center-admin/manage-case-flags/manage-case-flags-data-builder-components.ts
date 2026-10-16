import CCDCaseData, {
  CaseFlags,
  ClaimantDefendant,
} from '../../../../models/ccd-case-data';

const caseFlags = (caseFlags?: CaseFlags): Partial<CCDCaseData> => ({
  caseFlags: {
    ...caseFlags,
    details: caseFlags?.details?.map((detail, index) => index === 0
      ? {
        ...detail,
        value: {
          ...detail.value,
          flagComment: 'Updated Comment',
          status: 'Inactive',
        },
      }
      : detail),
  },
});

const applicant1 = (applicant1?: ClaimantDefendant): Partial<CCDCaseData> => ({
  applicant1: {
    ...applicant1,
    flags: {
      ...applicant1?.flags,
      details: applicant1?.flags?.details?.map((detail, index) => index === 0
        ? {
          ...detail,
          value: {
            ...detail.value,
            flagComment: 'Updated Comment',
            status: 'Inactive',
          },
        }
        : detail),
    },
  },
});

const respondent1 = (respondent1?: ClaimantDefendant): Partial<CCDCaseData> => ({
  respondent1: {
    ...respondent1,
    flags: {
      ...respondent1?.flags,
      details: respondent1?.flags?.details?.map((detail, index) => index === 0
        ? {
          ...detail,
          value: {
            ...detail.value,
            flagComment: 'Updated Comment',
            status: 'Inactive',
          },
        }
        : detail),
    },
  },
});

export default {
  caseFlags,
  applicant1,
  respondent1,
};
