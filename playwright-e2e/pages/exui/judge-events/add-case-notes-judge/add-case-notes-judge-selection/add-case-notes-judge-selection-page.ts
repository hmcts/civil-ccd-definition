import BasePage from '../../../../../base/base-page';
import { heading, inputs, buttons } from './add-case-notes-judge-selection-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';

@AllMethodsStep()
export default class AddCaseNotesJudgeSelectionPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData): Promise<void> {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading),
      super.expectText(inputs.caseNoteType.label),
      super.expectText(inputs.caseNoteType.radioNoteOnly.label),
      super.expectText(inputs.caseNoteType.radioDocumentWithNote.label),
      super.expectText(inputs.caseNoteType.radioDocumentOnly.label),
      super.expectText(buttons.previous.label),
      super.expectText(buttons.submit.label),
    ]);
  }

  async selectNoteOnly(): Promise<void> {
    await super.clickByText(inputs.caseNoteType.radioNoteOnly.label);
  }

  async selectDocumentWithNote(): Promise<void> {
    await super.clickByText(inputs.caseNoteType.radioDocumentWithNote.label);
  }

  async selectDocumentOnly(): Promise<void> {
    await super.clickByText(inputs.caseNoteType.radioDocumentOnly.label);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
