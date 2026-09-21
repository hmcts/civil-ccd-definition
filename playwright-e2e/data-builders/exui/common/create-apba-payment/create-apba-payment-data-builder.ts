import BaseDataBuilder from '../../../../base/base-data-builder';
import ClaimTrack from '../../../../constants/cases/claim-track';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { createRefundablePaymentDto } from './create-apba-payment-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class CreateAPBAPaymentDataBuilder extends BaseDataBuilder {
  async build() {
    return this.buildData({claimTrack: ClaimTrack.FAST_CLAIM});
  }

  async buildData({
    claimTrack = ClaimTrack.SMALL_CLAIM
  } : {
    claimTrack?: ClaimTrack
  } = {}) {
      const { civilServiceRequests } = this.requestsFactory
      return {
        ...(await createRefundablePaymentDto(this.ccdCaseData.id!, claimTrack, civilServiceRequests)),
      };
    }
}
