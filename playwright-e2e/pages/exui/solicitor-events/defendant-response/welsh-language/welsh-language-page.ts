import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import {
  heading,
  text,
  speakingRadioButtons,
  documentsRadioButtons,
  speakingRadioButtons1v2,
  documentsRadioButtons1v2,
} from './welsh-language-content.ts';

@AllMethodsStep()
export default class WelshLanguagePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      //super.expectSubheading(heading),
      super.expectText(text, { ignoreDuplicates: true }),
    ]);
  }

  async selectSpeakingEnglish() {
    await super.clickBySelector(speakingRadioButtons.radioEnglish.selector);
  }

  async selectDocumentsEnglish() {
    await super.clickBySelector(documentsRadioButtons.radioEnglish.selector);
  }

  async selectSpeakingEnglish1v2() {
    await super.clickBySelector(speakingRadioButtons1v2.radioEnglish.selector);
  }

  async selectDocumentsEnglish1v2() {
    await super.clickBySelector(documentsRadioButtons1v2.radioEnglish.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
