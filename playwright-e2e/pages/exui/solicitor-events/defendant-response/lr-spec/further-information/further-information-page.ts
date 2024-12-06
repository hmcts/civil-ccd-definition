import BasePage from '../../../../../../base/base-page.ts';
import filePaths from '../../../../../../config/file-paths.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  radioButtons,
  whatForForm,
  furtherInformationForm,
} from './further-information-content.ts';

@AllMethodsStep()
export default class FurtherInformationPasge extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(heading),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.yes.selector);
    await super.inputText('test', whatForForm.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.no.selector);
  }

  async inputFurtherInformation() {
    await super.inputText('test', furtherInformationForm.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
