import BasePageActionsFactory from '../../../../base/base-page-actions-factory';
import GenerateDirectionsOrderGaPageFactory from '../../../../pages/ga-exui/judge/generate-directions-order-ga/generate-directions-order-ga-page-factory';
import GenerateDirectionsOrderGaActions from './generate-directions-order-ga/generate-directions-order-ga-actions';
import MakeDecisionGaActions from './make-decision-ga/make-decision-ga-actions';
import MakeDecisionGaPageFactory from '../../../../pages/ga-exui/judge/make-decision-ga/make-decision-ga-page-factory';

export default class JudgeGaActionsFactory extends BasePageActionsFactory {
  get generateDirectionsOrderGaActions() {
    return new GenerateDirectionsOrderGaActions(new GenerateDirectionsOrderGaPageFactory(this.page), this.testData);
  }

  get makeDecisionGaActions() {
    return new MakeDecisionGaActions(new MakeDecisionGaPageFactory(this.page), this.testData);
  }
}
