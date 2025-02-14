import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { subheadings, paragraphs } from './payment-breakdown-content.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class PaymentBreakdownPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    const defendantName = ccdCaseData.respondent1?.partyName;
    const descriptionTextStart = paragraphs.descriptionTextStart.replace('<name>', defendantName);

    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(subheadings.claimAmount),
      super.expectText(subheadings.fixedCostAmount),
      super.expectText(subheadings.claimFeeAmount),
      super.expectText(subheadings.subtotal),
      super.expectText(subheadings.totalStillOwed),
      super.expectText(descriptionTextStart),
      super.expectText(paragraphs.descriptionTextEnd),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
