import BasePage from '../../../../../base/base-page';
import { heading, labels, buttons } from './add-case-notes-judge-confirm-content';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';

@AllMethodsStep()
export default class AddCaseNotesJudgeConfirmPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData): Promise<void> {
    await super.runVerifications([
      this.checkCaseDetails(ccdCaseData),
      super.expectText(buttons.submit.label),
    ]);
  }

  async checkCaseDetails(ccdCaseData: CCDCaseData) {
    const formattedId = `#${ccdCaseData.id.toString().replace(/(\d{4})(?=\d)/g, '$1-')}`;
    super.expectHeading(formattedId);
  }

  async checkConfirmPageNoteOnlyContent(): Promise<void> {
    await super.expectHeading(heading);
    await super.expectText(labels.noteOnly.label);
  }

  async checkConfirmPageDocumentAndNoteContent(): Promise<void> {
    await super.expectHeading(heading);
    await super.expectText(labels.documentWithNote.confirmationBanner.label);
    await super.expectText(labels.documentWithNote.uploadedSubheading.label);
    await super.expectText(labels.documentWithNote.uploadedFileName.label);
  }

  async checkConfirmPageDocumentOnlyContent(): Promise<void> {
    await super.expectHeading(heading);
    await super.expectText(labels.documentOnly.confirmationBanner.label);
    await super.expectText(labels.documentOnly.uploadedSubheading.label);
    await super.expectText(labels.documentOnly.uploadedFileName.label);
  }

  async submit(...args: any[]): Promise<void> {
    await super.retryClickSubmit();
  }
}
