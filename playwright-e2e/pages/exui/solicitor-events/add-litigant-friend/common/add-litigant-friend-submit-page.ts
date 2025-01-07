import ExuiPage from '../../../exui-page/exui-page.ts';
import BasePage from '../../../../../base/base-page.ts';
import { subHeadings } from './add-litigant-friend-submit-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';

@AllMethodsStep()
export default class AddLitigantFriendSubmitPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectSubheading(subHeadings.heading)]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
