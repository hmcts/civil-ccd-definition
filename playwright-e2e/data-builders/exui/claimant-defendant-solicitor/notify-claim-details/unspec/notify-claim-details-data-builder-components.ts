import CaseDataHelper from '../../../../../helpers/case-data-helper';
import { UploadDocumentValue } from '../../../../../models/ccd-case-data';


const selectDefendantSolicitor = {
  SelectDefendantSolicitor: {
    defendantSolicitorNotifyClaimDetailsOptions: {
      list_items: [CaseDataHelper.setCodeToData('Both')],
      value: CaseDataHelper.setCodeToData('Both'),
    },
  }
};

const upload = (particularsOfClaimDocument: UploadDocumentValue) => ({
  Upload: particularsOfClaimDocument ? {
    servedDocumentFiles: {
      particularsOfClaimDocument: [
        CaseDataHelper.setIdToData(particularsOfClaimDocument)
      ],
    },
  } : {},
});

const notifyClaimDetailsDataBuilderComponents = {
  selectDefendantSolicitor,
  upload
};

export default notifyClaimDetailsDataBuilderComponents;
