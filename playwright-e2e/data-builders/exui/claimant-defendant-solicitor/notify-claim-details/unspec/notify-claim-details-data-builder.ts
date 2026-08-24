import BaseDataBuilder from '../../../../../base/base-data-builder';
import ClaimType from '../../../../../constants/cases/claim-type';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import notifyClaimDetailsDataBuilderComponents from './notify-claim-details-data-builder-components';

@AllMethodsStep()
export default class NotifyClaimDetailsDataBuilder extends BaseDataBuilder {
  async build() {
    return this.buildData();
  }

  async build1vLIP() {
    return this.buildData({ claimType: ClaimType.ONE_VS_ONE_LIP });
  }

  async build1v2LRLIP() {
    return this.buildData({ claimType: ClaimType.ONE_VS_TWO_LR_LIP });
  }

  async build1v2LIPS() {
    return this.buildData({ claimType: ClaimType.ONE_VS_TWO_LIPS });
  }

  protected async buildData({
      claimType = ClaimType.ONE_VS_ONE
    } :
    {
      claimType?: ClaimType
    } = {}) {
    const { civilServiceRequests } = this.requestsFactory;

    return {
      ...notifyClaimDetailsDataBuilderComponents.selectDefendantSolicitor,
      ...(await notifyClaimDetailsDataBuilderComponents.upload(
        claimType,
        !!this.ccdCaseData?.servedDocumentFiles?.particularsOfClaimDocument,
        civilServiceRequests,
      )),
      ...(await notifyClaimDetailsDataBuilderComponents.certificateOfService1(
        claimType,
        civilServiceRequests,
      )),
      ...(await notifyClaimDetailsDataBuilderComponents.certificateOfService2(
        claimType,
        civilServiceRequests,
      )),
    };
  }
}
