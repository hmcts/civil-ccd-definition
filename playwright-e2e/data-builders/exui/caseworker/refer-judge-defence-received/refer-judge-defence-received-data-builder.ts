import BaseDataBuilder from '../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import referJudgeDefenceReceivedDataBuilderComponents from './refer-judge-defence-received-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class ReferJudgeDefenceReceivedDataBuilder extends BaseDataBuilder {
  async build() {
    return this.buildData();
  }

  protected async buildData() {
    return {
      ...referJudgeDefenceReceivedDataBuilderComponents.referJudgeDefenceReceived,
    };
  }
}
