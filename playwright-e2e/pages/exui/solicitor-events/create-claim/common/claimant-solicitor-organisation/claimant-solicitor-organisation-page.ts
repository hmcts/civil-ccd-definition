import { Page } from 'playwright-core';
import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { heading, inputs, subheadings } from './claimant-solicitor-organisation-content.ts';
import OrganisationSearchFragment from '../../../../fragments/organisation-search/organisation-search-fragment.ts';

@AllMethodsStep()
export default class ClaimantSolicitorOrganisationPage extends ExuiPage(BasePage) {
  private organisationSearchFragment: OrganisationSearchFragment;

  constructor(page: Page) {
    super(page);
    this.organisationSearchFragment = new OrganisationSearchFragment(page);
  }

  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubheading(subheadings.claimantLegalRepresentative),
      super.expectLabel(inputs.organisationRef.label),
      this.organisationSearchFragment.verifyContent(),
    ]);
  }

  async selectOrganisation() {
    await this.organisationSearchFragment.searchForOrganisation('Civil - Organisation 1');
  }

  async submit() {
    await super.clickSubmit();
  }
}
