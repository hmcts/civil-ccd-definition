import BaseDataBuilder from '../../../../base/base-data-builder';
import ClaimTrack from '../../../../constants/cases/claim-track';
import ClaimType from '../../../../constants/cases/claim-type';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import evidenceUploadApplicantDataBuilderComponents from './evidence-upload-applicant-data-builder-components';

@AllMethodsStep()
export default class EvidenceUploadApplicantDataBuilder extends BaseDataBuilder {
  async buildFast() {
    return this.buildData({ claimTrack: ClaimTrack.FAST_CLAIM });
  }

  async buildFast2v1() {
    return this.buildData({ claimTrack: ClaimTrack.FAST_CLAIM, claimType: ClaimType.TWO_VS_ONE });
  }

  async buildSmall() {
    return this.buildData({ claimTrack: ClaimTrack.SMALL_CLAIM });
  }

  protected async buildData(
    {
      claimTrack = ClaimTrack.FAST_CLAIM,
      claimType = ClaimType.ONE_VS_ONE
    } :
    {
      claimTrack?: ClaimTrack,
      claimType?: ClaimType
    } = {}
  ) {
    const { civilServiceRequests } = this.requestsFactory;

    return {
      ...evidenceUploadApplicantDataBuilderComponents.evidenceUpload(claimTrack),
      ...evidenceUploadApplicantDataBuilderComponents.selectUploadOptions(claimType),
      ...evidenceUploadApplicantDataBuilderComponents.documentSelection(claimTrack),
      ...(await evidenceUploadApplicantDataBuilderComponents.documentUploadFastTrack(
        claimTrack,
        civilServiceRequests,
      )),
      ...(await evidenceUploadApplicantDataBuilderComponents.documentUploadSmallClaim(
        claimTrack,
        civilServiceRequests,
      )),
    };
  }
}
