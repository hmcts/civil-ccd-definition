import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { checkbox } from './show-certify-statement-content.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class ShowCertifyStatmentPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async verifyText() {
    await super.expectText(checkbox.text.label);
  }

  async selectCheckbox() {
    await super.clickBySelector(checkbox.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
