import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { radioButtons } from './response-confirm-name-and-address-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class ResponseConfirmNameAddress1v2Page extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(radioButtons.defendant1Address.label),
      super.expectLabel(radioButtons.defendant1Address.yes.label),
      super.expectLabel(radioButtons.defendant1Address.no.label),
      super.expectText(radioButtons.defendant2Address.label),
      super.expectLabel(radioButtons.defendant2Address.yes.label),
      super.expectLabel(radioButtons.defendant2Address.no.label),
    ]);
  }

  async selectYesAddress() {
    await super.clickBySelector(radioButtons.defendant1Address.yes.selector);
    await super.clickBySelector(radioButtons.defendant2Address.yes.selector);
  }

  async selectNoAddress() {
    await super.clickBySelector(radioButtons.defendant1Address.no.selector);
    await super.clickBySelector(radioButtons.defendant2Address.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
