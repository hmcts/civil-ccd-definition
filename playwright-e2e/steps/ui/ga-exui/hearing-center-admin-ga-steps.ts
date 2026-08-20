import HearingCenterAdminGaActionsFactory from '../../../actions/ui/ga-exui/hearing-center-admin/hearing-center-admin-ga-actions-factory';
import GaExuiDashboardActions from '../../../actions/ui/ga-exui/common/ga-exui-dashboard-actions';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseGaExui from '../../../base/base-ga-exui';
import { hearingCenterAdminRegion1User } from '../../../config/users/exui-users';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';

@AllMethodsStep()
export default class HearingCenterAdminGaSteps extends BaseGaExui {
  private hearingCenterAdminGaActionsFactory: HearingCenterAdminGaActionsFactory;

  constructor(
    gaExuiDashboardActions: GaExuiDashboardActions,
    idamActions: IdamActions,
    hearingCenterAdminGaActionsFactory: HearingCenterAdminGaActionsFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(gaExuiDashboardActions, idamActions, requestsFactory, testData);
    this.hearingCenterAdminGaActionsFactory = hearingCenterAdminGaActionsFactory;
  }

  async Login() {
    await super.idamActions.exuiLogin(hearingCenterAdminRegion1User);
  }

  async NavigateToGaCaseDetails() {
    await super.setDebugTestData();
    await super.gaExuiDashboardActions.goToGaCaseDetails();
  }
}
