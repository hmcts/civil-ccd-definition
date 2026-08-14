import BaseDataBuilder from '../../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { createClaimSpecAfterPaymentDTO } from './create-claim-spec-after-payment-data-builder-components';

@AllMethodsStep()
export default class CreateClaimSpecAfterPaymentDataBuilder extends BaseDataBuilder {
  async build(paymentStatus: string, caseId?: number) {
    return this.buildData(paymentStatus, caseId);
  }

  protected async buildData(paymentStatus: string, caseId?: number) {
    return {
      ...createClaimSpecAfterPaymentDTO(paymentStatus, caseId),
    };
  }
}
