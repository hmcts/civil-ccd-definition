import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import {
  heading,
  question,
  input,
  question1v2,
  input1v2,
} from './support-with-access-needs-content.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class SupportWithAccessNeedsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(question.text.label, { ignoreDuplicates: true }),
      super.expectText(question.radioYes.label, { ignoreDuplicates: true }),
      super.expectText(question.radioNo.label, { ignoreDuplicates: true }),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(question.radioYes.selector);
    await super.inputText(input.selector, 'Jane Smith: requires wheelchair access');
  }

  async selectNo() {
    await super.clickBySelector(question.radioNo.selector);
  }

  async selectYes1v2() {
    await super.clickBySelector(question1v2.radioYes.selector);
    await super.inputText(input1v2.selector, 'Jane Smith: requires wheelchair access');
  }

  async selectNo1v2() {
    await super.clickBySelector(question1v2.radioNo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
