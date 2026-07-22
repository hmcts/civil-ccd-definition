import BaseDataBuilder from '../../../../../base/base-data-builder';
import ClaimType from '../../../../../constants/cases/claim-type';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import settleClaimDataBuilderComponents from './settle-claim-data-builder-components';

@AllMethodsStep()
export default class SettleClaimDataBuilder extends BaseDataBuilder {
  async build() {
    return this.buildData();
  }

  async build2v1() {
    return this.buildData({claimType: ClaimType.TWO_VS_ONE})
  }

  protected async buildData({
    claimType = ClaimType.ONE_VS_ONE
  } : {
    claimType?: ClaimType
  } = {}) {
    return {
      ...settleClaimDataBuilderComponents.singleClaimant(claimType),
      ...settleClaimDataBuilderComponents.multipleClaimant(claimType)
    };
  }
}
