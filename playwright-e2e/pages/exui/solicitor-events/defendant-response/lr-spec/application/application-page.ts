import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, radioButtons, otherInformationForm, whatForForm } from './application-content.ts';

@AllMethodsStep()
export default class ApplicationPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.yes.selector);
    await super.inputText('test', whatForForm.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.no.selector);
  }

  async enterAdditionalInformation() {
    await super.inputText('test', otherInformationForm.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
