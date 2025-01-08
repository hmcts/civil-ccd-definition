import BasePage from '../../../../../../base/base-page.ts';
import filePaths from '../../../../../config/file-paths.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import {
  heading,
  radioButtons,
  whatForForm,
  furtherInformationForm,
} from './further-information-content.ts';

@AllMethodsStep()
export default class FurtherInformationPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(heading, { ignoreDuplicates: true }),
    ]);
  }

  async selectYes(defendantNumber: number) {
    await super.clickBySelector(radioButtons(defendantNumber).yes.selector);
    await super.inputText('test', whatForForm(defendantNumber).selector);
  }

  async selectNo(defendantNumber: number) {
    await super.clickBySelector(radioButtons(defendantNumber).no.selector);
  }

  async inputFurtherInformation(defendantNumber: number) {
    await super.inputText('test', furtherInformationForm(defendantNumber).selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
