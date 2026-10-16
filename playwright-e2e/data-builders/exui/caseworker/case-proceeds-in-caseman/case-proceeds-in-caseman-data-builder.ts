import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import caseProceedsInCasemanDataBuilderComponents from './case-proceeds-in-caseman-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class CaseProceedsInCasemanDataBuilder extends BaseDataBuilder {
  async build() {
    return this.buildData();
  }

  protected async buildData() {
    return {
      ...caseProceedsInCasemanDataBuilderComponents.caseProceedsInCaseman,
    };
  }
}
