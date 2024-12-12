import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { inputs, paragraph, radioButtons } from './draw-directions-order-content';

@AllMethodsStep()
export default class DrawDirectionsOrderPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData): Promise<void> {
    await super.wait(10000);
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(paragraph),
      super.expectLabel(radioButtons.yes.label),
      super.expectLabel(radioButtons.no.label),
      super.expectNoText(inputs.judgementSum.label),
    ]);
  }

  async enterSumOfDamages() {
    await super.clickBySelector(radioButtons.yes.selector);
    await super.expectLabel(inputs.judgementSum.label);
    await super.inputText('100', inputs.judgementSum.selector);
  }

  async enterNoSumOfDamages() {
    await super.clickBySelector(radioButtons.no.selector);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
