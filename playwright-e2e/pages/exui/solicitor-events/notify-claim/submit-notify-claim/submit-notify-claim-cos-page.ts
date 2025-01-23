import { Page } from 'playwright-core';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CertificateOfServiceNotifyClaimSubmitFragment from '../../../fragments/certificate-of-service-notify-claim-submit/certificate-of-service-notify-claim-submit-fragment';
import ExuiPage from '../../../exui-page/exui-page';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';

@AllMethodsStep()
export default class SubmitNotifyClaimCOSPage extends ExuiPage(BasePage) {
  private certificateOfServiceNotifyClaimSubmitFragment: CertificateOfServiceNotifyClaimSubmitFragment;

  constructor(
    certificateOfServiceSubmitFragment: CertificateOfServiceNotifyClaimSubmitFragment,
    page: Page,
  ) {
    super(page);
    this.certificateOfServiceNotifyClaimSubmitFragment = certificateOfServiceSubmitFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      this.certificateOfServiceNotifyClaimSubmitFragment.verifyContent(),
      this.certificateOfServiceNotifyClaimSubmitFragment.verifyDefendant1Answers(),
      this.certificateOfServiceNotifyClaimSubmitFragment.verifyDefendant2Answers(),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
