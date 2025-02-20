import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { radioButtons } from './legal-representation-content.ts';

@AllMethodsStep()
export default class LegalRepresentationPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(radioButtons.defendantRepresented.label, { exact: true }),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.defendantRepresented.yes.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.defendantRepresented.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
