import BaseDataBuilder from '../../../../base/base-data-builder';
import partys from '../../../../constants/users/partys';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import { Party } from '../../../../models/users/partys';
import trailReadinessDataBuilderComponents from './trail-readiness-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class TrailReadinessDataBuilder extends BaseDataBuilder {
  async buildClaimant() {
    return this.buildData({ party: partys.CLAIMANT_1 });
  }

  async buildDefendant() {
    return this.buildData({ party: partys.DEFENDANT_1 });
  }

  protected async buildData({
    party = partys.CLAIMANT_1,
  }: {
    party?: Party;
  } = {}): Promise<CCDCaseData> {
    return trailReadinessDataBuilderComponents.confirmTrialReady(party);
  }
}
