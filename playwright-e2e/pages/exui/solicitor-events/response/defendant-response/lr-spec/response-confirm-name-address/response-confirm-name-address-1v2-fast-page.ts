import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { radioButtons } from './response-confirm-name-address-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class ResponseConfirmNameAddress1v2FastPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(radioButtons.defendant1Address.label),
      super.expectLabel(radioButtons.defendant1Address.yes.label),
      super.expectLabel(radioButtons.defendant1Address.no.label),
      super.expectText(radioButtons.defendant2AddressFastTrack.label),
      super.expectLabel(radioButtons.defendant2AddressFastTrack.yes.label),
      super.expectLabel(radioButtons.defendant2AddressFastTrack.no.label),
    ]);
  }

  async selectYesAddress() {
    await super.clickBySelector(radioButtons.defendant1Address.yes.selector);
    await super.clickBySelector(radioButtons.defendant2AddressFastTrack.yes.selector);
  }

  async selectNoAddress() {
    await super.clickBySelector(radioButtons.defendant1Address.no.selector);
    await super.clickBySelector(radioButtons.defendant2AddressFastTrack.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
