import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { headings, paragraphs, lists, checkbox } from './show-certify-statement-1v2-content.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { getFormattedCaseId } from '../../../../exui-page/exui-content.ts';

@AllMethodsStep()
export default class ShowCertifyStatment1v2Page extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectText(headings.certifyStatement),
      super.expectHeading(getFormattedCaseId(ccdCaseData.id)),
      super.expectHeading(ccdCaseData.caseNamePublic),
      super.expectText(paragraphs.descriptionText),
      super.expectText(lists.timeExpired),
      super.expectText(lists.notResponded),
      super.expectText(lists.noOutstandingApp),
      super.expectText(lists.notSatisfiedClaim),
      super.expectText(lists.notFiledAdmission),
    ]);
  }

  async selectCheckbox() {
    await super.clickBySelector(checkbox.certifyStatement.selector);
  }

  async submit() {
    await super.clickSubmit();
  }
}
