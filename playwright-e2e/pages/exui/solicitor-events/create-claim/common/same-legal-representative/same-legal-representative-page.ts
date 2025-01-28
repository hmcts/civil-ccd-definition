import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import { radioButtons } from './same-legal-representative-content.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';

@AllMethodsStep()
export default class SameLegalRepresentativePage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(radioButtons.sameSolicitor.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.sameSolicitor.yes.selector);
  }

  async clickNo() {
    await super.clickBySelector(radioButtons.sameSolicitor.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
