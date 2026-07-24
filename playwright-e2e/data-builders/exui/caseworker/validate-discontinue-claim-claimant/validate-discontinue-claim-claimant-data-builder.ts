import BaseDataBuilder from '../../../../base/base-data-builder';
import ConfirmOrderGivesPermission from '../../../../constants/ccd-events/validate-discontinue-claim-claimant/confirm-order-gives-permission';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import validateDiscontinueClaimClaimantDataBuilderComponents
  from './validate-discontinue-claim-claimant-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class ValidateDiscontinueClaimClaimantDataBuilder extends BaseDataBuilder {
  async buildYesPermission() {
    return this.buildData();
  }

  async buildNoPermission() {
    return this.buildData({confirmOrderGivesPermission: ConfirmOrderGivesPermission.NO});
  }

  async buildData({
    confirmOrderGivesPermission = ConfirmOrderGivesPermission.YES
  } : {
    confirmOrderGivesPermission?: ConfirmOrderGivesPermission,
  } = {}) {
    return {
      ...validateDiscontinueClaimClaimantDataBuilderComponents.validateDiscontinuance(confirmOrderGivesPermission),
    };
  }
}
