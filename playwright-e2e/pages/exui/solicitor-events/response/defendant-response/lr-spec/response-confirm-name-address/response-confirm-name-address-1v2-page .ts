import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { radioButtons } from './response-confirm-name-address-content.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import partys from '../../../../../../../constants/partys.ts';

@AllMethodsStep()
export default class ResponseConfirmNameAddress1v2Page extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(radioButtons.address.label, { count: 2 }),
      super.expectLabel(radioButtons.address.yes.label, { count: 2 }),
      super.expectLabel(radioButtons.address.no.label, { count: 2 }),
    ]);
  }

  async selectYesAddress() {
    await super.clickBySelector(radioButtons.address.yes.selector(partys.DEFENDANT_1));
    await super.clickBySelector(radioButtons.address.yes.selector(partys.DEFENDANT_2));
  }

  async selectNoAddress() {
    await super.clickBySelector(radioButtons.address.no.selector(partys.DEFENDANT_1));
    await super.clickBySelector(radioButtons.address.no.selector(partys.DEFENDANT_2));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
