import GaExuiDashboardActions from '../../../actions/ui/ga-exui/common/ga-exui-dashboard-actions';
import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import JudgeGaActionsFactory from '../../../actions/ui/ga-exui/judge/judge-ga-actions-factory';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseGaExui from '../../../base/base-ga-exui';
import { judgeRegion1User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events/ccd-events';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';

@AllMethodsStep()
export default class JudgeGaSteps extends BaseGaExui {
  private judgeGaActionsFactory: JudgeGaActionsFactory;

  constructor(
    gaExuiDashboardActions: GaExuiDashboardActions,
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    judgeGaActionsFactory: JudgeGaActionsFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(gaExuiDashboardActions, exuiDashboardActions, idamActions, requestsFactory, testData);
    this.judgeGaActionsFactory = judgeGaActionsFactory;
  }

  async Login() {
    await super.idamActions.exuiLogin(judgeRegion1User);
  }

  async NavigateToGaCaseDetails() {
    await super.setDebugTestData();
    await super.gaExuiDashboardActions.goToGaCaseDetails();
  }

  async GenerateDirectionsOrderAssistedWithoutNotice() {
    const { generateDirectionsOrderGaActions } = this.judgeGaActionsFactory;
    await super.retryGaCCDEvent(
      async () => {
        await generateDirectionsOrderGaActions.selectAssistedOrder();
        await generateDirectionsOrderGaActions.enterAssistedOrderDetails();
        await generateDirectionsOrderGaActions.reviewDraftOrder();
        await generateDirectionsOrderGaActions.submitOrder();
      },
      async () => {
        await generateDirectionsOrderGaActions.confirmOrder();
      },
      ccdEvents.GENERATE_DIRECTIONS_ORDER,
    );
  }
}
