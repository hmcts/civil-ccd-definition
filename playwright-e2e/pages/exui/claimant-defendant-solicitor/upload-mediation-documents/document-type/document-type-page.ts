import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content.ts';
import { heading, checkboxes } from './document-type-content';

@AllMethodsStep()
export default class DocumentTypePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectHeading(getFormattedCaseId(ccdCaseData.id!), { exact: false }),
      super.expectHeading(ccdCaseData.caseNamePublic!, { exact: false }),
      super.expectLabel(checkboxes.nonAttendanceStatement.label),
      super.expectLabel(checkboxes.referredDocuments.label),
    ]);
  }

  async selectNonAttendanceStatement() {
    await super.clickBySelector(checkboxes.nonAttendanceStatement.selector);
  }

  async selectReferredDocuments() {
    await super.clickBySelector(checkboxes.referredDocuments.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
