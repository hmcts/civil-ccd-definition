import BaseDataBuilder from '../../../../base/base-data-builder';
import OrderType from '../../../../constants/ccd-events/generate-directions-order/order-type';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import generateDirectionsOrderDataBuilderComponents from './generate-directions-order-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class GenerateDirectionsOrderDataBuilder extends BaseDataBuilder {
  async buildAssistedOrder() {
    return this.buildData();
  }

  async buildFreeFormOrder() {
    return this.buildData({orderType: OrderType.FREE_FORM_ORDER})
  }

  protected async buildData(
    {
      orderType = OrderType.ASSISTED_ORDER ,
    } : {
      orderType?: OrderType,
    } = {}) {

    return {
      ...generateDirectionsOrderDataBuilderComponents.finalOrderSelect(orderType),
      ...generateDirectionsOrderDataBuilderComponents.finalOrderAssistedOrder(
        orderType,
        super.claimant1PartyType!,
        super.defendant1PartyType!,
      ),
      ...generateDirectionsOrderDataBuilderComponents.freeFormOrder(orderType),
      ...generateDirectionsOrderDataBuilderComponents.finalOrderPreview(),
    };
  }
}
