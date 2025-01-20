import { Page } from 'playwright-core';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CertificateOfServiceFragment from '../../../fragments/certificate-of-service/certificate-of-service-fragment';
import ExuiPage from '../../../exui-page/exui-page';

@AllMethodsStep()
export default class CertificateOfService1NotifyClaimDetailsPage extends ExuiPage(BasePage) {
  private certificateOfServiceFragment: CertificateOfServiceFragment;

  constructor(certificateOfServiceFragment: CertificateOfServiceFragment, page: Page) {
    super(page);
    this.certificateOfServiceFragment = certificateOfServiceFragment;
  }

  async verifyContent() {
    await super.runVerifications([this.certificateOfServiceFragment.verifyContent()]);
  }

  async fillDetails() {
    await this.certificateOfServiceFragment.fillCertificateOfService();
    await this.certificateOfServiceFragment.uploadSupportingEvidence();
    await this.certificateOfServiceFragment.fillCertificateOfService();
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
