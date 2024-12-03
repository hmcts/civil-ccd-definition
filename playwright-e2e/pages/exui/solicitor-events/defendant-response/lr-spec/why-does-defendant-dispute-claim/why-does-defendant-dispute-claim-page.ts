import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, subheading, input } from './why-does-defendant-dispute-claim-content.ts';

@AllMethodsStep()
export default class WhyDoesDefendantDisputeClaimPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.inputText('expectedValue', input.selector),
      super.expectSubheading(subheading),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
