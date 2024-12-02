import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, text, form } from './statement-of-truth-content.ts';

@AllMethodsStep()
export default class StatementOfTruthPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(heading),
      super.expectText(text.descriptiveText1),
      super.expectText(text.descriptiveText2),
      super.expectText(text.descriptiveText3),
      super.expectInputValue(form.name.label, form.name.selector),
      super.expectInputValue(form.role.label, form.role.selector),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
