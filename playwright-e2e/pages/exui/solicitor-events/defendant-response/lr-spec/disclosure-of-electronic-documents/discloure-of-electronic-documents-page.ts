import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { heading, radioButtons } from './disclosure-of-electronice-documents-content.ts';

@AllMethodsStep()
export default class DisclosureOfElectronicDocumentsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(heading, { ignoreDuplicates: true }),
    ]);
  }

  async selectYes(defendantNumber: number) {
    await super.clickBySelector(radioButtons(defendantNumber).yes.selector);
  }

  async selectNo(defendantNumber: number) {
    await super.clickBySelector(radioButtons(defendantNumber).no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
