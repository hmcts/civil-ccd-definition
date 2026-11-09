import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import ExuiPage from '../../mixin-pages/exui-page/exui-page';
import { subheadings, paragraphs } from './ga-pba-details-content';

@AllMethodsStep()
export default class GaPbaDetailsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.payingForApplication),
      super.expectText(paragraphs.applicationFee),
      super.expectText(paragraphs.fee),
      super.expectText(paragraphs.paymentInformation),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
