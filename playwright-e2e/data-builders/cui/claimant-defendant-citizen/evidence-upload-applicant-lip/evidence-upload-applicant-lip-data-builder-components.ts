import { claimants } from '../../../../config/users/cui-users';
import partys from '../../../../constants/users/partys';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import DateHelper from '../../../../helpers/date-helper';
import CivilServiceRequests from '../../../../requests/civil-service-requests';

const createDate = () =>
  `${DateHelper.formatDateToString(DateHelper.getToday(), { outputFormat: 'YYYY-MM-DD' })}T00:00:00.000Z`;

const createDateTime = () => DateHelper.getToday().toISOString();

const evidenceUploadApplicantLip = async (civilServiceRequests: CivilServiceRequests) => {
  const disclosureDocument = await civilServiceRequests.uploadTestDocument(claimants[0]);
  const witnessStatementDocument = await civilServiceRequests.uploadTestDocument(claimants[0]);
  const expertReportDocument = await civilServiceRequests.uploadTestDocument(claimants[0]);
  const caseSummaryDocument = await civilServiceRequests.uploadTestDocument(claimants[0]);
  const witnessData = CaseDataHelper.buildWitnessData(partys.CLAIMANT_WITNESS_1);
  const expertData = CaseDataHelper.buildExpertData(partys.CLAIMANT_EXPERT_1);

  return {
    documentForDisclosure: [
      CaseDataHelper.setIdToData({
        typeOfDocument: 'Document for disclosure',
        documentIssuedDate: createDate(),
        documentUpload: disclosureDocument,
        createdDatetime: createDateTime(),
      }),
    ],
    documentWitnessStatement: [
      CaseDataHelper.setIdToData({
        witnessOptionName: witnessData.partyName,
        witnessOptionUploadDate: createDate(),
        witnessOptionDocument: witnessStatementDocument,
        createdDatetime: createDateTime(),
      }),
    ],
    documentExpertReport: [
      CaseDataHelper.setIdToData({
        expertOptionName: expertData.partyName,
        expertOptionExpertise: expertData.fieldOfExpertise,
        expertOptionUploadDate: createDate(),
        expertDocument: expertReportDocument,
        createdDatetime: createDateTime(),
      }),
    ],
    documentCaseSummary: [
      CaseDataHelper.setIdToData({
        documentUpload: caseSummaryDocument,
        createdDatetime: createDateTime(),
      }),
    ],
    caseDocumentUploadDate: createDateTime(),
  };
};

const evidenceUploadApplicantLipDataBuilderComponents = {
  evidenceUploadApplicantLip,
};

export default evidenceUploadApplicantLipDataBuilderComponents;
