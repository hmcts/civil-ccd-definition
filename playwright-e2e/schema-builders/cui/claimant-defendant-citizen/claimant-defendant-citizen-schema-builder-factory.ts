import BaseSchemaBuilderFactory from '../../../base/base-schema-builder-factory';
import CreateClaimSpecAfterPaymentLIPSchemaBuilder from './create-claim-spec-after-payment/create-claim-spec-after-payment-lip-schema-builder';
import CreateLipClaimSchemaBuilder from './create-lip-claim/create-lip-claim-schema-builder';

export default class ClaimantDefendantCitizenSchemaBuilderFactory extends BaseSchemaBuilderFactory {
  get createClaimSchemaBuilder() {
    return new CreateLipClaimSchemaBuilder(this.testData);
  }

  get createClaimSpecAfterPaymentSchemaBuilder() {
    return new CreateClaimSpecAfterPaymentLIPSchemaBuilder(this.testData);
  }
}
