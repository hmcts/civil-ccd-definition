import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { radioButtons, subheadings } from './legal-representation-spec-content';

@AllMethodsStep()
export default class LegalRepresentationSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectSubheading(subheadings.defendantLegalRepresentative),
      super.expectYesLabel(radioButtons.defendantRepresented.yes.selector),
      super.expectNoLabel(radioButtons.defendantRepresented.no.selector),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.defendantRepresented.yes.selector);
  }

  async clickNoForLegalRepresentative() {
    await super.clickBySelector(radioButtons.defendantRepresented.yes.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
