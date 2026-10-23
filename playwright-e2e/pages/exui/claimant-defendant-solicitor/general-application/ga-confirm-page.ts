import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import ExuiPage from '../../mixin-pages/exui-page/exui-page';
import { headings, paragraphs, link } from './ga-confirm-content';

@AllMethodsStep()
export default class GaConfirmPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(headings.submittedApplication),
      super.expectText(paragraphs.paymentDue, { exact: false }),
      super.expectLink(link.payFee),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
