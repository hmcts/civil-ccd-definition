import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import JudgeActionsFactory from '../../../actions/ui/exui/judge/judge-actions-factory';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExui from '../../../base/base-exui';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import { judgeRegion1User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events';
import { CCDEvent } from '../../../models/ccd/ccd-events';

@AllMethodsStep()
export default class JudgeSteps extends BaseExui {
  private judgeActionsFactory: JudgeActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    judgeActionsFactory: JudgeActionsFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardActions, idamActions, requestsFactory, testData);
    this.judgeActionsFactory = judgeActionsFactory;
  }

  async Login() {
    await super.idamActions.exuiLogin(judgeRegion1User);
  }

  async goToCaseTasks() {
    //const { addDefendantLitigationFriendActions } = this.defendantActionsFactory;
    await super.retryExuiEvent(
      async () => {
        // await this.exuiDashboardActions.goToCaseTasks();
      },
      async () => {},
      ccdEvents.CREATE_SDO,
      { verifySuccessEvent: false },
    );
  }
}
