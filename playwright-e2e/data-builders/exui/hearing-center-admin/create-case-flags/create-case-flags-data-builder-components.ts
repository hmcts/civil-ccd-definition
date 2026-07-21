import CaseDataHelper from '../../../../helpers/case-data-helper';
import DateHelper from '../../../../helpers/date-helper';
import CCDCaseData, {
  CaseFlags,
  ClaimantDefendant,
} from '../../../../models/ccd-case-data';

const today = () =>
  DateHelper.formatDateToString(DateHelper.getToday(), { outputFormat: 'YYYY-MM-DDTHH:MM:SS' });

const complexCaseFlag = CaseDataHelper.setIdToData({
  name: 'Complex Case',
  flagComment: 'test comment',
  dateTimeCreated: today(),
  path: [
    CaseDataHelper.setIdToData('Case'),
  ],
  hearingRelevant: 'No',
  flagCode: 'PF0002',
  status: 'Active',
});

const vulnerableUserFlag = CaseDataHelper.setIdToData({
  name: 'Vulnerable user',
  flagComment: 'test comment',
  dateTimeCreated: today(),
  path: [
    CaseDataHelper.setIdToData('Party'),
  ],
  hearingRelevant: 'No',
  flagCode: 'PF0002',
  status: 'Active',
});

const disruptiveBehaviourFlag = CaseDataHelper.setIdToData({
  name: 'Unacceptable/disruptive customer behaviour',
  flagComment: 'test comment',
  dateTimeCreated: today(),
  path: [
    CaseDataHelper.setIdToData('Party'),
  ],
  hearingRelevant: 'No',
  flagCode: 'PF0002',
  status: 'Active',
});

const caseFlags = (caseFlags?: CaseFlags): Partial<CCDCaseData> => ({
  caseFlags: {
    ...caseFlags,
    details: [
      ...(caseFlags?.details ?? []),
      complexCaseFlag,
    ],
  },
});

const applicant1 = (applicant1?: ClaimantDefendant): Partial<CCDCaseData> => ({
  applicant1: {
    ...applicant1,
    flags: {
      ...applicant1?.flags,
      details: [
        ...(applicant1?.flags?.details ?? []),
        vulnerableUserFlag,
      ],
    },
  },
});

const respondent1 = (respondent1?: ClaimantDefendant): Partial<CCDCaseData> => ({
  respondent1: {
    ...respondent1,
    flags: {
      ...respondent1?.flags,
      details: [
        ...(respondent1?.flags?.details ?? []),
        disruptiveBehaviourFlag,
      ],
    },
  },
});

export default {
  caseFlags,
  applicant1,
  respondent1,
};
