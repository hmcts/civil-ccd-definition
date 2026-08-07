import BaseDataBuilder from '../../../../base/base-data-builder.ts';
import partys from '../../../../constants/users/partys.ts';
import { AllMethodsStep } from '../../../../decorators/test-steps.ts';
import { Party } from '../../../../models/users/partys.ts';
import trialReadinessDataBuilderComponents from './trial-readiness-data-builder-components.ts';

@AllMethodsStep()
export default class TrialReadinessDataBuilder extends BaseDataBuilder {
  async buildClaimant() {
    return this.buildData();
  }

  protected async buildData({
    party = partys.CLAIMANT_SOLICITOR_1,
  } : {
    party?: Party,
  } = {}) {
    return trialReadinessDataBuilderComponents.confirmReadyClaimant(party);
  }
}
