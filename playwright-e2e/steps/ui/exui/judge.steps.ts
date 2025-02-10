import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import JudgeActionsFactory from '../../../actions/ui/exui/judge/judge-actions-factory';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExuiSteps from '../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';

@AllMethodsStep()
export default class JudgeSteps extends BaseExuiSteps {
  private judgeActionsFactory: JudgeActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    judgeActionsFactory: JudgeActionsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardActions, idamActions, testData);
    this.judgeActionsFactory = judgeActionsFactory;
  }
}
