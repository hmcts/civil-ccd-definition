import { Page } from 'playwright-core';
import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import partys from '../../../../../../constants/partys.ts';
import UnRegisteredOrganisationFragment from '../../../../fragments/unregistered-organisation/unregistered-organisation-fragment.ts';
import OrganisationAddressFragment from '../../../../fragments/organisation-address/organisation-address-fragment.ts';
import { heading } from './unregistered-second-defendant-solicitor-organisation-content.ts';

@AllMethodsStep()
export default class UnRegisteredSecondDefendantSolicitorOrganisation extends ExuiPage(BasePage) {
  private unRegisteredOrganisationFragment: UnRegisteredOrganisationFragment;
  private organisationAddressFragment: OrganisationAddressFragment;

  constructor(page: Page) {
    super(page);
    this.unRegisteredOrganisationFragment = new UnRegisteredOrganisationFragment(
      page,
      partys.DEFENDANT_SOLICITOR_2,
    );
    this.organisationAddressFragment = new OrganisationAddressFragment(
      page,
      partys.DEFENDANT_SOLICITOR_2,
    );
  }

  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      this.unRegisteredOrganisationFragment.verifyContent(),
    ]);
  }

  async enterDetails() {
    await this.unRegisteredOrganisationFragment.enterUnregisteredOrgDetails();
    await this.organisationAddressFragment.enterAddressManual();
  }

  async submit() {
    await super.clickSubmit();
  }
}
