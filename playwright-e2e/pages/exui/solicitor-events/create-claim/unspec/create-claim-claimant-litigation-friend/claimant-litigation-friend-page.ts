import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { radioButtons } from './claimant-litigation-friend-content';

@AllMethodsStep()
export default class ClaimantLitigationFriendPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.verifyHeadings()]);
  }

  async selectNoForLitigationFriendRequired() {
    await super.clickBySelector(radioButtons.litigationFriendRequired.no);
  }

  async submit() {
    await super.clickSubmit();
  }
}
