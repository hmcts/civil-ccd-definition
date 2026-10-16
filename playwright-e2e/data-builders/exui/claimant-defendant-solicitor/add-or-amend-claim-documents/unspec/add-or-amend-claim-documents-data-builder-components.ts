import { claimantSolicitorUser } from '../../../../../config/users/exui-users';
import CaseDataHelper from '../../../../../helpers/case-data-helper';
import CivilServiceRequests from '../../../../../requests/civil-service-requests';

const upload = async (civilServiceRequests: CivilServiceRequests) => {
  const particularsOfClaimDocument =
    await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);

  return {
    Upload: {
      servedDocumentFiles: {
        particularsOfClaimDocument: [
          CaseDataHelper.setIdToData(particularsOfClaimDocument)
        ],
      },
    },
  };
};

const addOrAmendClaimDocumentsDataBuilderComponents = {
  upload,
};

export default addOrAmendClaimDocumentsDataBuilderComponents;
