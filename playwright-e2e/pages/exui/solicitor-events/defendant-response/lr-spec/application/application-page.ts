import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  radioButtons,
  otherInformationForm,
  otherInformationForm2,
  whatForForm,
} from './application-content.ts';

@AllMethodsStep()
export default class ApplicationPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectYes(defendantNumber: number) {
    await super.clickBySelector(radioButtons(defendantNumber).yes.selector);
    await super.inputText('test', whatForForm(defendantNumber).selector);
  }

  async selectNo(defendantNumber: number) {
    await super.clickBySelector(radioButtons(defendantNumber).no.selector);
  }

  async enterAdditionalInformation() {
    await super.inputText('test', otherInformationForm.selector);
  }

  async enterAdditionalInformation2() {
    await super.inputText('test', otherInformationForm2.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
