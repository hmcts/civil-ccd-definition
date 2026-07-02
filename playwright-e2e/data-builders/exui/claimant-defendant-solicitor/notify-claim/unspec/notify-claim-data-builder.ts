import BaseDataBuilder from '../../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import notifyClaimDataBuilderComponents from './notify-claim-data-builder-components';

@AllMethodsStep()
export default class NotifyClaimDataBuilder extends BaseDataBuilder {
  async buildData() {
    return {
      ...notifyClaimDataBuilderComponents.selectDefendantSolicitorToNotify,
      ...notifyClaimDataBuilderComponents.accessGrantedWarning,
    };
  }
}
