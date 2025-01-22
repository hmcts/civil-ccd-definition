import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, inputs } from './solicitor-references-content.ts';

@AllMethodsStep()
export default class SolicitorReferencesPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.fileRef),
    ]);
  }

  async fillDefendant1Ref() {
    await super.inputText('New Defendant 1 Ref', inputs.defendant1Ref.selector);
  }

  async fillDefendant2Ref() {
    await super.inputText('New Defendant 2 Ref', inputs.defendant2Ref.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
