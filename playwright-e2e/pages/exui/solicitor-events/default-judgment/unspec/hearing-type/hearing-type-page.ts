import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { hearingTypeRadio, textArea } from './hearing-type-content.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class HearingTypePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async verifyText() {
    await super.expectText(hearingTypeRadio.disposalHearing.label);
    await super.expectText(hearingTypeRadio.trial.label);
  }

  async selectDisposalHearing() {
    await super.clickBySelector(hearingTypeRadio.disposalHearing.selector);
    await super.inputText('Test', textArea.selector);
  }

  async selectTrial() {
    await super.clickBySelector(hearingTypeRadio.trial.selector);
    await super.inputText('Test', textArea.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
