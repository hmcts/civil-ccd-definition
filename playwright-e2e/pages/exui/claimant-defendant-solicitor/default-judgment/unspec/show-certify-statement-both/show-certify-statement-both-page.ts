import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../mixin-pages/exui-page/exui-page.ts';
import { heading, paragraphs, lists, checkboxes } from './show-certify-statement-both-content.ts';
import CCDCaseData from '../../../../../../models/ccd-case-data.ts';
import { getFormattedCaseId } from '../../../../mixin-pages/exui-page/exui-content.ts';

@AllMethodsStep()
export default class ShowCertifyStatmentBothPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectText(heading),
      super.expectCaseHeading(getFormattedCaseId(ccdCaseData.id!)),
      super.expectCaseHeading(ccdCaseData.caseNamePublic!),
      super.expectText(lists.timeExpired),
      super.expectText(lists.notResponded),
      super.expectText(lists.noOutstandingApp),
      super.expectText(lists.notSatisfiedClaim),
      super.expectText(lists.notFiledAdmission),
      super.expectText(paragraphs.descriptionText),
    ]);
  }

  async acceptCPR() {
    await super.clickBySelector(checkboxes.certifyStatement.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
