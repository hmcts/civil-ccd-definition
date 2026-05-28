import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { heading, inputs, subheading, radioButtons } from './set-aside-judgment-content';

@AllMethodsStep()
export default class SetAsideJudgmentPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      //super.verifyHeadings(ccdCaseData),
      super.expectText(heading),
      super.expectText(subheading),
      super.expectLabel(radioButtons.judgeOrder.label),
      super.expectLabel(radioButtons.judgmentError.label),
    ]);
  }

  async selectJudgeOrder() {
    await super.clickBySelector(radioButtons.judgeOrder.selector);
  }

  async selectJudgmentError() {
    await super.clickBySelector(radioButtons.judgmentError.selector);
    await super.inputText(inputs.judgmentErrorText.text, inputs.judgmentErrorText.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
