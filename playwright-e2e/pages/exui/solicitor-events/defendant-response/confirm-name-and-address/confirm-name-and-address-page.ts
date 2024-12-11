import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import {
  dob,
  heading,
  paragraphs,
  radioButtons,
  radioButtons2,
  radioButtons2FastTrack,
} from './confirm-name-and-address-content.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class ConfirmNameAndAddressPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData), super.expectHeading(heading)]);
  }

  async verifyContent1v1(ccdCaseData: CCDCaseData) {
    super.expectText(radioButtons.text.label, { ignoreDuplicates: true }),
      super.expectText(radioButtons.radioYes.text, { ignoreDuplicates: true }),
      super.expectText(radioButtons.radioNo.text, { ignoreDuplicates: true }),
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
      });
  }

  async selectYesDefendant1() {
    await super.clickBySelector(radioButtons.radioYes.selector);
  }

  async selectNoDefendant1() {
    await super.clickBySelector(radioButtons.radioNo.selector);
  }

  async selectYesDefendant2() {
    await super.clickBySelector(radioButtons2.radioYes.selector);
  }

  async selectNoDefendant2() {
    await super.clickBySelector(radioButtons2.radioNo.selector);
  }

  async selectYesDefendant2FastTrack() {
    await super.clickBySelector(radioButtons2FastTrack.radioYes.selector);
  }

  async selectNoDefendant2FastTrack() {
    await super.clickBySelector(radioButtons2FastTrack.radioNo.selector);
  }

  async enterDob(day: number, month: number, year: number) {
    await super.inputText(day, dob.day.selector);
    await super.inputText(month, dob.month.selector);
    await super.inputText(year, dob.year.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
