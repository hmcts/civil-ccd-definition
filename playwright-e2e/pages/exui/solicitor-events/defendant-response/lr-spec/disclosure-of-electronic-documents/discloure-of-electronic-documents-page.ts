import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, radioButtons } from './disclosure-of-electronice-documents-content.ts';

@AllMethodsStep()
export default class DisclosureOfElectronicDocumentsPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(heading, { ignoreDuplicates: true }),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.yes.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
