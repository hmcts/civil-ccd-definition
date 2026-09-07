import BaseDataBuilder from '../../../../base/base-data-builder';
import SetAsideOrderType from '../../../../constants/ccd-events/ccd-events/set-aside-judgment/set-aside-order-type';
import SetAsideReason from '../../../../constants/ccd-events/ccd-events/set-aside-judgment/set-aside-reason';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import setAsideOrderTypeDataBuilderComponents from './set-aside-order-type-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class SetAsideOrderTypeDataBuilder extends BaseDataBuilder {
  async buildJudgeOrder() {
    return this.buildData()
  }
  
  async buildJudgementError() {
    return this.buildData({ setAsideReason: SetAsideReason.JUDGMENT_ERROR });
  }

  protected async buildData({
    setAsideReason = SetAsideReason.JUDGE_ORDER,
    setAsideOrderType = SetAsideOrderType.ORDER_AFTER_APPLICATION,
  } : {
    setAsideReason?: SetAsideReason,
    setAsideOrderType?: SetAsideOrderType
  } = {}) {
    return {
      ...setAsideOrderTypeDataBuilderComponents.setAsideJudgment(setAsideReason),
      ...setAsideOrderTypeDataBuilderComponents.setAsideOrderType(setAsideReason, setAsideOrderType),
    };
  }
}
