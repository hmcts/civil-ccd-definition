import BasePageActionsFactory from '../../../../base/base-page-actions-factory';
import GenerateDirectionsOrderGaPageFactory from '../../../../pages/ga-exui/judge/generate-directions-order-ga/generate-directions-order-ga-page-factory';
import GenerateDirectionsOrderGaActions from './generate-directions-order-ga/generate-directions-order-ga-actions';

export default class JudgeGaActionsFactory extends BasePageActionsFactory {
  get generateDirectionsOrderGaActions() {
    return new GenerateDirectionsOrderGaActions(new GenerateDirectionsOrderGaPageFactory(this.page), this.testData);
  }
}
