import { Page } from 'playwright-core';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CertificateOfServiceSubmitFragment from '../../../fragments/certificate-of-service-submit/certificate-of-service-submit-fragment';
import ExuiEvent from '../../../exui-event/exui-event';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';

@AllMethodsStep()
export default class NotifyClaimDetailsCOSSubmitPage extends ExuiEvent(BasePage) {
  private certificateOfServiceSubmitFragment: CertificateOfServiceSubmitFragment;

  constructor(certificateOfServiceSubmitFragment: CertificateOfServiceSubmitFragment, page: Page) {
    super(page);
    this.certificateOfServiceSubmitFragment = certificateOfServiceSubmitFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      this.certificateOfServiceSubmitFragment.verifyContent(),
      this.certificateOfServiceSubmitFragment.verifyDefendant1Answers(),
      this.certificateOfServiceSubmitFragment.verifyDefendant2Answers(),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
