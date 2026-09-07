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
      super.expectHeading(getFormattedCaseId(ccdCaseData.id!), { exact: false }),
      super.expectHeading(ccdCaseData.caseNamePublic!, { exact: false }),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
