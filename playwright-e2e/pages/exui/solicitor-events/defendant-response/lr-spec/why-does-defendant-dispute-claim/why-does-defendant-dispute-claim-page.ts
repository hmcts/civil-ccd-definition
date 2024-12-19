import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import {
  heading,
  subheading,
  input,
  input1v2,
} from './why-does-defendant-dispute-claim-content.ts';

@AllMethodsStep()
export default class WhyDoesDefendantDisputeClaimPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheading),
    ]);
  }

  async input1v1() {
    await super.inputText('expectedValue', input.selector);
  }

  async input1v2() {
    await super.inputText('expectedValue', input1v2.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
