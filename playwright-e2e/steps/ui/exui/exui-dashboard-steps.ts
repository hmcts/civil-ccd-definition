import BaseExuiSteps from '../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../decorators/test-steps';
import User from '../../../models/user';

@AllMethodsStep()
export default class ExuiDashboardSteps extends BaseExuiSteps {
  async AcceptCookies() {
    await this.exuiDashboardActions.acceptCookies();
  }

  async SaveCookies(user: User) {
    await this.exuiDashboardActions.saveCookies(user);
  }

  async GoToCaseList() {
    await this.exuiDashboardActions.goToCaseList();
  }

  async GoToCaseDetails() {
    await this.exuiDashboardActions.goToCaseDetails();
  }

  async SignOut() {
    await this.exuiDashboardActions.signOut();
  }
}
