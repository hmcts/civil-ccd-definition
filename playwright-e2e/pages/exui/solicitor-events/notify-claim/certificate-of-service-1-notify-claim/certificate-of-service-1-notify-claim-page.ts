import { Page } from 'playwright-core';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CertificateOfServiceFragment from '../../../fragments/certificate-of-service/certificate-of-service-fragment';
import ExuiPage from '../../../exui-page/exui-page';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';

@AllMethodsStep()
export default class CertificateOfService1NotifyClaimPage extends ExuiPage(BasePage) {
  private defendant1CertificateOfServiceFragment: CertificateOfServiceFragment;

  constructor(defendant1CertificateOfServiceFragment: CertificateOfServiceFragment, page: Page) {
    super(page);
    this.defendant1CertificateOfServiceFragment = defendant1CertificateOfServiceFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      this.defendant1CertificateOfServiceFragment.verifyContent(),
    ]);
  }

  async fillDetails() {
    await this.defendant1CertificateOfServiceFragment.fillCertificateOfService();
    await this.defendant1CertificateOfServiceFragment.fillStatementOfTruth();
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
