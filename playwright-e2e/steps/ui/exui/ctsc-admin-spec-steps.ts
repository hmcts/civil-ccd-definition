import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExui from '../../../base/base-exui';
import { ctscAdminUser } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import CtscAdminActionsFactory from '../../../actions/ui/exui/ctsc-admin/ctsc-admin-actions-factory';

@AllMethodsStep()
export default class CtscAdminSpecSteps extends BaseExui {
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
    await this.idamActions.exuiLogin(ctscAdminUser);
  }

  async MediationUnsuccessful() {
    const { manageCasesActions } = this.ctscAdminActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await manageCasesActions.mediationUnsuccessful();
      },
      async () => {},
      ccdEvents.MEDIATION_UNSUCCESSFUL,
    );
  }
}
