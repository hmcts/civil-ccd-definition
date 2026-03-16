import BasePageActionsFactory from '../../../../base/base-page-actions-factory';
import StandardDirectionOrderPageFactory from '../../../../pages/exui/judge-la/standard-directions-order/standard-directions-order-factory';
import StandardDirectionOrderDJPageFactory from '../../../../pages/exui/judge-la/standard-directions-order-dj/standard-directions-order-dj-factory';
import StandardDirectionsOrderNotSuitablePageFactory from '../../../../pages/exui/judge-la/not-suitable-for-sdo/standard-directions-order-not-suitable-factory';
import StandardDirectionsOrderActions from './standard-directions-order-actions';
import StandardDirectionsOrderDJActions from './standard-directions-order-dj-actions';
import StandardDirectionsOrderNotSuitableActions from './standard-directions-order-not-suitable-actions';

export default class JudgeActionsFactory extends BasePageActionsFactory {
  get standardDirectionsOrderActions() {
    return new StandardDirectionsOrderActions(
      new StandardDirectionOrderPageFactory(this.page),
      this.testData,
    );
  }

  get standardDirectionsOrderDJActions() {
    return new StandardDirectionsOrderDJActions(
      new StandardDirectionOrderDJPageFactory(this.page),
      this.testData,
    );
  }

  get standardDirectionsOrderNotSuitableActions() {
    return new StandardDirectionsOrderNotSuitableActions(
      new StandardDirectionsOrderNotSuitablePageFactory(this.page),
      this.testData,
    );
  }
}
