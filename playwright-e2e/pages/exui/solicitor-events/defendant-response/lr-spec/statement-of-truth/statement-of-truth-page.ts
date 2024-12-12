import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { heading, text, form } from './statement-of-truth-content.ts';

@AllMethodsStep()
export default class StatementOfTruthPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(text.descriptiveText1),
      super.expectText(text.descriptiveText2),
    ]);
  }

  async enterName() {
    await super.inputText('name', form.name.selector);
  }

  async enterRole() {
    await super.inputText('role', form.role.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
