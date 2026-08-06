import BaseDataBuilderFactory from '../../../base/base-data-builder-factory';
import CreateClaimSpecAfterPaymentLipDataBuilder from './create-claim-spec-after-payment/create-claim-spec-after-payment-lip-data-builder';
import CreateLipClaimDataBuilder from './create-lip-claim/create-lip-claim-data-builder';

export default class ClaimantDefendantCitizenDataBuilderFactory extends BaseDataBuilderFactory {
  get createClaimDataBuilder() {
    return new CreateLipClaimDataBuilder(this.requestsFactory, this.testData);
  }

  get createClaimSpecAfterPaymentDataBuilder() {
    return new CreateClaimSpecAfterPaymentLipDataBuilder(this.requestsFactory, this.testData);
  }
}
