import DefendantSolicitor2GaActionsFactory from '../../../actions/ui/ga-exui/defendant-solicitor/defendant-solicitor-ga-actions-factory';
import GaExuiDashboardActions from '../../../actions/ui/ga-exui/common/ga-exui-dashboard-actions';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseGaExui from '../../../base/base-ga-exui';
import GaCaseState from '../../../constants/cases/ga-case-states';
import gaCCDEvents from '../../../constants/ccd-events/ga-ccd-events/ga-ccd-events';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';

@AllMethodsStep()
export default class DefendantSolicitor2GaSteps extends BaseGaExui {
  private defendantSolicitor2GaActionsFactory: DefendantSolicitor2GaActionsFactory;

  constructor(
    gaExuiDashboardActions: GaExuiDashboardActions,
    idamActions: IdamActions,
    defendantSolicitor2GaActionsFactory: DefendantSolicitor2GaActionsFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(gaExuiDashboardActions, idamActions, requestsFactory, testData);
    this.defendantSolicitor2GaActionsFactory = defendantSolicitor2GaActionsFactory;
  }

  async RespondToApplication() {
    const { respondToApplicationActions } = this.defendantSolicitor2GaActionsFactory;
    await super.retryGaCCDEvent(
      async () => {
        await respondToApplicationActions.respScreen();
        await respondToApplicationActions.respHearingScreen();
        await respondToApplicationActions.submit();
      },
      async () => {
        await respondToApplicationActions.confirm();
      },
      gaCCDEvents.RESPOND_TO_APPLICATION,
      { expectedState: GaCaseState.APPLICATION_SUBMITTED_AWAITING_JUDICIAL_DECISION },
    );
  }
}
