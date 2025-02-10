import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import BaseExuiSteps from '../../../base/base-exui-steps';
import User from '../../../models/user';

export default class ExuiDashboardSteps extends BaseExuiSteps {
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
