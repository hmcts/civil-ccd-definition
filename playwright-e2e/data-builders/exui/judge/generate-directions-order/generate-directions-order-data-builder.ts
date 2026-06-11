import BaseDataBuilder from '../../../../base/base-data-builder';
import { judgeRegion1User } from '../../../../config/users/exui-users';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { ClaimantDefendantPartyType } from '../../../../models/users/claimant-defendant-party-types';
import generateDirectionsOrderDataBuilderComponents from './generate-directions-order-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class GenerateDirectionsOrderDataBuilder extends BaseDataBuilder {
  async buildAssistedOrder(
    claimantPartyType: ClaimantDefendantPartyType,
    defendantPartyType: ClaimantDefendantPartyType,
  ) {
    return this.buildData(claimantPartyType, defendantPartyType);
  }

  protected async buildData(
    claimantPartyType: ClaimantDefendantPartyType,
    defendantPartyType: ClaimantDefendantPartyType,
  ) {

    return {
      ...generateDirectionsOrderDataBuilderComponents.finalOrderSelect,
      ...generateDirectionsOrderDataBuilderComponents.finalOrderAssistedOrder(
        claimantPartyType,
        defendantPartyType,
      ),
      ...generateDirectionsOrderDataBuilderComponents.finalOrderPreview(),
    };
  }
}
