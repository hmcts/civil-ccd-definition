import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, question, input } from './support-with-access-needs-content.ts';

@AllMethodsStep()
export default class SupportWithAccessNeedsPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectText(question.text.label),
      super.expectLabel(question.radioYes.label),
      super.expectLabel(question.radioNo.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(question.radioYes.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
