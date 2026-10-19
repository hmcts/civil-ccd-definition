import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content.ts';
import { headings, paragraphs } from './explanation-content';

@AllMethodsStep()
export default class ExplanationPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(headings.aboutThisService),
      super.expectCaseHeading(getFormattedCaseId(ccdCaseData.id!)),
      super.expectCaseHeading(ccdCaseData.caseNamePublic!),
      super.expectText(paragraphs.deadlines),
      super.expectText(paragraphs.beforeYouUpload),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
