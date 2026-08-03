import BaseDataBuilder from '../../../../base/base-data-builder.ts';
import { AllMethodsStep } from '../../../../decorators/test-steps.ts';
import trialReadinessDataBuilderComponents from './trial-readiness-data-builder-components.ts';

@AllMethodsStep()
export default class TrialReadinessDataBuilder extends BaseDataBuilder {
  async buildApplicant() {
    return this.buildData();
  }

  protected async buildData() {
    return trialReadinessDataBuilderComponents.applicantTrialReady();
  }
}
