import { Page } from 'playwright-core';
import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { heading } from './claimant-solicitor-service-address-content';
import ServiceAddressFragment from '../../../../fragments/service-address/service-address-fragment';

@AllMethodsStep()
export default class ClaimantSolicitorServiceAddressPage extends ExuiPage(BasePage) {
  serviceAddressFragment: ServiceAddressFragment;

  constructor(page: Page, serviceAddressFragment: ServiceAddressFragment) {
    super(page);
    this.serviceAddressFragment = serviceAddressFragment;
  }

  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading.legalRepresentativeServiceAddress),
      this.serviceAddressFragment.verifyContent(),
    ]);
  }

  async selectYesAndEnterAddress() {
    this.serviceAddressFragment.selectYes();
    this.serviceAddressFragment.enterAddressManual();
  }

  async selectNo() {
    this.serviceAddressFragment.selectNo();
  }

  async submit() {
    await super.clickSubmit();
  }
}
