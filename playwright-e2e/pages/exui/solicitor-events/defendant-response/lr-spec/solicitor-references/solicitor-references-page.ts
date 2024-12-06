import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, solicitorReferencesInput } from './solicitor-references-content.ts';

@AllMethodsStep()
export default class SolicitorReferencesPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(heading),
    ]);
  }

  async fillInput() {
    await super.inputText('test', solicitorReferencesInput.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
