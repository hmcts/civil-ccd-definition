import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import generateDirectionsOrderDataBuilderComponents from './generate-directions-order-data-builder-components';

@AllMethodsStep()
export default class GaGenerateDirectionsOrderDataBuilder extends BaseDataBuilder {
  async buildAssistedOrderWithoutFurtherHearing() {
    return this.buildData();
  }

  protected async buildData() {
    return generateDirectionsOrderDataBuilderComponents
      .assistedOrderWithoutFurtherHearing();
  }
}
