import BaseDataBuilder from '../../../../../base/base-data-builder';
import { claimantSolicitorUser } from '../../../../../config/users/exui-users';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import evidenceUploadApplicantDataBuilderComponents from './evidence-upload-applicant-data-builder-components';

@AllMethodsStep()
export default class EvidenceUploadApplicantDataBuilder extends BaseDataBuilder {
  async buildData() {
    const { civilServiceRequests } = this.requestsFactory;
    const disclosureDocument = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const witnessSummaryDocument = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const jointStatementDocument = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const trialDocument = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);

    return {
      ...evidenceUploadApplicantDataBuilderComponents.evidenceUpload,
      ...evidenceUploadApplicantDataBuilderComponents.documentSelectionFastTrack,
      ...evidenceUploadApplicantDataBuilderComponents.documentUpload({
        disclosureDocument,
        witnessSummaryDocument,
        jointStatementDocument,
        trialDocument,
      }),
    };
  }
}
