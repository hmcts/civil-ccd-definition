import CaseworkerActionsFactory from '../../../actions/ui/exui/caseworker/caseworker-actions-factory';
import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExuiSteps from '../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import User from '../../../models/user';

@AllMethodsStep()
export default class CaseworkerSteps extends BaseExuiSteps {
  private caseworkerActionsFactory: CaseworkerActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    caseworkerActionsFactory: CaseworkerActionsFactory,
  ) {
    super(exuiDashboardActions, idamActions);
    this.caseworkerActionsFactory = caseworkerActionsFactory;
  }

  async AcceptCookies() {
    this.exuiDashboardActions.acceptCookies();
  }

  async SaveCookies(user: User) {
    this.exuiDashboardActions.saveCookies(user);
  }

  async GoToCaseList() {
    this.exuiDashboardActions.goToCaseList();
  }

  async GoToCaseDetails() {
    this.exuiDashboardActions.goToCaseDetails();
  }

  async SignOut() {
    this.exuiDashboardActions.signOut();
  }
}
