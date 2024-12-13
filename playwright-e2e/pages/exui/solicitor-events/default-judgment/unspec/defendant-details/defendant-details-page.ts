import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { defendantButton } from './defendant-details-content.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class DefendantDetailsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectDefendant(defendantName: string) {
    await super.clickByText(defendantButton(defendantName).text);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
