import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content.ts';
import { headings, inputs, paragraphs, subheadings } from './document-type-content';

@AllMethodsStep()
export default class DocumentTypePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(headings.selectDocumentType),
      super.expectHeading(getFormattedCaseId(ccdCaseData.id!), { exact: false }),
      super.expectHeading(ccdCaseData.caseNamePublic!, { exact: false }),
      super.expectText(paragraphs.youCanSelectMoreThanOneType),
      super.expectSubheading(subheadings.mediationNonAttendance),
    ]);
  }

  async selectNonAttendanceStatement() {
    await super.clickBySelector(inputs.nonAttendanceStatement.selector);
  }

  async selectReferredDocuments() {
    await super.clickBySelector(inputs.referredDocuments.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
