import BasePage from '../../../../../base/base-page.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import { headings } from './hearing-scheduled-confirm-content.ts';

@AllMethodsStep()
export default class HearingScheduledConfirmPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(headings.hearingNoticeCreated),
      super.expectHeading(headings.yourReferenceNumber),
    ]);
  }
  async submit() {
    await super.retryClickSubmit();
  }
}
