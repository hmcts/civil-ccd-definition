import CtscAdminActionsFactory from '../../../actions/ui/exui/ctsc-admin/ctsc-admin-actions-factory';
import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExui from '../../../base/base-exui';
import { ctscAdminUser } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events/ccd-events';
import respondToQueryCtscTask from '../../../constants/wa-tasks/exui/respondToQueryCtscTask';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';

@AllMethodsStep()
export default class CtscAdminSteps extends BaseExui {
  private ctscAdminActionsFactory: CtscAdminActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    ctscAdminActionsFactory: CtscAdminActionsFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardActions, idamActions, requestsFactory, testData);
    this.ctscAdminActionsFactory = ctscAdminActionsFactory;
  }

  async Login() {
    await super.idamActions.exuiLogin(ctscAdminUser);
  }

  async RespondToQuery() {
    const { queryManagementActions } = this.ctscAdminActionsFactory;
    await super.retryWAEvent(
      async () => {
        await queryManagementActions.enterResponseToQuery();
        await queryManagementActions.reviewQueryResponse();
      },
      async () => {
        await queryManagementActions.confirmQueryResponse();
      },
      ccdEvents.QUERY_MANAGEMENT_RESPOND,
      ctscAdminUser,
      respondToQueryCtscTask,
      { startWithWATaskName: true, verifySuccessEvent: false },
    );
  }
}
