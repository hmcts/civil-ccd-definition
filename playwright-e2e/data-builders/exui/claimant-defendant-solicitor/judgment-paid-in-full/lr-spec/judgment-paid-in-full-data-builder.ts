import BaseDataBuilder from '../../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import judgmentPaidInFullDataBuilderComponents from './judgment-paid-in-full-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class JudgmentPaidInFullDataBuilder extends BaseDataBuilder {
  async build() {
    return this.buildData();
  }

  async buildData() {
    return {
      ...judgmentPaidInFullDataBuilderComponents.markJudgmentPaidInFull,
    };
  }
}
