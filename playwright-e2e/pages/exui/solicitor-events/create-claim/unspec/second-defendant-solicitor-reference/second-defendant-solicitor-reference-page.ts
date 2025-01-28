import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import { subheadings } from './second-defendant-solicitor-reference-content.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import SolicitorReferenceFragment from '../../../../fragments/solicitor-reference/solicitor-reference-fragment.ts';
import { Page } from 'playwright-core';

@AllMethodsStep()
export default class SecondDefendantSolicitorReferencePage extends ExuiPage(BasePage) {
  private defendantSolicitorReferenceFragment: SolicitorReferenceFragment;

  constructor(page: Page, defendantSolicitorReferenceFragment: SolicitorReferenceFragment) {
    super(page);
    this.defendantSolicitorReferenceFragment = defendantSolicitorReferenceFragment;
  }

  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectSubheading(subheadings.yourFileReference),
      this.defendantSolicitorReferenceFragment.verifyContent(),
    ]);
  }

  async enterReference() {
    await this.defendantSolicitorReferenceFragment.enterReference();
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
