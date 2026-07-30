import BaseDataBuilder from '../../../../base/base-data-builder';
import DecisionOnRequestReconsiderationOption from '../../../../constants/ccd-events/decision-on-reconsideration-request/decision-on-request-reconsideration-option';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import decisionOnReconsiderationRequestDataBuilderComponents from './decision-on-reconsideration-request-data-builder-components';

@AllMethodsStep()
export default class DecisionOnReconsiderationRequestDataBuilder extends BaseDataBuilder {
  async buildUpholdPreviousOrder() {
    return this.buildData();
  }

  async buildCreateNewSdo() {
    return this.buildData({decisionOnRequestReconsiderationOption: DecisionOnRequestReconsiderationOption.CREATE_SDO});
  }

  async buildOrderNeedsAmending() {
    return this.buildData({decisionOnRequestReconsiderationOption: DecisionOnRequestReconsiderationOption.CREATE_GENERAL_ORDER});
  }

  protected async buildData(
    {
      decisionOnRequestReconsiderationOption = DecisionOnRequestReconsiderationOption.YES
    } : {
      decisionOnRequestReconsiderationOption?: DecisionOnRequestReconsiderationOption
    } = {}
  ) {
    return {
      ...decisionOnReconsiderationRequestDataBuilderComponents.judgeResponseToReconsideration(decisionOnRequestReconsiderationOption),
      ...decisionOnReconsiderationRequestDataBuilderComponents.orderPreview(decisionOnRequestReconsiderationOption)
    };
  }
}
