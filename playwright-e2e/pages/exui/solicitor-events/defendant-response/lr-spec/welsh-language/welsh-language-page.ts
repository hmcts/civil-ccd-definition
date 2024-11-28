import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  text,
  speakingRadioButtons,
  documentsRadioButtons,
} from './welsh-language-content.ts';

@AllMethodsStep()
export default class DefendantResponseWelshLanguagePage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectText(text),
      super.expectText(speakingRadioButtons.question),
      super.expectLabel(speakingRadioButtons.radioWelsh.label),
      super.expectLabel(speakingRadioButtons.radioEnglish.label),
      super.expectLabel(speakingRadioButtons.radioBoth.label),
      super.expectText(documentsRadioButtons.question),
      super.expectLabel(documentsRadioButtons.radioWelsh.label),
      super.expectLabel(documentsRadioButtons.radioEnglish.label),
      super.expectLabel(documentsRadioButtons.radioBoth.label),
    ]);
  }

  async selectSpeakingEnglish() {
    await super.clickBySelector(speakingRadioButtons.radioEnglish.selector);
  }

  async selectDocumentsEnglish() {
    await super.clickBySelector(documentsRadioButtons.radioEnglish.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
