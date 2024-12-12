import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import {
  heading,
  solicitorReferencesInput,
  solicitorReferencesInputResp2,
} from './solicitor-references-content.ts';

@AllMethodsStep()
export default class SolicitorReferencesPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      //super.expectSubheading(heading),
    ]);
  }

  async fillInput() {
    await super.inputText('test', solicitorReferencesInput.selector);
  }

  async fillInputResp2() {
    await super.inputText('test', solicitorReferencesInputResp2.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
