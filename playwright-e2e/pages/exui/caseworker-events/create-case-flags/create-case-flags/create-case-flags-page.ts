import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import {
  flagsRadioButtons,
  nextButton,
  flagTypeRadioButtons,
  commentInput,
} from './create-case-flags-content.ts';

@AllMethodsStep()
export default class CreateCaseFlagsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectRadioButton(radioNumber: number) {
    await super.clickBySelector(flagsRadioButtons(radioNumber).radio.selector);
  }

  async clickNext() {
    await super.clickBySelector(nextButton);
  }

  async selectFlagTypeRadioButton(radioNumber: number) {
    await super.clickBySelector(flagTypeRadioButtons(radioNumber).radio.selector);
  }

  async enterComment() {
    await super.inputText('test', commentInput);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
