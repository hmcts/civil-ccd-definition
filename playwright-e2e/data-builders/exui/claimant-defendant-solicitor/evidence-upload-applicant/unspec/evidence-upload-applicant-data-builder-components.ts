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
    disclosureSelectionEvidence: ['DISCLOSURE_LIST'],
    witnessSelectionEvidence: ['WITNESS_SUMMARY'],
    expertSelectionEvidence: ['JOINT_STATEMENT'],
    trialSelectionEvidence: ['DOCUMENTARY'],
  },
};

type ApplicantDocuments = {
  disclosureDocument: UploadDocumentValue;
  witnessSummaryDocument: UploadDocumentValue;
  jointStatementDocument: UploadDocumentValue;
  trialDocument: UploadDocumentValue;
};

const documentUpload = ({
  disclosureDocument,
  witnessSummaryDocument,
  jointStatementDocument,
  trialDocument,
}: ApplicantDocuments) => ({
  DocumentUpload: {
    documentDisclosureList: [
      CaseDataHelper.setIdToData({
        documentUpload: disclosureDocument,
        createdDatetime: createDateTime(),
      }),
    ],
    documentWitnessSummary: [
      CaseDataHelper.setIdToData({
        witnessOptionName: 'test name',
        witnessOptionUploadDate: createDate(),
        witnessOptionDocument: witnessSummaryDocument,
        createdDatetime: createDateTime(),
      }),
    ],
    documentJointStatement: [
      CaseDataHelper.setIdToData({
        expertOptionName: 'test name',
        expertOptionExpertises: 'expertise',
        expertOptionUploadDate: createDate(),
        expertDocument: jointStatementDocument,
        createdDatetime: createDateTime(),
      }),
    ],
    documentEvidenceForTrial: [
      CaseDataHelper.setIdToData({
        typeOfDocument: 'images etc',
        documentIssuedDate: createDate(),
        documentUpload: trialDocument,
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
