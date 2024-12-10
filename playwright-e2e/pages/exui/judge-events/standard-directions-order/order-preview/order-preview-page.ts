import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DateHelper from '../../../../../helpers/date-helper';
import ExuiPage from '../../../exui-page/exui-page';
import { orderFile, paragraph, subheading } from './order-preview-content';

@AllMethodsStep()
export default class OrderPreviewPage extends ExuiPage(BasePage) {
  async verifyContent(...args: any[]): Promise<void> {
    const date = DateHelper.getToday();
    const orderFileName =
      date.getFullYear() +
      '-' +
      DateHelper.getTwoDigitMonth(date) +
      '-' +
      DateHelper.getTwoDigitDay(date) +
      orderFile;
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectSubheading(subheading),
      super.expectText(paragraph),
      super.expectText(orderFileName),
    ]);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
