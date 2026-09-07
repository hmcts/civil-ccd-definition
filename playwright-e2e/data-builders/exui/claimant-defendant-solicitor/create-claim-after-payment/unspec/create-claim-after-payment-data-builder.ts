import BaseDataBuilder from '../../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { createClaimAfterPaymentDTO } from './create-claim-after-payment-data-builder-components';

@AllMethodsStep()
export default class CreateClaimAfterPaymentDataBuilder extends BaseDataBuilder {
  async build(paymentStatus: string, caseId?: number) {
    return this.buildData(paymentStatus, caseId);
  }

  protected async buildData(paymentStatus: string, caseId?: number) {
    return {
      ...createClaimAfterPaymentDTO(paymentStatus, caseId),
    };
  }
}
