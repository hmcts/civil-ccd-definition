import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { radioButtons } from './mediation-content.ts';

@AllMethodsStep()
export default class MediationPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.radioYes.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.radioNo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
