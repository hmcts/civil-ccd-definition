import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import { subheadings, inputs } from './references-spec-content.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';

@AllMethodsStep()
export default class CreateClaimSpecReferencesPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectSubheading(subheadings.yourFileReference),
      super.expectLabel(inputs.claimantReference.label),
      super.expectLabel(inputs.defendantReference.label),
    ]);
  }

  async enterReferences() {
    await super.inputTextBySelector(inputs.claimantReference.selector, 'Claimant 1 Reference');
    await super.inputTextBySelector(inputs.defendantReference.selector, 'Defendant 1 Reference');
  }

  async submit() {
    await super.clickSubmit();
  }
}
