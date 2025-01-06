import BasePage from '../../../../../base/base-page';
import {
  heading,
  subheading,
  labels,
  buttons,
  changeLinks,
} from './add-case-notes-judge-submit-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';

@AllMethodsStep()
export default class AddCaseNotesJudgeSubmitPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData): Promise<void> {
    await super.runVerifications([
      // super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading),
      super.expectSubheading(subheading),
      super.expectText(buttons.previous.label),
      super.expectText(buttons.submit.label),
    ]);
  }

  async checkNoteOnlyContent(): Promise<void> {
    super.expectText(labels.noteOnly.checkInformationCarefully.label);
    super.expectText(labels.noteOnly.thisCaseisOnlyVisibleTo.label);
    super.expectText(labels.noteOnly.writeACaseNote.label);
    super.expectText(labels.noteOnly.selection.label);
    super.expectText(labels.noteOnly.selectionContent.label);
  }

  async checkDocumentWithNoteContent(): Promise<void> {
    super.expectText(labels.documentWithNote.checkInformationCarefully.label);
    super.expectText(labels.documentWithNote.thisCaseisOnlyVisibleTo.label);
    super.expectText(labels.documentWithNote.uploadDocument.label, { exact: true });
    super.expectText(labels.documentWithNote.selection.label);
    super.expectText(labels.documentWithNote.selectionContentName.label, { exact: true });
    super.expectText(labels.documentWithNote.selectionContentDocument.label);
    super.expectText(labels.documentWithNote.selectionContentNote.label, { exact: true });
  }

  async checkDocumentOnlyContent(): Promise<void> {
    super.expectText(labels.documentOnly.checkInformationCarefully.label);
    super.expectText(labels.documentOnly.thisCaseisOnlyVisibleTo.label);
    super.expectText(labels.documentOnly.uploadDocument.label, { exact: true });
    super.expectText(labels.documentOnly.selection.label);
    super.expectText(labels.documentOnly.selectionContentName.label, { exact: true });
    super.expectText(labels.documentOnly.selectionContentDocument.label);
  }

  async changeToSelectionPage(): Promise<void> {
    await super.clickBySelector(changeLinks.changeToSelectionPage.selector);
  }

  async changeToSelectionNotePage(): Promise<void> {
    await super.clickBySelector(changeLinks.changeToSelectionNotePage.selector);
  }

  async previous(): Promise<void> {
    await super.clickButtonByName(buttons.previous.label);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
