import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiEvent from '../../../exui-event/exui-event';
import { heading, useExpertInCourt } from './defendant-response-use-of-experts-content.ts';

@AllMethodsStep()
export default class DefendantResponseUseOfExpertsPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.verifyContent(heading),
      super.verifyText(useExpertInCourt.label),
      super.verifyRadioButtons(useExpertInCourt.yes),
      super.verifyRadioButtons(useExpertInCourt.no),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
