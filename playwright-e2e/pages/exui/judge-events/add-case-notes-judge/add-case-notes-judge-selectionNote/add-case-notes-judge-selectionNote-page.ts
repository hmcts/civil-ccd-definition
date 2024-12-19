import BasePage from '../../../../../base/base-page';
import {
  heading,
  caseNoteText,
  inputs,
  buttons,
} from './add-case-notes-judge-selectionNote-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';

@AllMethodsStep()
export default class AddCaseNotesJudgeSelectionNotePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData): Promise<void> {
    await super.runVerifications([
      // super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading),
      super.expectText(buttons.previous.label),
      super.expectText(buttons.submit.label),
    ]);
  }

  async enterCaseNote(): Promise<void> {
    await super.inputText(caseNoteText, inputs.caseNote.selector);
  }

  async previous(): Promise<void> {
    await super.clickButtonByName(buttons.previous.label);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
