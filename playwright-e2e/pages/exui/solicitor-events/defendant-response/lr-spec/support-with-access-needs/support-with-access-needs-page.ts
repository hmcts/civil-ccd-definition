import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { heading, question, input } from './support-with-access-needs-content.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class SupportWithAccessNeedsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData, defendantNumber: number) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(question(defendantNumber).text.label, { ignoreDuplicates: true }),
      super.expectText(question(defendantNumber).radioYes.label, { ignoreDuplicates: true }),
      super.expectText(question(defendantNumber).radioNo.label, { ignoreDuplicates: true }),
    ]);
  }

  async selectYes(defendantNumber: number) {
    await super.clickBySelector(question(defendantNumber).radioYes.selector);
    await super.inputText(
      input(defendantNumber).selector,
      'Jane Smith: requires wheelchair access',
    );
  }

  async selectNo(defendantNumber: number) {
    await super.clickBySelector(question(defendantNumber).radioNo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
