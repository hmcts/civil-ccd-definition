import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, paragraphs, radioButtons } from './confirm-name-and-address-content.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class ConfirmNameAndAddressPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading),
      super.expectText(paragraphs.partyTypeText, {
        containerSelector: '#specAoSRespondentInformation',
      }),
      super.expectText(paragraphs.nameText, {
        containerSelector: '#specAoSRespondentInformation',
      }),
      super.expectText(paragraphs.emailText, {
        containerSelector: '#specAoSRespondentInformation',
      }),
      super.expectText(paragraphs.phoneText, {
        containerSelector: '#specAoSRespondentInformation',
      }),
      super.expectText(paragraphs.addressText, {
        containerSelector: '#specAoSRespondentInformation',
      }),
      super.expectText(radioButtons.text.label, { ignoreDuplicates: true }),
      super.expectText(radioButtons.radioYes.text, { ignoreDuplicates: true }),
      super.expectText(radioButtons.radioNo.text, { ignoreDuplicates: true }),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.radioYes.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
