import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { serviceUpdateDto } from './initiate-general-application-after-payment-data-builder-components';

@AllMethodsStep()
export default class InitiateGeneralApplicationAfterPaymentDataBuilder extends BaseDataBuilder {
  async build() {
    return this.buildData();
  }

  protected async buildData() {
    return {
      ...serviceUpdateDto(this.getGaCCDCaseData()),
    };
  }
}
