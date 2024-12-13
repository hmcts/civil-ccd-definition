import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { heading, hints, labels, radioButtons } from './claimant-solicitor-service-address-content';

@AllMethodsStep()
export default class ClaimantSolicitorServiceAddressPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading.legalRepresentativeServiceAddress),
      super.expectText(labels.postalCorrespondence),
      super.expectText(hints.postalCorrespondenceHint),
    ]);
  }

  async clickNoForDifferentAddress() {
    await super.clickBySelector(radioButtons.serviceAddressRequired.no);
  }

  async submit() {
    await super.clickSubmit();
  }
}
