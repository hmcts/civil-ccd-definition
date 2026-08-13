import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import { getFormattedCaseId } from '../../mixin-pages/exui-page/exui-content';
import { buttons, headings, links } from './service-request-content';

@AllMethodsStep()
export default class ServiceRequestPage extends BasePage {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(getFormattedCaseId(ccdCaseData.id!), { exact: false }),
      super.expectHeading(ccdCaseData.caseNamePublic!, { exact: false }),
    ]);
  }

  async clickReview() {
    await super.expectLink(links.review.title, { count: 2 });
    await super.clickLink(links.review.title, { index: 1 });
  }

  async clickIssueRefund() {
    await super.expectHeading(headings.serviceRequest);
    await super.clickButtonByName(buttons.issueRefund.title);
  }
}
