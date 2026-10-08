import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiQmPage from '../../../mixin-pages/exui-qm-page/exui-qm-page';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content';
import { headings } from './review-query-content';

@AllMethodsStep()
export default class ReviewQueryFollowupPage extends ExuiQmPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(headings.reviewQueryDetails),
      super.expectCaseHeading(getFormattedCaseId(ccdCaseData.id!)),
      super.expectCaseHeading(ccdCaseData.caseNamePublic!),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
