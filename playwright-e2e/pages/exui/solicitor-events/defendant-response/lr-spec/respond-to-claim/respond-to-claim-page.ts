import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, radioButtons } from './respond-to-claim-content.ts';

@AllMethodsStep()
export default class DefendantResponseRespondToClaimPage extends ExuiEvent(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      //super.verifyHeadings(),
      super.expectHeading(heading),
      super.expectText(radioButtons.text.label),
      super.expectLabel(radioButtons.defends.label),
      super.expectLabel(radioButtons.admitsAll.label),
      super.expectLabel(radioButtons.admitsPart.label),
      super.expectLabel(radioButtons.defendsAndWantsCounterclaim.label),
    ]);
  }

  async selectDefends() {
    await super.clickBySelector(radioButtons.defends.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
