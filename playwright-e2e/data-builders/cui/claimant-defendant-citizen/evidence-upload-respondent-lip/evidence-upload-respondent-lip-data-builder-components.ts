import { defendants } from '../../../../config/users/cui-users';
import partys from '../../../../constants/users/partys';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import DateHelper from '../../../../helpers/date-helper';
import CivilServiceRequests from '../../../../requests/civil-service-requests';

const createDate = () =>
  `${DateHelper.formatDateToString(DateHelper.getToday(), { outputFormat: 'YYYY-MM-DD' })}T00:00:00.000Z`;

const createDateTime = () => DateHelper.getToday().toISOString();

const evidenceUploadRespondentLip = async (civilServiceRequests: CivilServiceRequests) => {
  const witnessSummaryDocument = await civilServiceRequests.uploadTestDocument(defendants[0]);
  const jointStatementDocument = await civilServiceRequests.uploadTestDocument(defendants[0]);
  const authoritiesDocument = await civilServiceRequests.uploadTestDocument(defendants[0]);
  const witnessData = CaseDataHelper.buildWitnessData(partys.DEFENDANT_1_WITNESS_1);
  const expertData = CaseDataHelper.buildExpertData(partys.DEFENDANT_1_EXPERT_1);

  return {
    documentWitnessSummaryRes: [
      CaseDataHelper.setIdToData({
        witnessOptionName: witnessData.partyName,
        witnessOptionUploadDate: createDate(),
        witnessOptionDocument: witnessSummaryDocument,
        createdDatetime: createDateTime(),
      }),
    ],
    documentJointStatementRes: [
      CaseDataHelper.setIdToData({
        expertOptionName: expertData.partyName,
        expertOptionExpertises: expertData.fieldOfExpertise,
        expertOptionUploadDate: createDate(),
        expertDocument: jointStatementDocument,
        createdDatetime: createDateTime(),
      }),
    ],
    documentAuthoritiesRes: [
      CaseDataHelper.setIdToData({
        documentUpload: authoritiesDocument,
        createdDatetime: createDateTime(),
      }),
    ],
    caseDocumentUploadDateRes: createDateTime(),
  };
};

const evidenceUploadRespondentLipDataBuilderComponents = {
  evidenceUploadRespondentLip,
};

export default evidenceUploadRespondentLipDataBuilderComponents;
