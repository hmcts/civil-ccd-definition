import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, question, input } from './support-with-access-needs-content.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class SupportWithAccessNeedsPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      //super.expectHeading(heading),
      super.expectText(question.text.label),
      super.expectText(question.radioYes.label, { ignoreDuplicates: true }),
      super.expectText(question.radioNo.label, { ignoreDuplicates: true }),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(question.radioYes.selector);
  }

  async selectNo() {
    await super.clickBySelector(question.radioNo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
