import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { inputs } from './confirm-details-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class ConfirmDetailsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(inputs.dateOfBirth.label),
      super.expectLabel(inputs.dateOfBirth.day.label),
      super.expectLabel(inputs.dateOfBirth.month.label),
      super.expectLabel(inputs.dateOfBirth.year.label),
    ]);
  }

  async enterDateOfBirth() {
    await super.inputText(1, inputs.dateOfBirth.day.selector);
    await super.inputText(1, inputs.dateOfBirth.day.selector);
    await super.inputText(1980, inputs.dateOfBirth.day.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
