import BasePage from '../../../../../base/base-page';
import filePaths from '../../../../../config/file-paths';
import {
  heading,
  subHeading,
  testText,
  textFields,
  buttons,
} from './add-case-notes-judge-selectionDocumentWithNote-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';

@AllMethodsStep()
export default class AddCaseNotesJudgeSelectionDocumentWithNotePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData): Promise<void> {
    await super.runVerifications([
      this.checkCaseDetails(ccdCaseData),
      super.expectHeading(heading),
      super.expectText(subHeading, { exact: true }),
      super.expectText(buttons.previous.label),
      super.expectText(buttons.submit.label),
    ]);
  }

  async checkCaseDetails(ccdCaseData: CCDCaseData) {
    const formattedId = `#${ccdCaseData.id.toString().replace(/(\d{4})(?=\d)/g, '$1-')}`;
    super.expectHeading(formattedId);
  }

  async verifyDocumentContent(): Promise<void> {
    await super.expectText(textFields.documentName.label);
    await super.expectText(textFields.documentUpload.label, { exact: true });
    await super.expectText(textFields.addNoteAboutDocument.label);
  }

  async enterDocumentName(): Promise<void> {
    await super.inputText(testText.documentName, textFields.documentName.selector);
  }

  async enterDocumentUpload(): Promise<void> {
    await super.retryUploadFile(filePaths.testTextFile, textFields.documentUpload.selector);
  }

  async enterNoteAboutDocument(): Promise<void> {
    await super.inputText(testText.documentNote, textFields.addNoteAboutDocument.selector);
  }

  async addNew(): Promise<void> {
    await super.clickButtonByName(buttons.addNew.label);
  }

  async remove(): Promise<void> {
    await super.clickButtonByName(buttons.remove.label);
  }

  async previous(): Promise<void> {
    await super.clickButtonByName(buttons.previous.label);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
