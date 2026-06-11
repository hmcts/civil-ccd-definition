import DateHelper from '../../../../../helpers/date-helper';
import { UploadDocumentValue } from '../../../../../models/ccd-case-data';
import CaseDataHelper from '../../../../../helpers/case-data-helper';

const createDate = () =>
  DateHelper.formatDateToString(DateHelper.getToday(), { outputFormat: 'YYYY-MM-DD' });

const createDateTime = () =>
  DateHelper.formatDateToString(DateHelper.getToday(), {
    outputFormat: 'YYYY-MM-DDTHH:MM:SS',
  });

const evidenceUpload = {
  EvidenceUpload: {
    caseProgAllocatedTrack: 'FAST_CLAIM',
  },
};

const documentSelectionFastTrack = {
  DocumentSelectionFastTrack: {
    caseTypeFlag: 'do_not_show',
    disclosureSelectionEvidenceRes: ['DISCLOSURE_LIST'],
    witnessSelectionEvidenceRes: ['WITNESS_SUMMARY'],
    expertSelectionEvidenceRes: ['QUESTIONS_FOR_EXPERTS'],
    trialSelectionEvidenceRes: ['COSTS'],
    witnessStatementFlag: 'do_not_show',
    trialAuthorityFlag: 'do_not_show',
    expertJointFlag: 'do_not_show',
    witnessReferredStatementFlag: 'do_not_show',
    expertReportFlag: 'do_not_show',
    trialCostsFlag: 'show_trial_costs',
    witnessSummaryFlag: 'show_witness_summary',
    trialDocumentaryFlag: 'do_not_show',
  },
};

type RespondentDocuments = {
  disclosureDocument: UploadDocumentValue;
  witnessSummaryDocument: UploadDocumentValue;
  questionsDocument: UploadDocumentValue;
  authoritiesDocument: UploadDocumentValue;
};

const documentUpload = ({
  disclosureDocument,
  witnessSummaryDocument,
  questionsDocument,
  authoritiesDocument,
}: RespondentDocuments) => ({
  DocumentUpload: {
    documentDisclosureListRes: [
      CaseDataHelper.setIdToData({
        documentUpload: disclosureDocument,
        createdDatetime: createDateTime(),
      }),
    ],
    documentWitnessSummaryRes: [
      CaseDataHelper.setIdToData({
        witnessOptionName: 'test name',
        witnessOptionUploadDate: createDate(),
        witnessOptionDocument: witnessSummaryDocument,
        createdDatetime: createDateTime(),
      }),
    ],
    documentQuestionsRes: [
      CaseDataHelper.setIdToData({
        expertOptionName: 'test name',
        expertOptionOtherParty: 'text',
        expertDocumentQuestion: 'question',
        expertOptionUploadDate: createDate(),
        expertDocument: questionsDocument,
        createdDatetime: createDateTime(),
      }),
    ],
    documentAuthoritiesRes: [
      CaseDataHelper.setIdToData({
        documentUpload: authoritiesDocument,
        createdDatetime: createDateTime(),
      }),
    ],
  },
});

export default {
  evidenceUpload,
  documentSelectionFastTrack,
  documentUpload,
};
