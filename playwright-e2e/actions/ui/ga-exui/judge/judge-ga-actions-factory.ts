import BasePageActionsFactory from '../../../../base/base-page-actions-factory';
import MakeDecisionPageFactory from '../../../../pages/ga-exui/judge/make-decision/make-decision-page-factory';
import MakeDecisionActions from './make-decision/make-decision-actions';

export default class JudgeGaActionsFactory extends BasePageActionsFactory {
  get makeDecisionActions() {
    return new MakeDecisionActions(new MakeDecisionPageFactory(this.page), this.testData);
  }
}
