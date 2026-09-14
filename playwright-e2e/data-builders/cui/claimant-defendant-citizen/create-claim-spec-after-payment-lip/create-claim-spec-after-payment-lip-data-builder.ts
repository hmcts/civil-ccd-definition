import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import createClaimSpecAfterPaymentLipDataBuilderComponents from './create-claim-spec-after-payment-lip-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class CreateClaimSpecAfterPaymentLipDataBuilder extends BaseDataBuilder {
  async buildIssueClaim() {
    return this.buildData();
  }

  protected async buildData() {
    return {
      ...createClaimSpecAfterPaymentLipDataBuilderComponents.issueClaim(),
    };
  }
}
