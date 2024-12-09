import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { radioButtons, radioButtons2v1 } from './intend-to-file-single-response-content.ts';

@AllMethodsStep()
export default class IntendToFileSingleResponsePage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.yes.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.no.selector);
  }

  async selectYes2v1() {
    await super.clickBySelector(radioButtons2v1.yes.selector);
  }

  async selectNo2v1() {
    await super.clickBySelector(radioButtons2v1.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
