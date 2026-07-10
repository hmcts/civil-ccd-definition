import BaseDataBuilder from '../../../../../base/base-data-builder';
import { claimantSolicitorUser } from '../../../../../config/users/exui-users';
import ClaimTrack from '../../../../../constants/cases/claim-track';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import evidenceUploadApplicantDataBuilderComponents from './evidence-upload-applicant-data-builder-components';

@AllMethodsStep()
export default class EvidenceUploadApplicantDataBuilder extends BaseDataBuilder {
  async buildFast() {
    return this.buildData({ claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildSmall() {
    return this.buildData({ claimTrack: ClaimTrack.SMALL_CLAIM });
  }

  protected async buildData(
    {
      claimTrack = ClaimTrack.FAST_CLAIM
    } :
    {
      claimTrack: ClaimTrack
    }
  ) {
    const { civilServiceRequests } = this.requestsFactory;
    const doc1 = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const doc2 = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const doc3 = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);
    const doc4 = await civilServiceRequests.uploadTestDocument(claimantSolicitorUser);

    return {
      ...evidenceUploadApplicantDataBuilderComponents.evidenceUpload(claimTrack),
      ...evidenceUploadApplicantDataBuilderComponents.documentSelection(claimTrack),
      ...evidenceUploadApplicantDataBuilderComponents.documentUploadFastTrack(claimTrack, doc1, doc2, doc3, doc4),
      ...evidenceUploadApplicantDataBuilderComponents.documentUploadSmallClaim(claimTrack,
            doc1,
            doc2,
            doc3,
            doc4,
          ),
    };
  }
}
