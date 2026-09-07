import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import stayCaseDataBuilderComponents from './stay-case-data-builder-components';

@AllMethodsStep()
export default class StayCaseDataBuilder extends BaseDataBuilder {
  async build() {
    return this.buildData();
  }

  protected async buildData() {
    return {
      ...stayCaseDataBuilderComponents.stayCase,
    };
  }
}
