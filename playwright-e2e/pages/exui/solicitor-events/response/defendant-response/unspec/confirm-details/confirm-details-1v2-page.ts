import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { inputs } from './confirm-details-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class ConfirmDetails1v2Page extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(inputs.dateOfBirth.label, { count: 2 }),
      super.expectLabel(inputs.dateOfBirth.day.label, { count: 2 }),
      super.expectLabel(inputs.dateOfBirth.month.label, { count: 2 }),
      super.expectLabel(inputs.dateOfBirth.year.label, { count: 2 }),
    ]);
  }

  async enterDefendant1DateOfBirth() {
    await super.inputText(1, inputs.dateOfBirth.day.selector, { index: 0 });
    await super.inputText(1, inputs.dateOfBirth.day.selector, { index: 0 });
    await super.inputText(1980, inputs.dateOfBirth.day.selector, { index: 0 });
  }

  async enterDefendant2DateOfBirth() {
    await super.inputText(1, inputs.dateOfBirth.day.selector, { index: 1 });
    await super.inputText(1, inputs.dateOfBirth.day.selector, { index: 1 });
    await super.inputText(1980, inputs.dateOfBirth.day.selector, { index: 1 });
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
