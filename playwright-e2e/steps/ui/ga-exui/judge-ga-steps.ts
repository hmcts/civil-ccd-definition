import GaExuiDashboardActions from '../../../actions/ui/ga-exui/common/ga-exui-dashboard-actions';
import JudgeGaActionsFactory from '../../../actions/ui/ga-exui/judge/judge-ga-actions-factory';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseGaExui from '../../../base/base-ga-exui';
import { judgeRegion1User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events/ccd-events';
import GaCaseState from '../../../constants/cases/ga-case-states';
import gaCCDEvents from '../../../constants/ccd-events/ga-ccd-events/ga-ccd-events';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';

@AllMethodsStep()
export default class JudgeGaSteps extends BaseGaExui {
  private judgeGaActionsFactory: JudgeGaActionsFactory;

  constructor(
    gaExuiDashboardActions: GaExuiDashboardActions,
    idamActions: IdamActions,
    judgeGaActionsFactory: JudgeGaActionsFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(gaExuiDashboardActions, idamActions, requestsFactory, testData);
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

  async GenerateDirectionsOrderFreeFormWithoutNotice() {
    const { generateDirectionsOrderGaActions } = this.judgeGaActionsFactory;
    await super.retryGaCCDEvent(
      async () => {
        await generateDirectionsOrderGaActions.selectFreeFormOrder();
        await generateDirectionsOrderGaActions.enterFreeFormOrderDetails();
        await generateDirectionsOrderGaActions.reviewDraftOrder();
        await generateDirectionsOrderGaActions.submitOrder();
      },
      async () => {
        await generateDirectionsOrderGaActions.confirmOrder();
      },
      ccdEvents.GENERATE_DIRECTIONS_ORDER,
    );
  }

  async MakeADecisionListHearing() {
    const { makeDecisionGaActions } = this.judgeGaActionsFactory;
    await super.retryGaCCDEvent(
      async () => {
        await makeDecisionGaActions.selectListForAHearing();
        await makeDecisionGaActions.enterHearingDetails();
        await makeDecisionGaActions.enterDrawGeneralOrderDetails();
        await makeDecisionGaActions.previewOrderDocument();
        await makeDecisionGaActions.submitDecision();
      },
      async () => {
        await makeDecisionGaActions.confirmDecision();
      },
      gaCCDEvents.MAKE_DECISION,
      { expectedState: GaCaseState.LISTING_FOR_A_HEARING },
    );
  }
}
