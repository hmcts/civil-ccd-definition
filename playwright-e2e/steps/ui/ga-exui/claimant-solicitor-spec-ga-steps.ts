import ClaimantSolicitorActionsFactory from '../../../actions/ui/exui/claimant-solicitor/claimant-solcitor-actions-factory';
import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import ClaimantSolicitorGaActionsFactory from '../../../actions/ui/ga-exui/claimant-solicitor-ga/claimant-solcitor-ga-actions-factory';
import GaExuiDashboardActions from '../../../actions/ui/ga-exui/common/ga-exui-dashboard-actions';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExui from '../../../base/base-exui';
import BaseGaExui from '../../../base/base-ga-exui';
import { claimantSolicitorUser } from '../../../config/users/exui-users';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';

@AllMethodsStep()
export default class ClaimantSolicitorSpecGaSteps extends BaseGaExui {
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
    await super.gaExuiDashboardActions.goToGaCaseDetails();
  }
}
