import ClaimantSolicitorGaActionsFactory from '../../../actions/ui/ga-exui/claimant-solicitor/claimant-solcitor-ga-actions-factory';
import GaExuiDashboardActions from '../../../actions/ui/ga-exui/common/ga-exui-dashboard-actions';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseGaExui from '../../../base/base-ga-exui';
import { claimantSolicitorUser } from '../../../config/users/exui-users';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';

@AllMethodsStep()
export default class ClaimantSolicitorGaSteps extends BaseGaExui {
  private claimantSolicitorGaActionsFactory: ClaimantSolicitorGaActionsFactory;

  constructor(
    gaExuiDashboardActions: GaExuiDashboardActions,
    idamActions: IdamActions,
    claimantSolicitorGaActionsFactory: ClaimantSolicitorGaActionsFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(gaExuiDashboardActions, idamActions, requestsFactory, testData);
    this.claimantSolicitorGaActionsFactory = claimantSolicitorGaActionsFactory;
  }

  async Login() {
    await super.idamActions.exuiLogin(claimantSolicitorUser);
  }

  async NavigateToGaCaseDetails() {
    await super.setDebugTestData();
    await super.gaExuiDashboardActions.goToGaCaseDetails();
  }
}
