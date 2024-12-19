import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import {
  heading,
  input,
  radioButtons,
  standardDisclosureButtons,
} from './disclosure-of-non-electronic-documents-content.ts';

@AllMethodsStep()
export default class DisclosureOfNonElectronicDocumentsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async verifyContent1v1(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(heading, { ignoreDuplicates: true }),
    ]);
  }

  async inputText() {
    await super.inputText('someInputValue', input.selector);
  }

  async selectYes(defendantNumber: number) {
    await super.clickBySelector(radioButtons(defendantNumber).yes.selector);
  }

  async selectNo(defendantNumber: number) {
    await super.clickBySelector(radioButtons(defendantNumber).no.selector);
  }

  async selectYesStandardDisclosure(defendantNumber: number) {
    await super.clickBySelector(standardDisclosureButtons(defendantNumber).yes.selector);
  }

  async selectNoStandardDisclosure(defendantNumber: number) {
    await super.clickBySelector(standardDisclosureButtons(defendantNumber).no.selector);
    await super.inputText(
      'someInputValue',
      standardDisclosureButtons(defendantNumber).enterDirectionsProposedForDisclosure.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
