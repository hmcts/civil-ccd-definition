import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import DateHelper from '../../../../../../helpers/date-helper';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../../exui-page/exui-page';
import { inputs } from './extension-date-spec-content';

@AllMethodsStep()
export default class ExtensionDateSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectLabel(inputs.day.label),
      super.expectLabel(inputs.month.label),
      super.expectLabel(inputs.year.label),
    ]);
  }

  async enterDate(ccdCaseData: CCDCaseData, extensionDate: Date) {
    await super.inputText(DateHelper.getTwoDigitDay(extensionDate), inputs.day.selector);
    await super.inputText(DateHelper.getTwoDigitMonth(extensionDate), inputs.month.selector);
    await super.inputText(extensionDate.getFullYear(), inputs.year.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
