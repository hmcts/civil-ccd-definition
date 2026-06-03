import BasePage from '../../../../../base/base-page.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import { headings } from './transfer-online-case-confirm-content.ts';

@AllMethodsStep()
export default class TransferOnlineCaseConfirmPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(headings.transferOnlineCase),
      super.expectSubheading(headings.whatHappensNext),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
