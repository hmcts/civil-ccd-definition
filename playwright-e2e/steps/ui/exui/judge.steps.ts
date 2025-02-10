import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import JudgeActionsFactory from '../../../actions/ui/exui/judge/judge-actions-factory';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExuiSteps from '../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';

@AllMethodsStep()
export default class JudgeSteps extends BaseExuiSteps {
  private judgeActionsFactory: JudgeActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    judgeActionsFactory: JudgeActionsFactory,
  ) {
    super(exuiDashboardActions, idamActions);
    this.judgeActionsFactory = judgeActionsFactory;
  }
}
