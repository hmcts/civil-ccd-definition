import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { subHeading, paragraphs } from './manage-stay-request-update-content';

@AllMethodsStep()
export default class ManageStayRequestUpdatePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(subHeading),
      super.expectText(paragraphs.intro),
      super.expectText(paragraphs.followUp),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
