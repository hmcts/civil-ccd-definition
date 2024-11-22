import { Page } from 'playwright-core';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CertificateOfServiceFragment from '../../../fragments/certificate-of-service/certificate-of-service-fragment';
import ExuiEvent from '../../../exui-event/exui-event';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';

@AllMethodsStep()
export default class NotifyClaimCOSDefendant2Page extends ExuiEvent(BasePage) {
  private certificateOfServiceFragment: CertificateOfServiceFragment;

  constructor(certificateOfServiceFragment: CertificateOfServiceFragment, page: Page) {
    super(page);
    this.certificateOfServiceFragment = certificateOfServiceFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      this.certificateOfServiceFragment.verifyDefendant2Content(),
    ]);
  }

  async fillDetails() {
    await this.certificateOfServiceFragment.fillDefendant2CertificateOfService();
    await this.certificateOfServiceFragment.fillDefendant2StatementOfTruth();
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
