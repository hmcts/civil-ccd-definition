import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { getButtons } from './submit-content.ts';

@AllMethodsStep()
export default class SubmitPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async clickSubmit() {
    await super.clickBySelector(getButtons.submitButton.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
