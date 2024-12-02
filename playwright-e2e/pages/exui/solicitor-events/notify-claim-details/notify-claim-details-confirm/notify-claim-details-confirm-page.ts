import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DateHelper from '../../../../../helpers/date-helper';
import ExuiEvent from '../../../exui-event/exui-event';
import { confirmationHeading, paragraphs } from './notify-claim-details-confirm-content';

@AllMethodsStep()
export default class NotifyClaimDetailsConfirmPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    const responseDeadline = DateHelper.addToToday({ days: 14 });
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(confirmationHeading),
      super.expectText(paragraphs.descriptionText1),
      super.expectText(
        DateHelper.formatDateToString(responseDeadline, { outputFormat: 'DD-Month-YYYY' }),
      ),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
