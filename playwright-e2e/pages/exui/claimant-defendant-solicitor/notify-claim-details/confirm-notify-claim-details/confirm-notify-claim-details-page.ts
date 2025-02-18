import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DateHelper from '../../../../../helpers/date-helper';
import ExuiPage from '../../../exui-page/exui-page';
import { confirmationHeading, paragraphs } from './confirm-notify-claim-details-content';

@AllMethodsStep()
export default class ConfirmNotifyClaimDetailsPage extends ExuiPage(BasePage) {
  async verifyContent() {
    const responseDeadline = DateHelper.addToToday({ days: 14 });
    await super.runVerifications([
      super.expectHeading(confirmationHeading),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(
        DateHelper.formatDateToString(responseDeadline, { outputFormat: 'DD Month YYYY' }),
      ),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
