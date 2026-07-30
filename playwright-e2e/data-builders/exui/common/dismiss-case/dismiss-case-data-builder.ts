import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import dismissCaseDataBuilderComponents from './dismiss-case-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class DismissCaseDataBuilder extends BaseDataBuilder {
  async build() {
    return this.buildData();
  }

  async buildData() {
    return {
      ...dismissCaseDataBuilderComponents.dismissCase,
    };
  }
}
