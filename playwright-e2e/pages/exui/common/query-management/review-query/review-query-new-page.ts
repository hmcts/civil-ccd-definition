import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page.ts';
import CCDCaseData from '../../../../../models/ccd-case-data.ts';
import { headings } from './review-query-content.ts';
import { getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content.ts';

@AllMethodsStep()
export default class ReviewQueryNewPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(headings.reviewQueryDetails),
      super.expectHeading(getFormattedCaseId(ccdCaseData?.id!), { exact: false }),
      super.expectHeading(ccdCaseData?.caseNamePublic!, { exact: false }),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
