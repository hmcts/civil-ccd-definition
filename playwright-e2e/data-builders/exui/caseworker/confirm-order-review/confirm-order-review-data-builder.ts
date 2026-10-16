import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import confirmOrderReviewDataBuilderComponents from './confirm-order-review-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class ConfirmOrderReviewDataBuilder extends BaseDataBuilder {
  async build() {
    return this.buildData();
  }

  protected async buildData() {
    return {
      ...confirmOrderReviewDataBuilderComponents.obligationDate,
      ...confirmOrderReviewDataBuilderComponents.isFinalOrder,
      ...confirmOrderReviewDataBuilderComponents.nextSteps,
    };
  }
}
