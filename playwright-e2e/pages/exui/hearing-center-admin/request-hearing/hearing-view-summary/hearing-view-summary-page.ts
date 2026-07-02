import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import { heading, button } from './hearing-view-summary-content';

@AllMethodsStep()
export default class HearingViewSummaryPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.expectHeading(heading)]);
  }

  async editHearing() {
    await super.clickBySelector(button.editHearing.selector);
  }

  async submit() {
    // not needed???
  }
}
